<template>
  <v-list two-line>
    <v-list-item-group
        v-model="items"
        multiple
        active-class=""
    >
      <v-list-item v-for="item in items" :key="item.id">
        <template v-slot:default="{ active }">
          <v-list-item-action>
            <v-checkbox :input-value="active"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </template>
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