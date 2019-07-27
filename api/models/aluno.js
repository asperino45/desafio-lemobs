'use strict';
module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
    nome: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    cpf: DataTypes.STRING,
    nota: DataTypes.FLOAT
  }, {});
  Aluno.associate = function (models) {
    // associations can be defined here
    Aluno.hasMany(models.Endereco, {
      foreignKey: 'endereco_id',
      as: 'endereco'
    })
  };
  return Aluno;
};