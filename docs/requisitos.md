**Requisitos Funcionais:**

1. **Processamento do Arquivo:**
   - O sistema deve ser capaz de receber um arquivo desnormalizado via API REST.
   - Deve processar as informações do arquivo, seguindo a estrutura especificada (tamanho e tipo de campo).
   - Os dados processados devem ser transformados em um formato JSON normalizado.

2. **Consulta Geral de Pedidos:**
   - O sistema deve disponibilizar uma API REST para consulta geral de pedidos.
   - A resposta deve seguir a estrutura de payload especificada, incluindo informações de usuários, pedidos, produtos, valores totais e datas.

3. **Filtros de Consulta:**
   - A API deve permitir a inclusão de filtros na consulta geral de pedidos.
   - Deve ser possível filtrar por ID do pedido.
   - Deve ser possível definir um intervalo de data de compra (data início e data fim) para a consulta.

4. **Lógica de Agregação:**
   - Ao processar os dados, o sistema deve agregar as informações de pedidos para cada usuário, calculando o valor total de cada pedido.
   - Os produtos de cada pedido devem ser listados na resposta da API.

**Requisitos Não Funcionais:**

1. **Testes:**
   - O código deve ser coberto por testes unitários que garantam a correta transformação dos dados e o funcionamento adequado das consultas.

2. **SOLID:**
   - O código deve seguir os princípios SOLID, garantindo modularidade, coesão e baixo acoplamento.

3. **Desenho da API:**
   - A API REST deve seguir boas práticas de design, como o uso adequado de verbos HTTP, nomes de recursos intuitivos e consistência na estrutura de resposta.

4. **Automação:**
   - Ferramentas de automação devem ser utilizadas para tarefas como build do código e cobertura de testes.

5. **Git:**
   - O código deve ser versionado utilizando Git.
   - Commits devem ser frequentes, atomizados e acompanhados de mensagens descritivas.

6. **Documentação:**
   - Deve haver documentação clara e concisa sobre como executar o sistema, realizar consultas e realizar modificações no código.
