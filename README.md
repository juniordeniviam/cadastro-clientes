# Cadastro de Clientes

Projeto simples de cadastro de clientes feito com **Vue 2**, **Vue Router**, **Vuex**, **axios** e **json-server**.

> **Nota:** o Vue 2 chegou ao fim de vida (EOL) em dezembro de 2023. Este projeto é para estudo e mantém a versão 2 de propósito.

## Funcionalidades

- Cadastrar, editar e excluir clientes
- Validação de e-mail e máscara de telefone
- Busca por nome, e-mail ou telefone
- Ordenação por coluna e paginação
- Modal de confirmação para exclusão
- Notificações na tela (toast) e indicador de carregamento
- Navegação entre páginas (lista e formulário)
- Dados persistidos em uma API REST local (json-server)
- Testes unitários (Jest) e testes ponta a ponta (Cypress)

## Tecnologias

- Vue 2 (Vue CLI)
- Vue Router 3
- Vuex 3
- axios
- json-server 0.17.4
- Jest e @vue/test-utils 1.x
- Cypress

## Pré-requisitos

- Node.js 18 ou superior (exigência do Cypress)

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

> Com Node 17 ou superior, se aparecer o erro `ERR_OSSL_EVP_UNSUPPORTED`, rode antes:
> - Windows (cmd): `set NODE_OPTIONS=--openssl-legacy-provider`
> - Linux/macOS: `export NODE_OPTIONS=--openssl-legacy-provider`

## Testes

### Unitários (Jest)

Cobrem componentes (`ClienteForm`, `ConfirmModal`) e o store do Vuex, com a API simulada por mock.

```bash
npm run test:unit
```

Para rodar em modo observação: `npm run test:unit -- --watch`.

### Ponta a ponta (Cypress)

Cobrem o fluxo completo no navegador: listar, buscar, ordenar, paginar, cadastrar, editar e excluir. As chamadas à API são interceptadas com `cy.intercept`, então **não é preciso rodar a API** e o `db.json` não é alterado. É necessário que o front-end esteja rodando (`npm run serve`).

```bash
# em um terminal
npm run serve

# em outro terminal: abre a interface do Cypress
npm run e2e

# ou executa tudo no terminal, sem interface
npm run e2e:run
```

## Estrutura

```
src/
├── main.js                     # ponto de entrada, registra router e store
├── App.vue                     # moldura: menu, router-view, toast, loading e estilos globais
├── api.js                      # instância do axios (baseURL da API)
├── notificar.js                # estado e função das mensagens (toast)
├── router/
│   └── index.js                # definição das rotas
├── store/
│   └── index.js                # Vuex: estado, mutations e actions de clientes
├── views/
│   ├── ListaView.vue           # lista: busca, ordena, pagina e exclui (via store)
│   └── FormView.vue            # cadastro e edição (via store)
└── components/
    ├── ClienteForm.vue         # formulário, validação de e-mail e máscara de telefone
    ├── ClienteLista.vue        # tabela de clientes com cabeçalhos ordenáveis
    └── ConfirmModal.vue        # modal de confirmação reutilizável
tests/
└── unit/
    ├── ClienteForm.spec.js     # testes da máscara, validação e evento "salvar"
    ├── ConfirmModal.spec.js    # testes de exibição e eventos do modal
    └── store.spec.js           # testes das actions e mutations do Vuex
cypress/
├── .eslintrc.js                # globais do Cypress para o ESLint
├── support/
│   └── api.js                  # API falsa com estado em memória (cy.intercept)
└── e2e/
    └── clientes.cy.js          # testes do fluxo completo
public/
└── _redirects                  # fallback de rotas no Netlify (modo history)
cypress.config.js               # configuração do Cypress
vue.config.js                   # configuração do Vue CLI (sem source maps em produção)
db.json                         # "banco de dados" do json-server
.env.development                # URL da API em desenvolvimento
.env.production                 # URL da API em produção
```

## Scripts

| Comando             | Descrição                                      |
| ------------------- | ---------------------------------------------- |
| `npm run serve`     | Inicia o front-end em desenvolvimento          |
| `npm run api`       | Inicia a API json-server na porta 3000         |
| `npm run build`     | Gera a versão de produção na pasta `dist`      |
| `npm run lint`      | Verifica o código com ESLint                   |
| `npm run test:unit` | Executa os testes unitários                    |
| `npm run e2e`       | Abre o Cypress (requer `npm run serve` ativo)  |
| `npm run e2e:run`   | Executa os testes E2E no terminal              |

## Publicação

A URL da API é definida pela variável `VUE_APP_API_URL`:

- **Desenvolvimento:** `.env.development` (`http://localhost:3000`)
- **Produção:** `.env.production` (troque pela URL da sua API hospedada)

Como o roteador usa `mode: "history"`, o servidor precisa redirecionar todas as rotas para o `index.html`. No Netlify isso é feito pelo arquivo `public/_redirects`.