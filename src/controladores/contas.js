const database = require('../bancodedados');

function listarContas (req, res) {
    res.json(database.contas);
}

let numero = 1, saldo = 0;

function validarConta (conta) {
    if (!conta.nome){
        return "O campo 'nome' é obrigatório!";
    }

    if (!conta.cpf) {
        return "O campo 'cpf' é obrigatório!";
    } 

    if (!conta.dataDeNascimento) {
        return "O campo 'data de nascimento' é obrigatório!";
    }

    if (!conta.telefone) {
        return "O campo 'telefone' é obrigatório!";
    }

    if (!conta.email) {
        return "O campo 'email' é obrigatório!";
    }

    if (!conta.senha) {
        return "O campo 'senha' é obrigatório!";
    }
}

function criarConta (req, res) {
    const erro = validarConta(req.body);

    if (erro) {
        res.status(400);
        res.json({erro});
        return;
    }

    const cpfEncontrado = database.contas.find(conta => {
        return conta.usuario.cpf === req.body.cpf
    })

    if (cpfEncontrado) {
        res.status(400);
        res.json ({erro: "CPF já cadastrado!"});
        return;
    } 

    const emailEncontrado = database.contas.find(conta => {
        return conta.usuario.email === req.body.email
    })

    if (emailEncontrado) {
        res.status(400);
        res.json ({erro: "Email já cadastrado!"});
        return;
    } 

    const novaConta = {
        numero,
        saldo,
        usuario: {
            nome: req.body.nome,
            cpf: req.body.cpf,
            dataDeNascimento: req.body.dataDeNascimento,
            telefone: req.body.telefone,
            email: req.body.email,
            senha: req.body.senha,
        }    
    };

    database.contas.push(novaConta);
    numero++;

    res.json(novaConta);
}

function atualizarUsuarioConta (req, res) {
    const {nome, cpf, dataDeNascimento, telefone, email, senha} = req.body;

    if (!nome && !cpf && !dataDeNascimento && !telefone && !email && !senha){
        res.status(400);
        res.json({erro: "Preencha pelo menos um campo!"});
        return;
    }

    const conta = database.contas.find(
        (conta) => conta.numero === Number(req.params.numeroConta)
    );
    
    if (!conta) {
        res.status(404);
        res.json({erro: `A conta de número ${req.params.numeroConta} não existe!`});
        return;
    }

    const erro = validarConta ({
        nome: req.body.nome ?? conta.usuario.nome,
        cpf: req.body.cpf ?? conta.usuario.cpf,
        dataDeNascimento: req.body.dataDeNascimento ?? conta.usuario.dataDeNascimento,
        telefone: req.body.telefone ?? conta.usuario.telefone,
        email: req.body.email ?? conta.usuario.email,
        senha: req.body.senha ?? conta.usuario.senha,
    });

    if (erro) {
        res.status(400);
        res.json({erro});
        return;
    }

    if (req.body.nome){
        conta.usuario.nome = req.body.nome;
    }
    
    if (req.body.cpf){
        const contaEncontrada = database.contas.find(conta => {
            return conta.usuario.cpf === req.body.cpf
        })
    
        if (contaEncontrada) {
            res.status(400);
            res.json ({erro: "CPF já cadastrado!"});
            return;
        } 
        conta.usuario.cpf = req.body.cpf;
    }

    if (req.body.dataDeNascimento){
        conta.usuario.dataDeNascimento = req.body.dataDeNascimento;
    }

    if (req.body.telefone){
        conta.usuario.telefone = req.body.telefone;
    }

    if (req.body.email){
        const contaEncontrada = database.contas.find(conta => {
            return conta.usuario.email === req.body.email
        })
    
        if (contaEncontrada) {
            res.status(400);
            res.json ({erro: "Email já cadastrado!"});
            return;
        } 
        conta.usuario.email = req.body.email;
    }

    if (req.body.senha){
        conta.usuario.senha = req.body.senha;
    }

    res.json("Conta atualizada com sucesso!");
}

function excluirConta (req, res) {
    const conta = database.contas.find(
        conta => conta.numero === Number(req.params.numeroConta)
    );

    if (!conta) {
        res.status(404);
        res.json({erro: `A conta de número ${req.params.numeroConta} não existe!`});
        return;
    }
    
    if (saldo > 0) {
        res.status(400);
        res.json({erro: "Não é possível excluir essa conta."});
        return;
    }

    const indice = database.contas.indexOf(conta);
    
    database.contas.splice(indice, 1);
    
    res.json("Conta excluída com sucesso!");
}

module.exports = {
    listarContas, 
    criarConta, 
    atualizarUsuarioConta,
    excluirConta,
}