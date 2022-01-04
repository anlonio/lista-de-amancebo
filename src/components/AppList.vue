<template>
  <v-list two-line>
    <v-list-item-group
        multiple
        active-class=""
    >
      <v-list-item v-for="item in items" :key="item.id">
        <v-list-item-action>
          <v-checkbox :input-value="item.buyed" readonly></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { db } from '@/db'

export default {
  data() {
    return {
      items: []
    }
  },
  firestore: {
    items: db.collection('items')
  }
}
</script>

<style>

</style>