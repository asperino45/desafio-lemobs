const Aluno = require('../models').Aluno;
const Endereco = require('../models').Endereco;
const Op = require('sequelize').Op;

async function cadastrarEndereco(req, res) {
    return Endereco
        .create({
            rua: req.body.rua,
            numero: req.body.numero || "s/n",
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            aluno_id: req.body.aluno_id
        })
        .then((endereco) => res.status(201).send(endereco))
        .catch((error) => res.status(400).send(error));
}

async function listarEnderecos(req, res) {
    return Endereco.findAll(req.swagger.params.bairro.value ? {
        where: {
            bairro: {
                [Op.iLike]: req.swagger.params.bairro.value
            }
        }
    } : {})
        .then((enderecos) => {
            if (!enderecos) {
                return res.status(404).send({
                    message: 'Endereço não encontrado',
                });
            }
            return res.status(200).send(enderecos);
        })
        .catch((error) => res.status(400).send(error));
}

module.exports = {
    cadastrar_endereco: cadastrarEndereco,
    listar_enderecos: listarEnderecos,
}