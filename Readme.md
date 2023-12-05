# Technical Challenge API Documentation

## Overview

Este repositório contém a documentação da API para o desafio técnico. A API foi projetada para gerenciar pedidos, produtos e informações do usuário de um sistema legado. Abaixo está uma visão geral da estrutura e funcionalidade da API.

## Stack do Projeto

### Framework e Servidor HTTP
- **@hapi/hapi (^21.3.2):** O framework Hapi.js foi escolhido para facilitar o desenvolvimento da API. Sua abordagem modular e configuração centrada em plugins proporciona uma estrutura robusta para construir aplicativos web.

### Plugins Hapi
- **@hapi/inert (^7.1.0):** O plugin Inert é utilizado para lidar com ativos estáticos (por exemplo, arquivos CSS, imagens) e fornece suporte para manipulação de arquivos no servidor.

- **@hapi/vision (^7.0.3):** O plugin Vision é utilizado para integração com mecanismos de modelo de visualização. Ele é essencial para a renderização de respostas HTML dinâmicas.

- **hapi-swagger (^17.2.0):** O hapi-swagger é incorporado para facilitar a documentação da API com Swagger. Ele gera automaticamente uma interface interativa baseada em GUI que simplifica o entendimento e teste da API.

### Validação de Dados
- **joi (^17.11.0):** O Joi é utilizado para validação de dados. Ele ajuda a garantir que os dados recebidos pela API estejam em conformidade com as expectativas, aumentando a segurança e robustez do sistema.

### Banco de Dados
- **pg (^8.11.3):** O módulo pg é utilizado para interagir com o banco de dados PostgreSQL. Ele fornece uma camada de abstração para realizar consultas SQL no banco de dados.

- **node-pg-migrate (^6.2.2):** Node-pg-migrate é utilizado para facilitar a migração do esquema do banco de dados. Ele permite gerenciar as alterações no banco de dados de maneira organizada e controlada.

### Processamento Sob Demanda com Streams do Node.js
Para otimizar o processamento de dados e melhorar o desempenho da aplicação, Streams do Node.js são utilizadas. Streams proporcionam uma maneira eficiente de lidar com grandes conjuntos de dados, permitindo o processamento sob demanda e evitando a necessidade de carregar todos os dados na memória de uma vez. Isso é especialmente útil ao lidar com operações de leitura e gravação de dados, garantindo uma resposta eficiente e escalável da API.

Para visualizar o pipeline de processamento em detalhes, consulte o [diagrama de fluxo do pipeline](https://github.com/wilgnne/technical-challenge/blob/main/docs/file-upload-pipeline.md).

### Modelo de Entidade-Relacionamento (ER)

Consulte o [Diagrama de ER](https://github.com/wilgnne/technical-challenge/blob/main/docs/er-diagram.md) para uma visão rápida da estrutura de dados do sistema, incluindo as entidades "Usuário," "Pedido" e "Produto," bem como seus relacionamentos. Este diagrama é essencial para uma compreensão visual da organização dos dados.

### Pré-requisitos:

1. Certifique-se de ter o Docker e o Docker Compose instalados em seu sistema. Se ainda não tiver, siga as instruções de instalação para [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/).

### Passos:

1. **Clone este Repositório:**

   ```bash
   git clone https://github.com/wilgnne/technical-challenge.git
   cd technical-challenge
   ```

2. **Levante os Contêineres:**

   Execute o seguinte comando para levantar os contêineres definidos no arquivo `docker-compose.yml`:

   ```bash
   docker-compose up -d
   ```

   Isso iniciará os serviços da aplicação (`app`) e do banco de dados PostgreSQL (`db`) em segundo plano.

3. **Verifique o Status dos Contêineres:**

   Você pode verificar se os contêineres estão em execução usando:

   ```bash
   docker-compose ps
   ```

   Certifique-se de que ambos os contêineres estão marcados como "Up".

4. **Acesse a Aplicação:**

   A aplicação estará acessível em [http://localhost:3000/swagger](http://localhost:3000/swagger).

5. **Desligar os Contêineres:**

   Para desligar os contêineres quando não estiver mais usando a aplicação, execute:

   ```bash
   docker-compose down
   ```

   Isso encerrará os contêineres e removerá os volumes associados.

Agora você tem o ambiente configurado e a aplicação pronta para uso. Se encontrar problemas, verifique os logs dos contêineres usando `docker-compose logs`.

## Endpoints

### 1. Get Orders

- **Endpoint:** `/order`
- **Method:** GET
- **Summary:** Recuperar pedidos com base em parâmetros especificados.
- **Parameters:**
  - `orderId` (query, type: number)
  - `startDate` (query, type: string, format: date)
  - `endDate` (query, type: string, format: date)
  - `page` (query, type: number)
  - `pageSize` (query, type: number)
- **Tags:** order
- **Responses:**
  - `200` - Successful
    - Content:
      - `application/json`

### 2. File Upload (Raw)

- **Endpoint:** `/file-upload/raw`
- **Method:** POST
- **Summary:** Receba um arquivo do sistema legado.
- **Parameters:**
  - `ifExist` (query, type: string, enum: ["SKIP", "REPLACE", "ERROR"])
- **Tags:** file-upload
- **Request Body:**
  - `application/octet-stream`: File
- **Responses:**
  - `200` - Successful
    - Content:
      - `application/json`

### 2. File Upload (multipart/form-data)

- **Endpoint:** `/file-upload/form`
- **Method:** POST
- **Summary:** Receba um arquivo do sistema legado por multipart/form-data.
- **Parameters:**
  - `ifExist` (query, type: string, enum: ["SKIP", "REPLACE", "ERROR"])
- **Tags:** file-upload
- **Request Body:**
  - `multipart/form-data`
- **Responses:**
  - `200` - Successful
    - Content:
      - `application/json`

## Uso

Para usar a API, consulte os endpoints fornecidos com os métodos e parâmetros HTTP correspondentes. Certifique-se de verificar os formatos da solicitação e resposta esperados com base nos modelos fornecidos.
