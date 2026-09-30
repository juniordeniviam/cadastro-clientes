<template>
  <div>
    <div class="form">
      <input v-model="form.nome" placeholder="Nome" />
      <input v-model="form.email" placeholder="E-mail" />
      <input v-model="form.telefone" placeholder="Telefone" />
      <button @click="enviar">{{ editando ? "Salvar" : "Cadastrar" }}</button>
      <button v-if="editando" @click="$emit('cancelar')">Cancelar</button>
    </div>
    <p v-if="erro" class="erro">{{ erro }}</p>
  </div>
</template>

<script>
export default {
  name: "ClienteForm",
  props: {
    editando: { type: Object, default: null },
  },
  data() {
    return {
      form: { nome: "", email: "", telefone: "" },
      erro: "",
    };
  },
  watch: {
    editando(cliente) {
      this.erro = "";
      if (cliente) {
        this.form = {
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone,
        };
      } else {
        this.limpar();
      }
    },
  },
  methods: {
    emailValido(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    enviar() {
      if (!this.form.nome.trim()) {
        this.erro = "Informe o nome.";
        return;
      }
      if (!this.emailValido(this.form.email)) {
        this.erro = "Informe um e-mail válido (ex: nome@email.com).";
        return;
      }
      this.erro = "";
      this.$emit("salvar", { ...this.form });
    },
    limpar() {
      this.form = { nome: "", email: "", telefone: "" };
      this.erro = "";
    },
  },
};
</script>

<style>
.erro {
  color: #c0392b;
  margin: -10px 0 16px;
}
</style>