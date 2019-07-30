'use strict';
module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
    nome: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isCPF },
      get() {
        const regex = /(\d{3})(\d{3})(\d{3})(\d{2})/g;
        return this.getDataValue('cpf').replace(regex, "$1.$2.$3-$4");
      },
      set(cpf) {
        return this.setDataValue('cpf', cpf.replace(/[\.-]/g, ""))
      }
    },
    nota: DataTypes.FLOAT
  }, {
      // getterMethods: {
      //   pontuar_cpf() {
      //     const regex = /(\d{3})(\d{3})(\d{3})(\d{2})/g;
      //     return this.getDataValue('cpf').replace(regex, "$1.$2.$3-$4");
      //   },
      //   aluno_formatado() {
      //     return {
      //       nome: this.getDataValue('nome'),
      //       data_nascimento: this.getDataValue('data_nascimento'),
      //       cpf: this.getDataValue('cpf'),
      //       nota: this.getDataValue('nota'),
      //     }
      //   }
      // },
      // setterMethods: {
      //   despontuar_cpf(cpf) {
      //     return this.setDataValue('cpf', cpf.replace(/[\.-]/g, ""))
      //   }
      // }
    });
  Aluno.associate = function (models) {
    // associations can be defined here
  };
  return Aluno;
};

// function isCPF(strCPF) {
//   let Soma;
//   let Resto;
//   Soma = 0;
//   if (strCPF == "00000000000") throw new Error("Não é CPF:" + strCPF);

//   for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
//   Resto = (Soma * 10) % 11;

//   if ((Resto == 10) || (Resto == 11)) Resto = 0;
//   if (Resto != parseInt(strCPF.substring(9, 10))) throw new Error("Não é CPF:" + strCPF);

//   Soma = 0;
//   for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
//   Resto = (Soma * 10) % 11;

//   if ((Resto == 10) || (Resto == 11)) Resto = 0;
//   if (Resto != parseInt(strCPF.substring(10, 11))) throw new Error("Não é CPF:" + strCPF);
// };

function isCPF(cpf) {
  let numeros, digitos, soma, i, resultado, digitos_iguais;
  digitos_iguais = 1;
  if (cpf.length < 11)
    throw new Error("Não é CPF:" + cpf);
  for (i = 0; i < cpf.length - 1; i++)
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      digitos_iguais = 0;
      break;
    }
  if (!digitos_iguais) {
    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;
    for (i = 10; i > 1; i--)
      soma += numeros.charAt(10 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
      throw new Error("Não é CPF:" + cpf);
    numeros = cpf.substring(0, 10);
    soma = 0;
    for (i = 11; i > 1; i--)
      soma += numeros.charAt(11 - i) * i;
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
      throw new Error("Não é CPF:" + cpf);
    return true;
  }
  else
    throw new Error("Não é CPF:" + cpf);
}