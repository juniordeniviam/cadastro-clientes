<template>
  <div>
    <input
      v-model="busca"
      class="busca"
      placeholder="Buscar por nome, e-mail ou telefone..."
    />

    <ClienteLista
      :clientes="clientesPagina"
      :ordenar-por="ordenarPor"
      :direcao="direcao"
      @ordenar="ordenar"
      @remover="pedirExclusao"
    />

    <div v-if="totalPaginas > 1" class="paginacao">
      <button :disabled="pagina === 1" @click="pagina--">Anterior</button>
      <span>Página {{ pagina }} de {{ totalPaginas }}</span>
      <button :disabled="pagina === totalPaginas" @click="pagina++">
        Próxima
      </button>
    </div>

    <ConfirmModal
      :visivel="!!clienteParaExcluir"
      :mensagem="mensagemExclusao"
      texto-confirmar="Excluir"
      @confirmar="confirmarExclusao"
      @cancelar="clienteParaExcluir = null"
    />
  </div>
</template>

<script>
import api from "../api";
import { notificar } from "../notificar";
import ClienteLista from "../components/ClienteLista.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

export default {
  name: "ListaView",
  components: { ClienteLista, ConfirmModal },
  data() {
    return {
      clientes: [],
      busca: "",
      ordenarPor: "nome",
      direcao: "asc",
      pagina: 1,
      porPagina: 5,
      clienteParaExcluir: null,
    };
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
    clientesOrdenados() {
      const campo = this.ordenarPor;
      const fator = this.direcao === "asc" ? 1 : -1;
      return [...this.clientesFiltrados].sort(
        (a, b) =>
          String(a[campo] || "").localeCompare(String(b[campo] || ""), "pt-BR", {
            sensitivity: "base",
          }) * fator
      );
    },
    totalPaginas() {
      return Math.max(
        1,
        Math.ceil(this.clientesOrdenados.length / this.porPagina)
      );
    },
    clientesPagina() {
      const inicio = (this.pagina - 1) * this.porPagina;
      return this.clientesOrdenados.slice(inicio, inicio + this.porPagina);
    },
    mensagemExclusao() {
      return this.clienteParaExcluir
        ? `Deseja realmente excluir "${this.clienteParaExcluir.nome}"?`
        : "";
    },
  },
  watch: {
    busca() {
      this.pagina = 1;
    },
    totalPaginas(total) {
      if (this.pagina > total) this.pagina = total;
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
    ordenar(campo) {
      if (campo === this.ordenarPor) {
        this.direcao = this.direcao === "asc" ? "desc" : "asc";
      } else {
        this.ordenarPor = campo;
        this.direcao = "asc";
      }
      this.pagina = 1;
    },
    pedirExclusao(id) {
      this.clienteParaExcluir = this.clientes.find((c) => c.id === id) || null;
    },
    async confirmarExclusao() {
      const { id } = this.clienteParaExcluir;
      this.clienteParaExcluir = null;
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