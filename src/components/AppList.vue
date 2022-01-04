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
          <v-list-item-group
            multiple
            active-class=""
            v-model="selectedCategories"
          >
            <v-list-item v-for="category in categories" :key="category">
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>
                <v-list-item-title>{{ category }}</v-list-item-title>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-subheader>
    <v-fade-transition group>
      <v-list-item v-for="item in items" :key="item.id">
        <v-list-item-action>
          <v-checkbox :input-value="item.buyed" readonly></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title :class="{'text-decoration-line-through':item.buyed}">{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-fade-transition>
  </v-list>
</template>

<script>
import { db } from '@/db'

export default {
  data() {
    return {
      items: [],
      selectedCategories:[],
      categories:[
        "Geral",
        "Eletrodomésticos",
        "Móveis"
      ],
      hideBuyed: false
    }
  },
  methods:{
    refreshData(){
      let r = db.collection('items')
      if(this.selectedCategories){
        r = r.where('category', 'in', 
        this.selectedCategories.length == 0 ? 
        this.categories:
        this.selectedCategories)
      }
      if(this.hideBuyed){
        r = r.where('buyed', '==', true)
      } 
      this.$bind(
        'items',
        r.orderBy('name')
      )
    }
  },
  watch:{
    hideBuyed() {
      this.refreshData()
    },
    selectedCategories(){
      this.refreshData()
    }
  },
  firestore: {
    items: db.collection('items').orderBy('name')
  }
}
</script>

<style>

</style>