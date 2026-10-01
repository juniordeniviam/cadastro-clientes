import Vue from "vue";
import VueRouter from "vue-router";
import ListaView from "../views/ListaView.vue";
import FormView from "../views/FormView.vue";

Vue.use(VueRouter);

export default new VueRouter({
        mode: "history",
        routes: [
                { path: "/", component: ListaView },
                { path: "/clientes/novo", component: FormView },
                { path: "/clientes/:id/editar", component: FormView },
        ],
});