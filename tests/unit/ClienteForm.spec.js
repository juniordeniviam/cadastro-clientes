import { mount } from "@vue/test-utils";
import ClienteForm from "@/components/ClienteForm.vue";

describe("ClienteForm", () => {
        describe("mascararTelefone", () => {
                const mascarar = (v) => mount(ClienteForm).vm.mascararTelefone(v);

                it("formata celular com 11 dígitos", () => {
                        expect(mascarar("21987654321")).toBe("(21) 98765-4321");
                });

                it("formata fixo com 10 dígitos", () => {
                        expect(mascarar("2187654321")).toBe("(21) 8765-4321");
                });

                it("remove letras e símbolos", () => {
                        expect(mascarar("2a1b")).toBe("21");
                });

                it("limita a 11 dígitos", () => {
                        expect(mascarar("219876543219999")).toBe("(21) 98765-4321");
                });
        });

        describe("validação", () => {
                it("mostra erro e não emite com e-mail inválido", async () => {
                        const wrapper = mount(ClienteForm);
                        const inputs = wrapper.findAll("input");
                        await inputs.at(0).setValue("Ana");
                        await inputs.at(1).setValue("abc");
                        await wrapper.find("button").trigger("click");

                        expect(wrapper.find(".erro").text()).toContain("e-mail válido");
                        expect(wrapper.emitted("salvar")).toBeFalsy();
                });

                it("mostra erro quando o nome está vazio", async () => {
                        const wrapper = mount(ClienteForm);
                        await wrapper.find("button").trigger("click");

                        expect(wrapper.find(".erro").text()).toContain("nome");
                });

                it("emite 'salvar' com os dados quando tudo é válido", async () => {
                        const wrapper = mount(ClienteForm);
                        const inputs = wrapper.findAll("input");
                        await inputs.at(0).setValue("Ana");
                        await inputs.at(1).setValue("ana@email.com");
                        await wrapper.find("button").trigger("click");

                        expect(wrapper.emitted("salvar")[0][0]).toEqual({
                                nome: "Ana",
                                email: "ana@email.com",
                                telefone: "",
                        });
                });
        });
});