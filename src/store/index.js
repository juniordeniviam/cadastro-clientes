import Vue from "vue";
import Vuex from "vuex";
import api from "../api";

Vue.use(Vuex);

async function comLoading(commit, tarefa) {
        commit("SET_CARREGANDO", true);
        try {
                return await tarefa();
        } finally {
                commit("SET_CARREGANDO", false);
        }
}

export default new Vuex.Store({
        state: {
                clientes: [],
                carregando: false,
        },
        mutations: {
                SET_CLIENTES(state, lista) {
                        state.clientes = lista;
                },
                ADD_CLIENTE(state, cliente) {
                        state.clientes.push(cliente);
                },
                UPDATE_CLIENTE(state, cliente) {
                        const i = state.clientes.findIndex((c) => c.id === cliente.id);
                        if (i !== -1) Vue.set(state.clientes, i, cliente);
                },
                REMOVE_CLIENTE(state, id) {
                        state.clientes = state.clientes.filter((c) => c.id !== id);
                },
                SET_CARREGANDO(state, valor) {
                        state.carregando = valor;
                },
        },
        actions: {
                carregar({ commit }) {
                        return comLoading(commit, async () => {
                                const resposta = await api.get("/clientes");
                                commit("SET_CLIENTES", resposta.data);
                        });
                },
                buscar({ state, commit }, id) {
                        const existente = state.clientes.find((c) => String(c.id) === String(id));
                        if (existente) return existente;
                        return comLoading(commit, async () => {
                                const resposta = await api.get(`/clientes/${id}`);
                                return resposta.data;
                        });
                },
                criar({ commit }, dados) {
                        return comLoading(commit, async () => {
                                const resposta = await api.post("/clientes", dados);
                                commit("ADD_CLIENTE", resposta.data);
                        });
                },
                atualizar({ commit }, { id, dados }) {
                        return comLoading(commit, async () => {
                                const resposta = await api.put(`/clientes/${id}`, dados);
                                commit("UPDATE_CLIENTE", resposta.data);
                        });
                },
                remover({ commit }, id) {
                        return comLoading(commit, async () => {
                                await api.delete(`/clientes/${id}`);
                                commit("REMOVE_CLIENTE", id);
                        });
                },
        },
});