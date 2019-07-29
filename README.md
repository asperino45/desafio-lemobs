### Desafio API Lemobs
---

Seja bem vindo ao Desafio API Lemobs!

Utilize o documento "Instruções do Desafio API Lemobs" para se guiar pelas tarefas a serem realizadas.

---

### Roteiro Rápido de Configuração Local

**1)** Instalar Python 3.7.2 (versão recomendada!) - https://www.python.org/downloads/release/python-372/

**2)** Instalar Node versão 10.15.0 (versão recomendada!) - https://nodejs.org/dist/v10.15.0/

**3)** Entrar na pasta do projeto e copiar o arquivo ".env.example" e renomear a cópia para ".env" (manter a cópia na raiz do projeto);

**4)** Preencher o arquivo com as informações de banco de dados necessárias.

**5)** Executar os seguintes comandos no terminal para instalar as dependências necessárias, ainda na pasta do projeto:

```
npm install
npm install nodemon
```

**6)** Instalar as seguintes dependências globais de desenvolvimento:

```
$ npm install -g sequelize-cli
$ npm install -g swagger
```

**7)** Executar os seguintes comandos para iniciar o bando de dados e adquirir os privilégios necessários:

```
$ cd ~/Projetos/diretorio_projeto
$ sequelize db:create
$ psql -U postgres -c 'grant all privileges on database "banco_dados" to usuario;'
```

**8)** Executar a migração do banco de dados e verificar seu estado:

```
$ sequelize db:migrate
$ sequelize db:migrate:status
$ psql -U usuario -d banco_dados -c '\dt'
```

**9)** Executar o seguinte comando no terminal para iniciar a aplicação:

```
npm start
```


Acessar a aplicação no endereço e portas definidos no arquivo ".env". Exemplo: http://localhost:8001
