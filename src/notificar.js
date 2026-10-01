import Vue from "vue";

export const toast = Vue.observable({ texto: "", tipo: "sucesso" });

let timer;

export function notificar(texto, tipo = "sucesso") {
        toast.texto = texto;
        toast.tipo = tipo;
        clearTimeout(timer);
        timer = setTimeout(() => {
                toast.texto = "";
        }, 3000);
}