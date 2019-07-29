'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Alunos', [{
      nome: 'The Rock',
      data_nascimento: '2001-09-11',
      cpf: '666.048.355-10',
      nota: '9.1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'The Boulder',
      data_nascimento: '2000-01-01',
      cpf: '77412199951',
      nota: '9.1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Alunos', null, { truncate: true });
  }
};
