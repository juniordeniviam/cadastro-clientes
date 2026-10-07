<template>
  <div v-if="visivel" class="modal-fundo" @click.self="$emit('cancelar')">
    <div
      class="modal"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
    >
      <h3 id="modal-titulo">{{ titulo }}</h3>
      <p>{{ mensagem }}</p>
      <div class="modal-botoes">
        <button ref="cancelar" @click="$emit('cancelar')">Cancelar</button>
        <button class="perigo" @click="$emit('confirmar')">
          {{ textoConfirmar }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    visivel: { type: Boolean, default: false },
    titulo: { type: String, default: "Confirmar ação" },
    mensagem: { type: String, default: "Tem certeza?" },
    textoConfirmar: { type: String, default: "Confirmar" },
  },
  watch: {
    visivel: {
      immediate: true,
      handler(aberto) {
        if (aberto) {
          document.addEventListener("keydown", this.aoTeclar);
          this.$nextTick(() => {
            if (this.$refs.cancelar) this.$refs.cancelar.focus();
          });
        } else {
          document.removeEventListener("keydown", this.aoTeclar);
        }
      },
    },
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.aoTeclar);
  },
  methods: {
    aoTeclar(evento) {
      if (evento.key === "Escape") this.$emit("cancelar");
    },
  },
};
</script>