<template>
  <div id="app">
    <h1>Cadastro de Clientes</h1>

    <ClienteForm
      ref="form"
      :editando="clienteEditando"
      @salvar="salvar"
      @cancelar="cancelar"
    />

    <input
      v-model="busca"
      class="busca"
      placeholder="Buscar por nome, e-mail ou telefone..."
    />

    <ClienteLista
      :clientes="clientesFiltrados"
      @editar="editar"
      @remover="remover"
    />
  </div>
</template>

<script>
import axios from "axios";
import ClienteForm from "./components/ClienteForm.vue";
import ClienteLista from "./components/ClienteLista.vue";

const api = axios.create({ baseURL: "http://localhost:3000" });

export default {
  name: "App",
  components: { ClienteForm, ClienteLista },
  data() {
    return {
      clientes: [],
      clienteEditando: null,
      busca: "",
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
        alert("Erro ao carregar clientes. A API está rodando?");
      }
    },
    async salvar(dados) {
      try {
        if (this.clienteEditando) {
          const id = this.clienteEditando.id;
          const resposta = await api.put(`/clientes/${id}`, dados);
          const indice = this.clientes.findIndex((c) => c.id === id);
          this.$set(this.clientes, indice, resposta.data);
        } else {
          const resposta = await api.post("/clientes", dados);
          this.clientes.push(resposta.data);
        }
        this.clienteEditando = null;
        this.$refs.form.limpar();
      } catch (erro) {
        alert("Erro ao salvar cliente.");
      }
    },
    editar(cliente) {
      this.clienteEditando = { ...cliente };
    },
    cancelar() {
      this.clienteEditando = null;
    },
    async remover(id) {
      try {
        await api.delete(`/clientes/${id}`);
        this.clientes = this.clientes.filter((c) => c.id !== id);
        if (this.clienteEditando && this.clienteEditando.id === id) {
          this.clienteEditando = null;
        }
      } catch (erro) {
        alert("Erro ao excluir cliente.");
      }
    },
  },
};
</script>

<style>
#app {
  max-width: 600px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
}
.form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 6px;
}
.busca {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 16px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
</style>