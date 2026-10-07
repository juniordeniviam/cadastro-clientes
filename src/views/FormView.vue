<template>
  <div>
    <router-link to="/" class="voltar">← Voltar para a lista</router-link>
    <div class="pagina-titulo">
      <h2>{{ id ? "Editar cliente" : "Novo cliente" }}</h2>
    </div>
    <ClienteForm
      :cliente="cliente"
      :desabilitado="carregando"
      @salvar="salvar"
      @cancelar="voltar"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { notificar } from "../notificar";
import ClienteForm from "../components/ClienteForm.vue";

export default {
  name: "FormView",
  components: { ClienteForm },
  data() {
    return { cliente: null };
  },
  computed: {
    ...mapState(["carregando"]),
    id() {
      return this.$route.params.id;
    },
  },
  async created() {
    if (!this.id) return;
    try {
      this.cliente = await this.buscar(this.id);
    } catch (erro) {
      notificar("Cliente não encontrado.", "erro");
      this.voltar();
    }
  },
  methods: {
    ...mapActions(["buscar", "criar", "atualizar"]),
    async salvar(dados) {
      try {
        if (this.id) {
          await this.atualizar({ id: this.id, dados });
          notificar("Cliente atualizado!");
        } else {
          await this.criar(dados);
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