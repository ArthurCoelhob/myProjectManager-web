
# myProjectManager-web
## Descrição

Plataforma web que possibilita que os usuarios gerenciem seus projetos e tarefas associadas.
A aplicação permite a criação, edição e remoção de projetos e tarefas associadas.
## Arquitetura

A arquitetura foi baseada em camadas para garantir uma sepração clara de responsabilidade e uma fácil manutenção de codigo

Camada de Aplicação (Application): Responsável por receber as requisições HTTP, processá-las e direcioná-las para a camada de domínio. Aqui estão localizados os controllers da API.

Camada de Domínio (Domain): Contém a lógica de negócios da aplicação, incluindo serviços e entidades.

Camada de Interface (Interface): Responsável pela comunicação entre as camadas de aplicação e domínio. Aqui estão localizados os DTOs (Data Transfer Objects) que definem a estrutura dos dados que são transferidos entre as diferentes partes da aplicação.

Camada de Infraestrutura (Infrastructure): Responsável por configurar o banco de dados, definir os scripts de migração e realizar outras tarefas de infraestrutura. Aqui estão localizados os arquivos relacionados ao banco de dados e configurações de conexão.
## Configurando o ambiente local

1. Clone o repositório do projeto:

   ```
   git clone https://github.com/ArthurCoelhob/myProjectManager-web.git
   ```

2. Acesse o diretório do projeto:

   ```
   cd myProjectManager-web/
   ```

3. Instale os pacotes do projeto:

   ```
   cd src/backend && npm i
   ```

   ```
   cd src/frontend && npm i
   ```

4. Crie o banco de dados utilizando o script "src/backend/src/infrastructure/scripts -> ScriptDB.sql"

    verifique os arquivos "src/backend/src/infrastructure/config.ts"
     ```export const databaseConfig = {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '123',
        database: process.env.DB_NAME || 'project_manager_db',
        } as const;
    ```
    
    dentro de "src/backend/src/infrastructure" podemos testar a nossa conexão
   ```
    ts-node test-database-connection.ts
   ```
   esperado: 
    ```
    Conexão com o banco de dados bem-sucedida!
    Conexões fechadas.
     ```
## Executando o projeto

1. Para executar o backend, utilize os seguintes comandos dentro da pasta "src/backend" do projeto:

   ```
   npm run start
   ```

2. O servidor será iniciado e estará acessível em um dos seguinte endereços:

  ```
   https://localhost:3000
   ```


3. Para executar o frontend, utilize os seguintes comandos dentro da pasta "src/frontend" do projeto:

   ```
   npm run serve
   ```

4. O servidor será iniciado e estará acessível em um dos seguinte endereços:

  ```
   https://localhost:8080
   ```

### Utilização da Aplicação

Após seguir os passos acima, você poderá acessar a aplicação web.

### Configuração de CORS

Se você encontrar problemas com CORS, você pode configurar o arquivo (src/backend/src/main.ts):

   ```
     app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
   ```
### Documentação API
`MyProjectManager.postman_collection.json` 