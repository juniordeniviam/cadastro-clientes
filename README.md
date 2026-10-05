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
- Testes unitários com Jest

## Tecnologias

- Vue 2 (Vue CLI)
- Vue Router 3
- Vuex 3
- axios
- json-server 0.17.4
- Jest e @vue/test-utils 1.x

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

## Testes

```bash
npm run test:unit
```

Para rodar em modo observação: `npm run test:unit -- --watch`.

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
    └── ConfirmModal.spec.js    # testes de exibição e eventos do modal
public/
└── _redirects                  # fallback de rotas no Netlify (modo history)
db.json                         # "banco de dados" do json-server
.env.development                # URL da API em desenvolvimento
.env.production                 # URL da API em produção
```

## Scripts

| Comando             | Descrição                                 |
| ------------------- | ----------------------------------------- |
| `npm run serve`     | Inicia o front-end em desenvolvimento     |
| `npm run api`       | Inicia a API json-server na porta 3000    |
| `npm run build`     | Gera a versão de produção na pasta `dist` |
| `npm run lint`      | Verifica o código com ESLint              |
| `npm run test:unit` | Executa os testes unitários               |

## Publicação

A URL da API é definida pela variável `VUE_APP_API_URL`:

- **Desenvolvimento:** `.env.development` (`http://localhost:3000`)
- **Produção:** `.env.production` (troque pela URL da sua API hospedada)

Como o roteador usa `mode: "history"`, o servidor precisa redirecionar todas as rotas para o `index.html`. No Netlify isso é feito pelo arquivo `public/_redirects`.