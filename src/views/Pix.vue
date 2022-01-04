<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <section>
          <h1 class="title">Faça um pix</h1>
          <h2 class="subtitle-1">Não sabe como contribuir e prefere enviar um valor?</h2>
          <h3 class="subtitle-2">Muito obrigado! Sua ajuda fortalece nosso amor ❤</h3>
          <v-img :src="require('@/assets/qrcode.png')"></v-img>
          <v-btn block color="success" @click="copy">Copiar</v-btn>
          <div class="caption text-center pt-2">
            <span>
              Ou pague usando a chave: antonio.machado.dev@gmail.com
            </span>
          </div>
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods:{
    copy() {
      const msg = "00020101021126790014br.gov.bcb.pix0129antonio.machado.dev@gmail.com0224Solicitacao de pagamento5204000053039865802BR5916ANTONIO M G NETO6010LAGOA NOVA62190515Listadeamancebo63045A3F"
      if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData('Text', msg)
      } else if (
        document.queryCommandSupported &&
        document.queryCommandSupported('copy')
      ) {
        var textarea = document.createElement('textarea')
        textarea.textContent = msg
        textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea)
        textarea.select()
        try {
          return document.execCommand('copy') // Security exception may be thrown by some browsers.
        } catch (ex) {
          console.warn('Copy to clipboard failed.', ex)
          return false
        } finally {
          document.body.removeChild(textarea)
        }
      }
    },
  }
}
</script>

<style>

</style>