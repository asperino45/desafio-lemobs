const Aluno = require('../models').Aluno;
const Endereco = require('../models').Endereco;

async function cadastrarAluno(req, res) {
    return Aluno
        .create({
            nome: req.body.nome,
            data_nascimento: req.body.data_nascimento,
            cpf: despontuarCPF(req.body.cpf),
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
            return res.status(200).send(alunos);
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
                cpf: despontuarCPF(req.body.cpf),
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
                enderecos: [enderecos.rows]
            })
        })
        .catch((error) => res.status(400).send(error));
}

async function listarNotasAlunos(req, res) {
    return Aluno
        .findAll({
            where: {
                nota: {
                    [
                        (req.swagger.params.criterio.value === ">") ? "Op.gte" : "Op.lte"
                    ]: req.swagger.params.nota.value
                }
            }
        })
        .then((alunos) => res.status(200).send(alunos))
        .catch((error) => res.status(400).send(error));
}

async function listarAlunosAcimaMedia(req, res) {
    let sum = Aluno.sum('nota');
    let count = Aluno.count();
    let mean = sum * 1.0 / count
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

async function validarAluno(aluno) {
    aluno.cpf = pontuarCPF(aluno.cpf);
    return aluno;
};

async function pontuarCPF(strCPF) {
    let regex = /(\d{3})(\d{3})(\d{3})(\d{2})/g;
    return strCPF.replace(regex, "$1.$2.$3-$4");
};

async function despontuarCPF(strCPF) {
    return strCPF.replace(/[\.-]/g, "")
};