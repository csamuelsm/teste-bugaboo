### Como executar

Primeiramente, você precisa instalar todos os pacotes do front-end e do back-end. A partir da raiz do projeto, rode os seguintes comandos:

```bash
npm i
cd backend && npm i
```

A partir da pasta `./backend/`, execute:

```bash
npm run develop
```

Espere alguns instantes e o Strapi deve abrir no endereço `http:localhost:1337`. Crie um usuário para você e abra o painel admin em `http:localhost:1337/admin` caso o painel já não tenha sido aberto automaticamente.

No menu do lado esquerdo no painel, navegue até `Settings` em seguido para `API Tokens` e gere um token de acesso para você. Selecione a duração que desejar e em `Token type`, selecione a opção `Full access`. Com isto, você tem um token com todas as permissões para executar ações no banco de dados.

Edite o arquivo `.env.sample`, adicionando o token que você acabou de gerar:

```
NEXT_PUBLIC_STRAPI_TOKEN="SEU TOKEN AQUI"
NEXT_PUBLIC_STRAPI_URL="http://localhost:1337"
```

Remova o `.sample`, deixando o arquivo com o nome apenas `.env`.

Em outro terminal, abra a raiz do projeto e execute:

```bash
npm run dev
```

Abra o endereço `http://localhost:3000/` no seu navegador, crie seu usuário e pode começar a utilizar o sistema.