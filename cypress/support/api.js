export function stubApi(inicial = []) {
        let clientes = inicial.map((c) => ({ ...c }));
        let proximoId = Math.max(0, ...clientes.map((c) => c.id)) + 1;

        const idDaUrl = (url) => Number(url.split("/").pop());

        cy.intercept("GET", /localhost:3000\/clientes$/, (req) => {
                req.reply(clientes);
        }).as("listar");

        cy.intercept("GET", /localhost:3000\/clientes\/\d+$/, (req) => {
                const c = clientes.find((x) => x.id === idDaUrl(req.url));
                c ? req.reply(c) : req.reply({ statusCode: 404, body: {} });
        }).as("buscar");

        cy.intercept("POST", /localhost:3000\/clientes$/, (req) => {
                const novo = { ...req.body, id: proximoId++ };
                clientes.push(novo);
                req.reply(201, novo);
        }).as("criar");

        cy.intercept("PUT", /localhost:3000\/clientes\/\d+$/, (req) => {
                const id = idDaUrl(req.url);
                const atualizado = { ...req.body, id };
                clientes = clientes.map((c) => (c.id === id ? atualizado : c));
                req.reply(atualizado);
        }).as("atualizar");

        cy.intercept("DELETE", /localhost:3000\/clientes\/\d+$/, (req) => {
                const id = idDaUrl(req.url);
                clientes = clientes.filter((c) => c.id !== id);
                req.reply({});
        }).as("excluir");
}