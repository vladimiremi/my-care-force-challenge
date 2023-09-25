## Description

[Expo](https://docs.expo.dev/) Mobile do chat. Tem como objetivo mandar e receber mensagem interagindo com o Backend da aplicação

## Setup
1. Execute o [servidor](https://github.com/vladimiremi/my-care-force-challenge/tree/main/back-end) da aplicação antes
2. instale as dependências `npm install`
3. execute o projeto mobile `expo start`
4. Escaneie o QR code com o app Expo Go


**Dica:**
Você pode sentir dificuldade ao tentar fazer com que o app se conecte com o servidor local. A solução que encontrei para resolver esse problema por hora, foi mapeando minha conexão local usando [ngrok](https://ngrok.com/). Depois é só ir no arquivo `./src/screens/Chat/index.tsx`, na const `URL_SOCKET` e colocar a URL gerada pelo ngrok. Vou atualizando aqui caso eu encontre outra solução.
