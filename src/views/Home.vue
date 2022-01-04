<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <div>
          <v-carousel height="100%">
            <v-carousel-item
              eager
              :src="require('@/assets/casal-2.jpg')"
            ></v-carousel-item>
            <v-carousel-item
              eager
              :src="require('@/assets/casal-1.jpg')"
            ></v-carousel-item>
            <v-carousel-item
              eager
              :src="require('@/assets/serio.jpg')"
            ></v-carousel-item>
          </v-carousel>
        </div>
        <h1 class="title">Sejam bem-vindos a nossa lista de <span class="text-decoration-line-through">casamento</span> amancebo!</h1>
        <br>
        <p>
          Nós, <b>Antonio e Francisca</b>, agradecemos o apoio e ajuda de todos nossos amigos e familiares.
          Vocês são muito importantes para o êxito desse amancebamento, obrigado!
        </p>
        <p>
          Caso queira ver nossa lista e escolher algum item, <router-link :to="{name:'List'}">clique aqui</router-link>.
        </p>
        <p>
          Caso prefira nos ajudar enviando alguma quantia via Pix, <router-link :to="{name:'Pix'}">clique aqui</router-link>.
        </p>
        <p>
          Caso queira só queira nos desejar boa sorte e ver uma foto fofa, <a @click="cute">clique aqui</a>.
        </p>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="360">
      <v-card>
        <v-img :src="require('@/assets/'+cutes[random]+'.jpg')"></v-img>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cutes: [
        'gatos',
        'coelhos',
        'pandas',
        'passarinhos',
        'coalas',
      ],
      dialog:false,
      random: 0
    }
  },
  methods:{
    cute(){
      this.random = Math.floor(Math.random() * 5)
      this.dialog = true
    }
  }
}
</script>

<style>

</style>