<template>
  <v-list two-line>
    <v-subheader>
      <v-switch v-model="hideBuyed" label="Não mostrar adquiridos"></v-switch>
      <v-spacer></v-spacer>
      <v-menu offset-x :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-subheader>Categorias</v-subheader>
          <v-list-item-group
            multiple
            active-class=""
            v-model="selectedCategories"
          >
            <v-list-item v-for="category in categories" :key="category" :value="category">
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>
                <v-list-item-title>{{ category }}</v-list-item-title>
              </template>
            </v-list-item>
          </v-list-item-group>
          <v-subheader>Cômodos</v-subheader>
          <v-list-item-group
            active-class=""
            v-model="selectedRooms"
          >
            <v-list-item v-for="room in rooms" :key="room" :value="room">
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>
                <v-list-item-title>{{ room }}</v-list-item-title>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-subheader>
    <v-fade-transition group>
      <v-list-item v-for="item in items" :key="item.id">
        <v-list-item-action>
          <v-checkbox :input-value="item.buyed" :disabled="item.buyed" :readonly="!item.buyed" @click="give(item.name)"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title :class="{'text-decoration-line-through':item.buyed}">{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-fade-transition>
    <v-dialog v-model="giveDialog" max-width="360px">
      <v-card>
        <v-card-title>Escolher item</v-card-title>
        <v-card-text>
          Pra quem você deseja avisar?
        </v-card-text>
        <v-card-actions>
          <v-btn text color="primary" :href="getLink('5584999866283')" target="_blank">Antonio</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" :href="getLink('558498998012')" target="_blank">Francisca</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script>
import { db } from '@/db'

export default {
  data() {
    return {
      items: [],
      selectedCategories:[],
      selectedRooms:null,
      rooms:[
        "Sala",
        "Quarto",
        "Banheiro",
        "Cozinha",
        "Lavanderia",
      ],
      categories:[
        "Eletrodomésticos",
        "Utensílios de Cozinha",
        "Cama, Mesa e Banho",
        "Móveis"
      ],
      hideBuyed: false,
      giveName: null,
      giveDialog: false
    }
  },
  computed:{
    getLink(){
      return (number) =>{
        return `https://wa.me/${number}?text=${encodeURI(this.getMessage)}`
      }
    },
    getMessage(){
      return `Vou ajudar com: ${this.giveName}! Espero que não seja tão caro.`
    }
  },
  methods:{
    give(name){
      this.giveName = name
      this.giveDialog = true
    },
    refreshData(){
      let r = db.collection('items')
      if(this.selectedCategories.length > 0){
        r = r.where('category', 'in', 
        this.selectedCategories)
      }
      if(this.selectedRooms){
        r = r.where('room', '==', 
        this.selectedRooms)
      }
      if(this.hideBuyed){
        r = r.where('buyed', '==', false)
      } 
      this.$bind(
        'items',
        r.orderBy('category')
      )
    }
  },
  watch:{
    hideBuyed() {
      this.refreshData()
    },
    selectedCategories(){
      this.refreshData()
    },
    selectedRooms(){
      this.refreshData()
    }
  },
  firestore: {
    items: db.collection('items').orderBy('category')
  }
}
</script>

<style>

</style>