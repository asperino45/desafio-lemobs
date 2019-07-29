'use strict';
module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
    nome: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isCPF }
    },
    nota: DataTypes.FLOAT
  }, {});
  Aluno.associate = function (models) {
    // associations can be defined here
  };
  return Aluno;
};


function isCPF(strCPF) {
  let Soma;
  let Resto;
  Soma = 0;
  if (strCPF == "00000000000") throw new Error("Não é CPF:" + strCPF);

  for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) throw new Error("Não é CPF:" + strCPF);

  Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) throw new Error("Não é CPF:" + strCPF);
};