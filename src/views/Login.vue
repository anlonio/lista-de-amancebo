<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-text-field label="Usuário" v-model="email"></v-text-field>
            <v-text-field label="Senha" type="password" v-model="password"></v-text-field>
            <span class="error--text caption" v-if="error">{{error}}</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" :loading="loading" @click="login">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from '@/db'
export default {
  data() {
    return {
      password: "",
      email:"",
      loading:false,
      error:""
    }
  },
  methods:{
    async login(){
      try {
        this.loading = true
        await auth.signInWithEmailAndPassword(this.email, this.password)
        this.$router.push({ name: 'Admin' })
        this.error = ""
      } catch (error) {
        console.log(error)
        this.error = error.message || "Algo aconteceu"
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>