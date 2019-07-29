const Aluno = require('../models').Aluno;
const Endereco = require('../models').Endereco;

async function cadastrarEndereco(req, res) {
    return Endereco
        .create({
            rua: req.body.rua,
            numero: req.body.numero || "s/n",
            complemento: req.body.complemento,
            bairro: req.body.bairro
        })
        .then((endereco) => res.status(201).send(endereco))
        .catch((error) => res.status(400).send(error));
}

async function listarEnderecos(req, res) {
    return Endereco.findAll()
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