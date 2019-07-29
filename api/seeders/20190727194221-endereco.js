'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Enderecos', [{
      "rua": "Rua Major Ávila",
      "numero": "67 - Bl 2",
      "complemento": "Apt 101",
      "bairro": "Tijuca",
      "aluno_id": 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "rua": "Rua Cachambi",
      "numero": "s/n",
      "complemento": null,
      "bairro": "Cachambi",
      "aluno_id": 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "rua": "Rua Cachambu",
      "numero": "30",
      "complemento": null,
      "bairro": "Cachambu",
      "aluno_id": 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Enderecos', null, { truncate: true });
  }
};
