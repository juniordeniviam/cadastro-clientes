<template>
  <div>
    <p v-if="clientes.length === 0">Nenhum cliente para exibir.</p>

    <table v-else>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Telefone</th>
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
  },
};
</script>