<template>
  <div id="app">
    <h1>Cadastro de Clientes</h1>

    <nav>
      <router-link to="/" exact>Lista</router-link>
      <router-link to="/clientes/novo">Novo cliente</router-link>
    </nav>

    <div v-if="carregando" class="loading">
      <span class="spinner"></span> Carregando...
    </div>

    <router-view :key="$route.fullPath" />

    <div v-if="toast.texto" :class="['toast', toast.tipo]">
      {{ toast.texto }}
    </div>
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

<style>
#app {
  max-width: 600px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
}
nav {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}
nav a {
  color: #2c3e50;
  text-decoration: none;
  padding-bottom: 4px;
}
nav a.router-link-active {
  border-bottom: 2px solid #42b983;
  font-weight: bold;
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
.erro {
  color: #c0392b;
  margin: -10px 0 16px;
}
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 12px 20px;
  border-radius: 6px;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}
.toast.sucesso {
  background: #27ae60;
}
.toast.erro {
  background: #c0392b;
}
th.ordenavel {
  cursor: pointer;
  user-select: none;
}
th.ordenavel:hover {
  background: #f4f4f4;
}
.paginacao {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}
.loading {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #666;
}
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #ddd;
  border-top-color: #42b983;
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
}
@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}
</style>