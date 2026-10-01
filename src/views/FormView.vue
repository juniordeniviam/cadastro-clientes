<template>
  <div>
    <h2>{{ id ? "Editar cliente" : "Novo cliente" }}</h2>
    <ClienteForm :cliente="cliente" @salvar="salvar" @cancelar="voltar" />
  </div>
</template>

<script>
import api from "../api";
import { notificar } from "../notificar";
import ClienteForm from "../components/ClienteForm.vue";

export default {
  name: "FormView",
  components: { ClienteForm },
  data() {
    return { cliente: null };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  async created() {
    if (!this.id) return;
    try {
      const resposta = await api.get(`/clientes/${this.id}`);
      this.cliente = resposta.data;
    } catch (erro) {
      notificar("Cliente não encontrado.", "erro");
      this.voltar();
    }
  },
  methods: {
    async salvar(dados) {
      try {
        if (this.id) {
          await api.put(`/clientes/${this.id}`, dados);
          notificar("Cliente atualizado!");
        } else {
          await api.post("/clientes", dados);
          notificar("Cliente cadastrado!");
        }
        this.voltar();
      } catch (erro) {
        notificar("Erro ao salvar cliente.", "erro");
      }
    },
    voltar() {
      this.$router.push("/");
    },
  },
};
</script>