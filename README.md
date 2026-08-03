# 🚀 API REST para Gestão de Clientes

E## 🎯 Origem do Projeto & Mentoria

Este projeto foi idealizado e desenvolvido sob a orientação técnica da **Mentoria 2.0 do Julio de Lima**, uma das principais referências em testes e qualidade de software (QA) no ecossistema brasileiro. 

A estrutura da API foi desenhada estrategicamente para servir como um laboratório prático, permitindo aplicar na vida real os conceitos avançados de automação, pirâmide de testes e estratégias de validação discutidos ao longo da mentoria.

---

## 🛠️ Tecnologias Utilizadas

### 🟢 Core & Servidor
* **Node.js** — Ambiente de execução JavaScript no servidor.
* **Express** — Framework minimalista para gerenciamento de rotas e requisições HTTP.

### 🔒 Segurança & Configuração
* **JWT (JSON Web Token)** — Controle de acesso e autenticação segura de usuários.
* **CORS** — Mecanismo de segurança para controle de permissões de origens externas.
* **dotenv** — Gerenciamento isolado e seguro de variáveis de ambiente confidenciais.

### 💾 Armazenamento & Documentação
* **Banco em Memória (Arrays)** — Armazenamento volátil temporário, ideal para isolamento rápido em cenários de testes.
* **Swagger UI** — Documentação interativa da API para validação e testes manuais de rotas de ponta a ponta.

---

## 🧪 Estratégia de Testes

O foco técnico central deste projeto é a validação de comportamento e resiliência do código. A arquitetura foi desenhada para suportar os seguintes níveis de testes:

* **Testes Unitários:** Validação isolada de middlewares, controllers e funções utilitárias (ex: `AppError.js`).
* **Testes de Integração:** Fluxos completos de requisição e resposta (ex: fluxo de registro, login e posterior criação de um cliente autenticado).
* **Mocking:** Isolamento de estado e simulação de dados utilizando estruturas em memória para garantir testes rápidos e independentes.

---

## 🚀 Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com
cd ppp-mentoria-2026
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Configurar as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com base no modelo abaixo:
```text
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
```

### 4. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
Após iniciar, a documentação interativa das rotas estará disponível em: `http://localhost:3000/docs`

---

## 📁 Estrutura do Projeto

* `src/controllers`: Lógica de controle e tratamento de requisições.
* `src/middlewares`: Interceptadores de segurança e validações de rotas (ex: checagem de JWT).
* `src/models`: Estruturas de modelagem e manipulação de dados em memória.
* `src/routes`: Definição de endpoints e métodos HTTP (Auth, Clients, Users).
* `src/utils`: Classes de apoio global e padronização de erros (`AppError`).

---
Projeto desenvolvido durante a Mentoria 2.0 do Julio de Lima com o auxílio da IA Copilot para fins de evolução técnica e portfólio pessoal.
