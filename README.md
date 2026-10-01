# Cadastro de Clientes

Projeto simples de cadastro de clientes feito com **Vue 2**, **axios** e **json-server**.

## Funcionalidades

- Cadastrar, editar e excluir clientes
- Validação de e-mail
- Busca por nome, e-mail ou telefone
- Dados persistidos em uma API REST local (json-server)

## Tecnologias

- Vue 2 (Vue CLI)
- axios
- json-server 0.17.4

## Pré-requisitos

- Node.js (versão 14 a 16 recomendada para Vue 2)

## Como rodar

1. Instale as dependências:

```bash
   npm install
```

2. Em um terminal, inicie a API (porta 3000):

```bash
   npm run api
```

3. Em **outro** terminal, inicie o front-end:

```bash
   npm run serve
```

4. Acesse `http://localhost:8080`.

> Em Node 17 ou superior, se aparecer o erro `ERR_OSSL_EVP_UNSUPPORTED`, rode antes:
> - Windows (cmd): `set NODE_OPTIONS=--openssl-legacy-provider`
> - Linux/macOS: `export NODE_OPTIONS=--openssl-legacy-provider`

## Estrutura

```
src/
├── main.js                     # ponto de entrada, registra o router
├── App.vue                     # moldura: menu, router-view e toast
├── api.js                      # instância do axios (baseURL da API)
├── notificar.js                # estado e função das mensagens (toast)
├── router/
│   └── index.js                # definição das rotas
├── views/
│   ├── ListaView.vue           # página da lista: carrega, busca e exclui
│   └── FormView.vue            # página de cadastro e edição
└── components/
    ├── ClienteForm.vue         # formulário, validação de e-mail e máscara de telefone
    └── ClienteLista.vue        # tabela de clientes
db.json                         # "banco de dados" do json-server
```

## Scripts

| Comando         | Descrição                         |
| --------------- | --------------------------------- |
| `npm run serve` | Inicia o front-end em desenvolvimento |
| `npm run api`   | Inicia a API json-server na porta 3000 |
| `npm run build` | Gera a versão de produção         |
| `npm run lint`  | Verifica o código com ESLint      |