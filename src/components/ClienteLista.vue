<template>
  <div>
    <div v-if="clientes.length === 0" class="card vazio">
      <p>Nenhum cliente para exibir.</p>
      <router-link to="/clientes/novo" class="btn primario">
        Cadastrar cliente
      </router-link>
    </div>

    <div v-else class="card tabela-wrap">
      <table>
        <thead>
          <tr>
            <th
              v-for="col in colunas"
              :key="col.campo"
              class="ordenavel"
              tabindex="0"
              :aria-sort="ariaSort(col.campo)"
              @click="$emit('ordenar', col.campo)"
              @keyup.enter="$emit('ordenar', col.campo)"
            >
              {{ col.titulo }} {{ seta(col.campo) }}
            </th>
            <th><span class="sr-only">Ações</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in clientes" :key="c.id">
            <td data-label="Nome">
              <div class="celula-nome">
                <span class="avatar" aria-hidden="true">{{ iniciais(c.nome) }}</span>
                <span>{{ c.nome }}</span>
              </div>
            </td>
            <td data-label="E-mail">{{ c.email }}</td>
            <td data-label="Telefone">{{ c.telefone || "—" }}</td>
            <td>
              <div class="acoes-linha">
                <router-link :to="`/clientes/${c.id}/editar`" class="btn">
                  Editar
                </router-link>
                <button class="excluir" @click="$emit('remover', c.id)">
                  Excluir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClienteLista",
  props: {
    clientes: { type: Array, required: true },
    ordenarPor: { type: String, default: "" },
    direcao: { type: String, default: "asc" },
  },
  data() {
    return {
      colunas: [
        { campo: "nome", titulo: "Nome" },
        { campo: "email", titulo: "E-mail" },
        { campo: "telefone", titulo: "Telefone" },
      ],
    };
  },
  methods: {
    seta(campo) {
      if (campo !== this.ordenarPor) return "";
      return this.direcao === "asc" ? "▲" : "▼";
    },
    ariaSort(campo) {
      if (campo !== this.ordenarPor) return "none";
      return this.direcao === "asc" ? "ascending" : "descending";
    },
    iniciais(nome) {
      const partes = String(nome || "").trim().split(/\s+/).filter(Boolean);
      if (!partes.length) return "?";
      const primeira = partes[0][0];
      const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
      return (primeira + ultima).toUpperCase();
    },
  },
};
</script>