
## Description

[Nest](https://github.com/nestjs/nest) Back-end do chat. Tem como objetivo servir uma conexão [WebSocket](https://developer.mozilla.org/pt-BR/docs/Web/API/WebSockets_API)

## Setup

1. instale as dependências `npm install`
2. execute o docker `docker-compose up -d`
3. copie as keys do arquivo `.env.example` para `.env`
4. rode as migrations `npx prisma migrate dev`
5. execute o projeto `npm run start:dev`


## Diagrama de como as aplicações interagem
![image](https://github.com/vladimiremi/my-care-force-challenge/assets/41305527/6032bf3d-0f9f-49b8-a25a-2b7424602565)


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
