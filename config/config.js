module.exports = {
  development: {
    username: process.env.BD_USUARIO,
    password: process.env.BD_SENHA,
    database: process.env.BD_NOME,
    host: '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
      appName: process.env.BD_NOME_APLICACAO
    }
  },
  test: {
    username: process.env.BD_USUARIO,
    password: process.env.BD_SENHA,
    database: process.env.BD_NOME,
    host: '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
      appName: process.env.BD_NOME_APLICACAO
    }
  },
  production: {
    username: process.env.BD_USUARIO,
    password: process.env.BD_SENHA,
    database: process.env.BD_NOME,
    host: '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
      appName: process.env.BD_NOME_APLICACAO
    }
  }
};
