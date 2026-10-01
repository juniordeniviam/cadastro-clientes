<template>
  <div>
    <input
      v-model="busca"
      class="busca"
      placeholder="Buscar por nome, e-mail ou telefone..."
    />
    <ClienteLista :clientes="clientesFiltrados" @remover="remover" />
  </div>
</template>

<script>
import api from "../api";
import { notificar } from "../notificar";
import ClienteLista from "../components/ClienteLista.vue";

export default {
  name: "ListaView",
  components: { ClienteLista },
  data() {
    return { clientes: [], busca: "" };
  },
  computed: {
    clientesFiltrados() {
      const termo = this.busca.trim().toLowerCase();
      if (!termo) return this.clientes;
      return this.clientes.filter((c) =>
        [c.nome, c.email, c.telefone].some((campo) =>
          String(campo || "").toLowerCase().includes(termo)
        )
      );
    },
  },
  created() {
    this.carregar();
  },
  methods: {
    async carregar() {
      try {
        const resposta = await api.get("/clientes");
        this.clientes = resposta.data;
      } catch (erro) {
        notificar("Erro ao carregar clientes. A API está rodando?", "erro");
      }
    },
    async remover(id) {
      if (!confirm("Deseja realmente excluir este cliente?")) return;
      try {
        await api.delete(`/clientes/${id}`);
        this.clientes = this.clientes.filter((c) => c.id !== id);
        notificar("Cliente excluído.");
      } catch (erro) {
        notificar("Erro ao excluir cliente.", "erro");
      }
    },
  },
};
</script>