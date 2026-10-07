<template>
  <div id="app">
    <header class="topo">
      <div class="topo-interno">
        <h1 class="marca">👥 Cadastro de Clientes</h1>
        <nav>
          <router-link to="/" exact>Lista</router-link>
          <router-link to="/clientes/novo">Novo cliente</router-link>
        </nav>
      </div>
      <div
        v-if="carregando"
        class="barra-loading"
        role="progressbar"
        aria-label="Carregando"
      ></div>
    </header>

    <main class="conteudo">
      <router-view :key="$route.fullPath" />
    </main>

    <transition name="toast">
      <div v-if="toast.texto" :class="['toast', toast.tipo]" role="status">
        {{ toast.texto }}
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { toast } from "./notificar";

export default {
  name: "App",
  data() {
    return { toast };
  },
  computed: {
    ...mapState(["carregando"]),
  },
};
</script>