<template>
  <div class="card">
    <div class="campos" @keyup.enter="enviar">
      <div class="campo">
        <label for="campo-nome">Nome *</label>
        <input
          id="campo-nome"
          ref="nome"
          v-model="form.nome"
          placeholder="Nome"
          autocomplete="name"
          :class="{ invalido: campoErro === 'nome' }"
          :aria-invalid="campoErro === 'nome'"
        />
      </div>

      <div class="campo">
        <label for="campo-email">E-mail *</label>
        <input
          id="campo-email"
          ref="email"
          v-model="form.email"
          placeholder="E-mail"
          autocomplete="email"
          inputmode="email"
          :class="{ invalido: campoErro === 'email' }"
          :aria-invalid="campoErro === 'email'"
        />
      </div>

      <div class="campo">
        <label for="campo-telefone">Telefone (opcional)</label>
        <input
          id="campo-telefone"
          :value="form.telefone"
          @input="atualizarTelefone"
          placeholder="(00) 00000-0000"
          maxlength="15"
          inputmode="tel"
          autocomplete="tel"
        />
      </div>
    </div>

    <p v-if="erro" class="erro" role="alert">{{ erro }}</p>

    <div class="acoes">
      <button class="primario" :disabled="desabilitado" @click="enviar">
        {{ cliente ? "Salvar" : "Cadastrar" }}
      </button>
      <button @click="$emit('cancelar')">Cancelar</button>
    </div>
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
      campoErro: "",
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
    "form.nome"() {
      if (this.campoErro === "nome") this.limparErro();
    },
    "form.email"() {
      if (this.campoErro === "email") this.limparErro();
    },
  },
  mounted() {
    this.$refs.nome.focus();
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
      evento.target.value = mascarado;
    },
    emailValido(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    mostrarErro(mensagem, campo) {
      this.erro = mensagem;
      this.campoErro = campo;
      this.$refs[campo].focus();
    },
    limparErro() {
      this.erro = "";
      this.campoErro = "";
    },
    enviar() {
      if (this.desabilitado) return;
      if (!this.form.nome.trim()) {
        this.mostrarErro("Informe o nome.", "nome");
        return;
      }
      if (!this.emailValido(this.form.email.trim())) {
        this.mostrarErro("Informe um e-mail válido (ex: nome@email.com).", "email");
        return;
      }
      this.limparErro();
      this.$emit("salvar", {
        ...this.form,
        nome: this.form.nome.trim(),
        email: this.form.email.trim(),
      });
    },
  },
};
</script>