# Technical Challenge API Documentation

## Overview

Este repositório contém a documentação da API para o desafio técnico. A API foi projetada para gerenciar pedidos, produtos e informações do usuário de um sistema legado. Abaixo está uma visão geral da estrutura e funcionalidade da API.

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
