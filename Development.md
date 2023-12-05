# Desenvolvimento

Se você deseja contribuir para o desenvolvimento do projeto ou executá-lo em modo de desenvolvimento, siga as instruções abaixo.

## Pré-requisitos:

1. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em seu sistema.
2. Instale o [Yarn](https://yarnpkg.com/) globalmente, caso ainda não o tenha:

   ```bash
   npm install -g yarn
   ```

## Configuração do Ambiente de Desenvolvimento:

1. **Clone este Repositório:**

   ```bash
   git clone https://github.com/wilgnne/technical-challenge.git
   cd technical-challenge
   ```

2. **Instale as Dependências:**

   Execute o seguinte comando para instalar as dependências do projeto:

   ```bash
   yarn install
   ```

## Execução em Modo de Desenvolvimento:

Para executar o projeto em modo de desenvolvimento, utilize os seguintes comandos:

1. **Compilar e Assistir Mudanças:**

   ```bash
   yarn watch
   ```

   Este comando compilará o código e ficará observando por mudanças nos arquivos, recompilando automaticamente quando necessário.

2. **Iniciar o Servidor em Modo de Desenvolvimento:**

   Em uma nova janela do terminal, execute:

   ```bash
   yarn dev
   ```

   Isso iniciará o servidor em modo de desenvolvimento.

O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

## Testes:

Para executar os testes, utilize os seguintes comandos:

- **Executar Testes:**

  ```bash
  yarn test
  ```

  Este comando executará os testes unitários.

- **Executar Testes com Cobertura:**

  ```bash
  yarn test:coverage
  ```

  Este comando executará os testes unitários e gerará um relatório de cobertura.

Agora você pode fazer alterações no código, garantindo que os testes estejam passando. Divirta-se codificando! 😊