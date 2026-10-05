import { stubApi } from "../support/api";

const ana = { id: 1, nome: "Ana", email: "ana@email.com", telefone: "(21) 98765-4321" };
const bia = { id: 2, nome: "Bia", email: "bia@email.com", telefone: "(11) 91234-5678" };
const caio = { id: 3, nome: "Caio", email: "caio@email.com", telefone: "" };

describe("Lista de clientes", () => {
        it("mostra mensagem quando não há clientes", () => {
                stubApi([]);
                cy.visit("/");
                cy.contains("Nenhum cliente para exibir.");
        });

        it("lista os clientes da API", () => {
                stubApi([ana, bia]);
                cy.visit("/");
                cy.get("tbody tr").should("have.length", 2);
                cy.contains("td", "ana@email.com");
        });

        it("filtra pela busca", () => {
                stubApi([ana, bia, caio]);
                cy.visit("/");
                cy.get(".busca").type("bia");
                cy.get("tbody tr").should("have.length", 1);
                cy.contains("td", "Bia");
        });

        it("inverte a ordem ao clicar no cabeçalho Nome", () => {
                stubApi([bia, ana, caio]);
                cy.visit("/");
                cy.get("tbody tr").first().should("contain", "Ana");

                cy.contains("th", "Nome").click();
                cy.get("tbody tr").first().should("contain", "Caio");
        });

        it("pagina de 5 em 5", () => {
                const nomes = ["Ana", "Bia", "Caio", "Duda", "Edu", "Fabi", "Gui"];
                stubApi(
                        nomes.map((nome, i) => ({
                                id: i + 1,
                                nome,
                                email: `${nome.toLowerCase()}@email.com`,
                                telefone: "",
                        }))
                );
                cy.visit("/");
                cy.get("tbody tr").should("have.length", 5);
                cy.contains("Página 1 de 2");

                cy.contains("button", "Próxima").click();
                cy.get("tbody tr").should("have.length", 2);
                cy.contains("Página 2 de 2");
        });
});

describe("Cadastro", () => {
        beforeEach(() => stubApi([]));

        it("cadastra um cliente e volta para a lista", () => {
                cy.visit("/clientes/novo");
                cy.get('input[placeholder="Nome"]').type("Ana");
                cy.get('input[placeholder="E-mail"]').type("ana@email.com");
                cy.contains("button", "Cadastrar").click();

                cy.wait("@criar");
                cy.contains("Cliente cadastrado!");
                cy.location("pathname").should("eq", "/");
                cy.contains("td", "Ana");
        });

        it("aplica a máscara de telefone e ignora letras", () => {
                cy.visit("/clientes/novo");
                cy.get('input[placeholder="(00) 00000-0000"]')
                        .type("21a98765b4321")
                        .should("have.value", "(21) 98765-4321");
        });

        it("bloqueia e-mail inválido sem chamar a API", () => {
                cy.visit("/clientes/novo");
                cy.get('input[placeholder="Nome"]').type("Ana");
                cy.get('input[placeholder="E-mail"]').type("abc");
                cy.contains("button", "Cadastrar").click();

                cy.contains(".erro", "e-mail válido");
                cy.get("@criar.all").should("have.length", 0);
        });
});

describe("Edição e exclusão", () => {
        beforeEach(() => stubApi([ana, bia]));

        it("edita um cliente", () => {
                cy.visit("/");
                cy.contains("tr", "Ana").contains("a", "Editar").click();

                cy.location("pathname").should("eq", "/clientes/1/editar");
                cy.get('input[placeholder="Nome"]').should("have.value", "Ana");

                cy.get('input[placeholder="Nome"]').clear().type("Ana Paula");
                cy.contains("button", "Salvar").click();

                cy.wait("@atualizar");
                cy.contains("Cliente atualizado!");
                cy.contains("td", "Ana Paula");
        });

        it("carrega o cliente pela URL (como no F5)", () => {
                cy.visit("/clientes/2/editar");
                cy.get('input[placeholder="Nome"]').should("have.value", "Bia");
        });

        it("exclui pelo modal de confirmação", () => {
                cy.visit("/");
                cy.contains("tr", "Ana").contains("button", "Excluir").click();

                cy.contains(".modal", 'Deseja realmente excluir "Ana"?');
                cy.get(".modal button.perigo").click();

                cy.wait("@excluir");
                cy.contains("Cliente excluído.");
                cy.contains("td", "Ana").should("not.exist");
        });

        it("não exclui ao cancelar", () => {
                cy.visit("/");
                cy.contains("tr", "Ana").contains("button", "Excluir").click();
                cy.contains(".modal button", "Cancelar").click();

                cy.get(".modal").should("not.exist");
                cy.get("@excluir.all").should("have.length", 0);
                cy.contains("td", "Ana");
        });
});