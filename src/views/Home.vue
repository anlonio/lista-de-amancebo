<template>
  <v-container>
    <app-list></app-list>
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