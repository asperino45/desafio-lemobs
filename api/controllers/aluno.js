const Aluno = require('../models').Aluno;
const Endereco = require('../models').Endereco;
const Op = require('sequelize').Op;

async function cadastrarAluno(req, res) {
    return Aluno
        .create({
            nome: req.body.nome,
            data_nascimento: req.body.data_nascimento,
            cpf: req.body.cpf,
            nota: req.body.nota
        })
        .then((aluno) => res.status(201).send(aluno))
        .catch((error) => res.status(400).send(error));

}

async function listarAlunos(req, res) {
    return Aluno.findAll()
        .then((alunos) => {
            if (!alunos) {
                return res.status(404).send({
                    message: 'Nenhum aluno encontrado',
                });
            }
            return res.status(200).send(alunos
                .map((aluno) => {
                    return {
                        nome: aluno.nome,
                        data_nascimento: aluno.data_nascimento,
                        cpf: aluno.pontuar_cpf,
                        nota: aluno.nota
                    }
                }
                ));
        })
        .catch((error) => res.status(400).send(error))
}

async function listarAluno(req, res) {
    return Aluno
        .findByPk(req.swagger.params.aluno_id.value)
        .then((aluno) => {
            if (!aluno) {
                return res.status(404).send({
                    message: 'Aluno não encontrado',
                });
            };
            return res.status(200).send(aluno);
        })
        .catch((error) => res.status(400).send(error));
}

async function atualizarAluno(req, res) {
    return Aluno
        .findByPk(req.swagger.params.aluno_id.value)
        .then((aluno) => {
            if (!aluno) {
                return res.status(404).send({
                    message: 'Aluno não encontrado',
                });
            }
            return aluno.update({
                nome: req.body.nome,
                data_nascimento: req.body.data_nascimento,
                cpf: req.body.cpf,
                nota: req.body.nota
            })
                .then(res.status(200).send(aluno))
                .catch((error) => res.status(400).send(error))
        })
        .catch((error) => res.status(400).send(error));
}

async function listarEnderecosAluno(req, res) {
    return Endereco
        .findAndCountAll({
            where: { aluno_id: req.swagger.params.aluno_id.value }
        })
        .then((enderecos) => {
            return res.status(200).send({
                total: enderecos.count,
                enderecos: enderecos.rows.map((endr) => endr.endereco_formatado)
            })
        })
        .catch((error) => res.status(400).send(error));
}

async function listarNotasAlunos(req, res) {
    const op = (req.swagger.params.criterio.value === '>') ? Op.gte : Op.lte;
    return Aluno
        .findAll({
            where: {
                nota: { [op]: req.swagger.params.nota.value }
            }
        })
        .then((alunos) => res.status(200).send(alunos))
        .catch((error) => res.status(400).send(error));
}

async function listarAlunosAcimaMedia(req, res) {
    const sum = await Aluno.sum('nota');
    const count = await Aluno.count();
    const mean = sum * 1.0 / count
    return Aluno.findAll({
        where: {
            nota: {
                [Op.gte]: mean
            }
        }
    })
        .then((alunos) => res.status(200).send(alunos))
        .catch((error) => res.status(400).send(error));
};

module.exports = {
    cadastrar_aluno: cadastrarAluno,
    listar_alunos: listarAlunos,
    listar_aluno: listarAluno,
    atualizar_aluno: atualizarAluno,
    listar_enderecos_aluno: listarEnderecosAluno,
    listar_notas_alunos: listarNotasAlunos,
    listar_alunos_acima_media: listarAlunosAcimaMedia,
}
