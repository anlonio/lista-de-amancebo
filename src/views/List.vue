<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <app-list></app-list>
      </v-col>
    </v-row>    
  </v-container>
</template>

<script>
import AppList from '@/components/AppList.vue';

export default {
  name: 'App',
  components:{
    AppList
  },
};
</script>