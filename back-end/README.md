
## Description

[Nest](https://github.com/nestjs/nest) Back-end do chat. Tem como objetivo servir uma conexão [WebSocket](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets_API)

## Setup

1. instale as dependências `npm install`
2. execute o docker `docker-compose up -d`
3. copie as keys do arquivo `.env.example` para `.env`
4. rode as migrations `npx prisma migrate dev`
5. execute o projeto


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```