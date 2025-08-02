# API de Prática para Testes Automatizados

![Node.js](https://img.shields.io/badge/Node.js-14.x-blue?style=for-the-badge&logo=node.js)
![Licença](https://img.shields.io/badge/licença-MIT-green?style=for-the-badge)

## 📖 Sobre o Projeto

Esta API foi desenvolvida para a prática e demonstração de habilidades em testes automatizados durante um processo seletivo para o cargo de Analista de Testes (QA). Ela simula um sistema para cadastro de contribuintes e consulta de suas inscrições protestadas, com base em um caso de teste real proposto pela PGE-CE (Procuradoria-Geral do Estado do Ceará).

O objetivo principal é fornecer um ambiente estável com endpoints previsíveis para a criação de uma suíte completa de testes de API, incluindo cenários funcionais, de validação e negativos.

## ✨ Funcionalidades

- **Autenticação JWT**: Endpoints protegidos utilizando JSON Web Tokens.
- **Cadastro de Contribuintes**: Endpoint para registrar novos contribuintes.
- **Validação de Dados**: Inclui validação no lado do servidor para:
    - Campos obrigatórios.
    - Formato do CPF (11 dígitos).
    - CPF único (não permite duplicados).
- **Consulta de Inscrições**: Endpoint para listar as inscrições protestadas de um contribuinte específico.

## 🛠️ Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript.
- **[Express](https://expressjs.com/)**: Framework web minimalista e flexível para Node.js.
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**: Para gerar e verificar os tokens JWT para autenticação.
- **[cors](https://github.com/expressjs/cors)**: Pacote Node.js para habilitar o CORS (Cross-Origin Resource Sharing) através de um middleware.

## 🚀 Como Executar o Projeto

Siga as instruções abaixo para obter uma cópia do projeto e executá-la em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Você precisa ter o [Node.js](https://nodejs.org/en/download/) e o [npm](https://www.npmjs.com/get-npm) instalados em sua máquina.

### Execução

1.  **Navegue até o diretório do projeto:**
    ```sh
    cd seu-repositorio
    ```

3.  **Instale as dependências:**
    ```sh
    npm install
    ```

4.  **Inicie o servidor:**
    ```sh
    npm start
    ```

A API estará em execução em `http://localhost:3000`.

## 📚 Documentação dos Endpoints

Aqui estão os detalhes dos endpoints disponíveis na API.

---

### 1. Login

Autentica um usuário e retorna um token JWT.

- **URL**: `/login`
- **Método**: `POST`
- **Corpo da Requisição**:
  ```json
  {
    "usuario": "admin",
    "senha": "password"
  }
- **Resposta de Sucesso (200 OK)**:
 ```json
  {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
```
- **Resposta de Erro (400 Bad Request)**:
 ```json
  {
  "erro": "Usuário ou senha inválidos"
  }
```

### 2. Cadastrar Contribuinte

Cria um novo contribuinte no sistema. 
Requer autenticação.

- **URL**: `/contribuintes`
- **Método**: `POST`
- **Headers**: `x-access-token: Seu_Token_JWT`
- **Corpo da Requisição**:
  ```json
  {
    "cpf": "12345678901",
    "nome": "Fulana de Tal",
    "data_nascimento": "1995-05-20",
    "nome_mae": "Maria de Tal"
  }
- **Resposta de Sucesso (201 Created)**:
 ```json
  {
   "mensagem": "Contribuinte cadastrado com sucesso"
  }
```
- **Resposta de Erro (400 Bad Request)**:
 ```json
  {
  "erro": "Todos os campos obrigatórios devem ser preenchidos" 
  }
```
 ```json
  {
  "erro": "CPF inválido" 
  }
```

### 3. Listar Inscrições Protestadas

Lista as inscrições protestadas de um contribuinte específico. 
Requer autenticação. <br>
OBS: Apenas o CPF 12345678900 possui inscrição registrada.

- **URL**: `/inscricoes/:cpf`
- **Método**: `GET`
- **Headers**: `x-access-token: Seu_Token_JWT`
- **Parâmetros da URL**: `cpf=[string]` Obrigatório.
- **Resposta de Sucesso (200 OK)**:
 ```json
  {
    "cpf": "12345678900",
    "numero": "001",
    "descricao": "Dívida ativa",
    "valor": 1000.0,
    "data_inscricao": "2024-01-01",
    "data_prazo": "2024-12-31"
  }
```
- **Resposta de Erro (404 Not Found)**:
 ```json
  {
  "erro": "Nenhuma inscrição encontrada para o CPF fornecido"
  }
```
---

## Autor

Lucas Araújo de Almeida <br>
LinkedIn: https://www.linkedin.com/in/lucasaraujoqa/
