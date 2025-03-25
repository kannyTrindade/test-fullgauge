
# Teste Crud Básico

Este é um projeto básico de CRUD (Create, Read, Update, Delete) em React. O projeto utiliza a biblioteca **Vite** para desenvolvimento rápido e **JSON Server** para simular uma API RESTful com um arquivo JSON como banco de dados.

## Tecnologias Utilizadas

- **React**: Biblioteca para construir interfaces de usuário.
- **Vite**: Ferramenta de bundling e desenvolvimento rápido.
- **Vitest**: Framework de testes unitários para o React.
- **JSON Server**: Simula uma API RESTful com um arquivo JSON.
- **Material-UI**: Biblioteca de componentes React para criar interfaces modernas e responsivas.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **React Hook Form**: Biblioteca para gerenciar formulários no React.
- **Zod**: Biblioteca para validação de dados.
- **React Table**: Biblioteca para construir tabelas interativas.
- **zustand**: Gerenciamento de estado minimalista para o React.

## Como Iniciar

1. Clone o repositório para sua máquina local:

   ```bash
   git clone https://github.com/seu-usuario/teste-crud-basico.git
   ```
2. Instale as dependências do projeto:

   ```bash
   npm install
   ```
3. Inicie o ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

Isso irá iniciar o Vite para o front-end e o JSON Server para simular a API.

O projeto será acessível em [http://localhost:3000]() e o servidor JSON Server estará disponível em [http://localhost:5173]().


## Scripts

* `npm run dev`: Inicia o servidor de desenvolvimento com Vite e JSON Server simultaneamente.
* `npm run build`: Cria uma versão otimizada para produção.
* `npm run preview`: Preview da aplicação de produção.
* `npm run test`: Executa os testes unitários com Vitest.
* `npm run json-server`: Inicia o JSON Server manualmente com o arquivo `registros.json`.

## Estrutura do Projeto

* **/src**: Contém o código fonte da aplicação.
* **/components**: Componentes React reutilizáveis.
* **/styles**: Estilos globais ou específicos dos componentes.
* **/stores**: Gerenciamento de estados.
* **/test:** local da configuração do Vitest


## Testes

Este projeto utiliza **Vitest** para testes unitários. Para rodar os testes, utilize o seguinte comando:

```bash
npm run test
```
