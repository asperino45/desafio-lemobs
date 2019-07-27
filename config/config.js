module.exports = {
  development: {
    use_env_variable: 'BD_URI'
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
