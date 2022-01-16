const express = require('express');
const roteador = require('./roteador');
const {verificarSenha, validarSenha} = require('./intermediarios');

const app = express();

app.use(express.json());

app.use(verificarSenha);

app.use(validarSenha);

app.use(roteador);

module.exports = app;