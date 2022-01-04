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
      <v-btn
        class="fab"
        color="green"
        dark
        absolute
        right
        bottom
        fab
      >
        <v-icon>mdi-whatsapp</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item>
          <v-list-item-title>Foo</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Bar</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Fizz</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>Buzz</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2 text-right">
          <v-btn icon>
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <app-list></app-list>
    </v-main>
  </v-app>
</template>

<script>
import AppList from '@/components/AppList.vue';

export default {
  name: 'App',
  components:{
    AppList
  },
  data: () => ({
    drawer:false
  }),
};
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
