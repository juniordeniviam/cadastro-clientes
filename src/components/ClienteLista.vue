<template>
  <div>
    <p v-if="clientes.length === 0">Nenhum cliente para exibir.</p>

    <table v-else>
      <thead>
        <tr>
          <th
            v-for="col in colunas"
            :key="col.campo"
            class="ordenavel"
            @click="$emit('ordenar', col.campo)"
          >
            {{ col.titulo }} {{ seta(col.campo) }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in clientes" :key="c.id">
          <td>{{ c.nome }}</td>
          <td>{{ c.email }}</td>
          <td>{{ c.telefone }}</td>
          <td>
            <router-link :to="`/clientes/${c.id}/editar`">Editar</router-link>
            <button @click="$emit('remover', c.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
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
  },
};
</script>