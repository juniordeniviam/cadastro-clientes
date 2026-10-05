<template>
  <div>
    <div class="form">
      <input v-model="form.nome" placeholder="Nome" />
      <input v-model="form.email" placeholder="E-mail" />
      <input
        :value="form.telefone"
        @input="atualizarTelefone"
        placeholder="(00) 00000-0000"
        maxlength="15"
        inputmode="tel"
      />
      <button :disabled="desabilitado" @click="enviar">
        {{ cliente ? "Salvar" : "Cadastrar" }}
      </button>
      <button @click="$emit('cancelar')">Cancelar</button>
    </div>
    <p v-if="erro" class="erro">{{ erro }}</p>
  </div>
</template>

<script>
export default {
  name: "ClienteForm",
  props: {
    cliente: { type: Object, default: null },
    desabilitado: { type: Boolean, default: false },
  },
  data() {
    return {
      form: { nome: "", email: "", telefone: "" },
      erro: "",
    };
  },
  watch: {
    cliente: {
      immediate: true,
      handler(c) {
        if (c) {
          this.form = {
            nome: c.nome,
            email: c.email,
            telefone: c.telefone || "",
          };
        }
      },
    },
  },
  methods: {
    mascararTelefone(valor) {
      const n = valor.replace(/\D/g, "").slice(0, 11);
      if (n.length <= 2) return n;
      if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
      if (n.length <= 10)
        return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
      return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
    },
    atualizarTelefone(evento) {
      const mascarado = this.mascararTelefone(evento.target.value);
      this.form.telefone = mascarado;
      evento.target.value = mascarado; // força o campo a refletir o valor mascarado
    },
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
  },
};
</script>