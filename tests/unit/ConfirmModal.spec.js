import { mount } from "@vue/test-utils";
import ConfirmModal from "@/components/ConfirmModal.vue";

describe("ConfirmModal", () => {
        it("não renderiza quando visivel é false", () => {
                const wrapper = mount(ConfirmModal, { propsData: { visivel: false } });
                expect(wrapper.find(".modal").exists()).toBe(false);
        });

        it("mostra a mensagem quando visivel é true", () => {
                const wrapper = mount(ConfirmModal, {
                        propsData: { visivel: true, mensagem: "Excluir Ana?" },
                });
                expect(wrapper.text()).toContain("Excluir Ana?");
        });

        it("emite 'confirmar' ao clicar no botão de confirmação", async () => {
                const wrapper = mount(ConfirmModal, { propsData: { visivel: true } });
                await wrapper.find("button.perigo").trigger("click");
                expect(wrapper.emitted("confirmar")).toBeTruthy();
        });

        it("emite 'cancelar' ao clicar no fundo", async () => {
                const wrapper = mount(ConfirmModal, { propsData: { visivel: true } });
                await wrapper.find(".modal-fundo").trigger("click");
                expect(wrapper.emitted("cancelar")).toBeTruthy();
        });
});