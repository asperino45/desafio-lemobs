'use strict';
module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
  }, {});
  Endereco.associate = function (models) {
    // associations can be defined here
    Endereco.belongsTo(models.Aluno, { foreignKey: 'alunoId', as: 'aluno_id' });
  };
  return Endereco;
};