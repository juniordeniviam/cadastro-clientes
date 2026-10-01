<template>
  <div v-if="visivel" class="modal-fundo" @click.self="$emit('cancelar')">
    <div class="modal" role="dialog" aria-modal="true">
      <p>{{ mensagem }}</p>
      <div class="modal-botoes">
        <button class="perigo" @click="$emit('confirmar')">
          {{ textoConfirmar }}
        </button>
        <button @click="$emit('cancelar')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    visivel: { type: Boolean, default: false },
    mensagem: { type: String, default: "Tem certeza?" },
    textoConfirmar: { type: String, default: "Confirmar" },
  },
};
</script>

<style>
.modal-fundo {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  max-width: 360px;
  width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
.modal-botoes {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}
button.perigo {
  background: #c0392b;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>