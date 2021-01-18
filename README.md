# Orbit 

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

Graphql docs - [http://localhost:3000/graphql](http://localhost:3000/graphql)

Client - [Nuxt.js docs](https://nuxtjs.org).

Server - [Graphql Express docs](https://graphql.org/graphql-js/express-graphql/).

Example .env file

Replace MONGODB_URL with real one

```
MONGODB_URL="mongodb+srv://<user>:<password>@cluster0.ruepg.mongodb.net/<database>?retryWrites=true&w=majority"
API_BASE_URL="http://localhost:3000/api"
JWT_SECRET="mysupersecretkey"
TOKEN_EXPIRATION="1d"
GRAPHQL_BASE_URL="http://localhost:3000/graphql"
```
