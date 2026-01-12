# Projeto login backend
## estrutura
```
├── 📁 src
│   ├── 📁 config
│   │   └── 📄 db.js
│   ├── 📁 controllers
│   │   └── 📄 Login.controller.js
│   ├── 📁 middleware
│   │   ├── 📄 auth.middleware.js
│   │   └── 📄 redirect.middleware.js
│   ├── 📁 models
│   │   └── 📄 Login.model.js
│   ├── 📁 router
│   │   └── 📄 Login.route.js
│   └── 📄 app.js
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 server.js
```

## PASTAS E ARQUIVOS IMPORTANTES


###  /config
mexe com a conexão com o banco de dados.
### /controllers
fazem o fluxo de informações recebidas, tratadas e enviadas.
### /middleware 
fazem a autenticação das rotas. 
### /models 
fazem o controle das informações do banco(pegar informações adicionar informações).
### /router 
gerencia as rotas que serão exibidas.
### app.js
junta tudo e faz configuração do .env
### server.js
cria o servidor para servir o app.js

## INSTALAR E INICIAR

instalar as dependencias:
```
npm i
```
iniciar o projeto:
```
npm run dev
```
ou 
```
npm run start
```
start para modo de produção, dev para desenvolvimento
