const express = require('express');

const { listarContas, criarConta, atualizarUsuarioConta, excluirConta} = require('./controladores/contas');

const roteador = express();

roteador.get('/contas', listarContas);

roteador.post('/contas', criarConta);

roteador.put('/contas/:numeroConta/usuario', atualizarUsuarioConta);

roteador.delete('/contas/:numeroConta', excluirConta);

module.exports = roteador;