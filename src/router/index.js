import Vue from "vue";
import VueRouter from "vue-router";
import ListaView from "../views/ListaView.vue";
import FormView from "../views/FormView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
        mode: "history",
        routes: [
                { path: "/", component: ListaView, meta: { titulo: "Clientes" } },
                { path: "/clientes/novo", component: FormView, meta: { titulo: "Novo cliente" } },
                { path: "/clientes/:id/editar", component: FormView, meta: { titulo: "Editar cliente" } },
                { path: "*", redirect: "/" },
        ],
        scrollBehavior() {
                return { x: 0, y: 0 };
        },
});

router.afterEach((to) => {
        const titulo = to.meta.titulo || "Clientes";
        document.title = `${titulo} | Cadastro de Clientes`;
});

export default router;