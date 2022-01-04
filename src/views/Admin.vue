<template>
  <v-container>
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Itens</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Novo Item
              </v-btn>
            </template>
            <v-card>
              <v-form @submit.prevent="save">
              <v-card-title>{{ formTitle }}</v-card-title>
              <v-card-text>
                  <v-container grid-list-md>
                    <v-row no-gutters>
                      <v-col cols="12" class="pa-2">
                        <v-text-field label="Nome" v-model="editedItem.name"></v-text-field>
                      </v-col>
                      <v-col cols="12" class="pa-2">
                        <v-text-field label="Descrição" v-model="editedItem.description"></v-text-field>
                      </v-col>
                      <v-col cols="12" class="pa-2">
                        <v-select label="Categoria" v-model="editedItem.category" :items="categories"></v-select>
                      </v-col>
                      <v-col cols="12" class="pa-2">
                        <v-select label="Cômodo" v-model="editedItem.room" :items="rooms"></v-select>
                      </v-col>
                      <v-col cols="6" class="pa-2">
                        <v-checkbox label="comprado" v-model="editedItem.buyed"></v-checkbox>
                      </v-col>
                      <v-col cols="6" class="pa-2">
                        <v-text-field label="Comprador" v-model="editedItem.buyer"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="success" :loading="loading">Confirmar</v-btn>
              </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { db } from '@/db'

export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nome',
          align: 'start',
          value: 'name',
        },
        { text: 'Descrição', value: 'description' },
        { text: 'Comprado', value: 'buyed' },
        { text: 'Comprador', value: 'buyer' },
        { text: 'Categoria', value: 'category' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [],
      editedIndex: null,
      defaultItem:{
        name: "",
        description: "",
        buyed: false,
        buyer: "",
        category: ""
      },
      editedItem:{
        name: "",
        description: "",
        buyed: false,
        buyer: "",
        category: ""
      },
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
      loading: false
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === null ? 'Novo item' : 'Editar item'
    },
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  methods:{
    editItem (item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      await db.collection('items').doc(this.editedIndex).delete()
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = null
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = null
      })
    },
    async save(){
      try {
        this.loading = true
        if(this.editedIndex){
          await db.collection('items').doc(this.editedIndex).set(this.editedItem)
        }else{
          await db.collection('items').add(this.editedItem)
        }
        this.loading = false
      } catch (error) {
        console.log(error);        
      }
    }
  },
  firestore: {
    items: db.collection('items')
  }
}
</script>

<style>

</style>