# delivery-control-backend
This repository contains the backend codebase for Delivery Control, providing the server-side functionality and APIs necessary to support the application's features.

### Iniciando o projeto 

Esse comando vai ser resposnavel por instalar as dependencias do projeto, criar a instancia do banco de dados e criar os arquivos de configuração

```
npm run init
```

>Mas caso queira uma base **LIMPA**, sem dados populados rode o comando abaixo no lugar do anterior

```
npm run init -- limpa
```

### Rodar o projeto

Para rodar o projeto em sua maquina execute o comando 

```
npm run dev
```

### Comandos
#### Migrações

1. Criar uma migração

```
npx sequelize-cli migration:create --name nome_da_migração
```
2. Rodar todas as migrações pendentes

```
npx sequelize-cli db:migrate
```

3. Reverter todas as migrações

```
npx sequelize-cli db:migrate:undo:all
```

#### Seeders
1. Criar uma seed

```
npx sequelize-cli seed:generate --name nome-da-seed
```

2. Rodar todas as seeders

```
npx sequelize-cli db:seed:all
```

3. Reverter as seeders

```
npx sequelize-cli db:seed:undo:all
```



## Dependências 

**Node** : v20.11.1
