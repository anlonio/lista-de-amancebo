<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        Lista de 
        <span class="casamento">Casamento
          <span class="amancebo">Amancebo</span>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-linear
        :active="items.length == 0"
        indeterminate
        absolute
        bottom
        color="black"
      ></v-progress-linear>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list-item color="primary" class="px-2">
        <v-list-item-avatar>
          <v-img :src="require('@/assets/pongo-avatar.png')"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>Antonio & Francisca</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list
        nav
        dense
        shaped
      >
        <v-list-item :to="{name: 'Home'}" exact active-class="primary white--text">
          <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Início</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'List'}" active-class="primary white--text">
          <v-list-item-icon><v-icon>mdi-list-status</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Lista</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'Pix'}" active-class="primary white--text">
          <v-list-item-icon><v-icon>mdi-qrcode</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Pix</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'About'}" active-class="primary white--text">
          <v-list-item-icon><v-icon>mdi-information</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sobre</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'Admin'}" v-if="logged" active-class="primary white--text">
          <v-list-item-icon><v-icon>mdi-cog</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2 text-right">
          <v-btn icon @click="logout" v-if="logged">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
          <v-btn icon @click="$router.push({name:'Login'})" v-else>
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer app>
      <v-spacer></v-spacer>
      Antonio Machado & Natália Simões
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import { db, auth } from '@/db'

export default {
  data: () => ({
    drawer:false,
    items:[],
    logged:false,
  }),
  firestore: {
    items: db.collection('items')
  },
  mounted(){
    auth.onAuthStateChanged((user)=>{
      if(user){
        this.logged = true
      } else {
        this.logged = false
      }
    })
  },
  methods:{
    async logout(){
      try {
        await auth.signOut()
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.amancebo{
  display: none;
}

@keyframes casamento{
  0%   { width : 0; }
  100% { width: 100%; }
}
.casamento {
  position: relative;
}
.casamento::after {
  content: ' ';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 3px;
  background: black;
  animation-name: casamento;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
</style>
