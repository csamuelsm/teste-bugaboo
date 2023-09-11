### Como executar

Primeiramente, você precisa instalar todos os pacotes do front-end e do back-end. A partir da raiz do projeto, rode os seguintes comandos:

```bash
npm i --force
cd backend
npm i
```

Abra o arquivo `./backend/.env.sample`, gere algumas strings aleatórias de **tamanho 16** (você pode usar [esse site](https://www.random.org/strings/) para fazer isso) e substitua onde tem "tobemodified" por strings que você gerou. O arquivo é assim:

```
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
```

E deve ficar parecido com isso:

```
HOST=0.0.0.0
PORT=1337
APP_KEYS="0150143506616496,9170463937416778"
API_TOKEN_SALT=8016843512804717
ADMIN_JWT_SECRET=6499970928803491
TRANSFER_TOKEN_SALT=5457119288874542
JWT_SECRET=6735683277381263
```

Remova o `.sample` do `.env.sample`, deixando o nome do arquivo apenas `.env`. Em seguida, a partir da pasta `./backend/`, execute:

```bash
npm run develop
```

Espere alguns instantes e o Strapi deve abrir no endereço `http:localhost:1337`. Crie um usuário para você e abra o painel admin em `http://localhost:1337/admin` caso o painel já não tenha sido aberto automaticamente.

No menu do lado esquerdo no painel, navegue até `Settings` em seguida para `API Tokens` e gere um token de acesso para você. Selecione a duração que desejar e em `Token type`, selecione a opção `Full access`. Com isto, você tem um token com todas as permissões para executar ações no banco de dados.

Edite o arquivo `.env.sample` (da raiz do projeto, não o da pasta `./backend/`), adicionando o token que você acabou de gerar e, além disso, crie uma string aleatória e atribua ela à variável `AUTH_SECRET`:

```
NEXT_PUBLIC_STRAPI_TOKEN="SEU TOKEN AQUI"
NEXT_PUBLIC_STRAPI_URL="http://127.0.0.1:1337"
AUTH_SECRET="STRING ALEATÓRIA AQUI"
```

A variável `NEXT_PUBLIC_STRAPI_URL` pode deixar como `"http://127.0.0.1:1337"` mesmo.

Remova o `.sample`, deixando o arquivo com o nome apenas `.env`. Assim, estas variáveis serão carregadas no projeto durante a inicialização.

Deixe o backend rodando no terminal e, em outro terminal, abra a raiz do projeto e execute:

```bash
npm run dev
```

Abra o endereço `http://localhost:3000/` no seu navegador, espere compilar, crie seu usuário e pode começar a utilizar o sistema.

### Features implementadas

[x] Cadastro e Login/Logout
[x] Proteção de páginas através de autenticação
[x] Verificação de formato `.glb` válido
[x] Upload de arquivo
[x] Deleção de arquivo
[x] Visualização de `.glb` utilizando `model-viewer`