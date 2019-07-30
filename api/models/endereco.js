'use strict';
module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
  }, {
      getterMethods: {
        endereco_formatado() {
          let compl = this.getDataValue('complemento') ? `, ${this.getDataValue('complemento')}` : "";
          return {
            endereco: `${this.getDataValue('rua')}, ${this.getDataValue('numero')}` + compl,
            bairro: this.getDataValue('bairro')
          }
        }
      },
      setterMethods: {

      }
    });
  Endereco.associate = function (models) {
    // associations can be defined here
    Endereco.belongsTo(models.Aluno, { foreignKey: 'aluno_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };
  return Endereco;
};