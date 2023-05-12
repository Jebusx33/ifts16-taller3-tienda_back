'use strict'
var express = require('express');
//const { registro_cliente } = require('../controllers/clienteController');
var clienteController = require('../controllers/ClienteController')

var api = express.Router();

api.post('/registro_cliente', clienteController.registro_cliente);
api.post('/login_cliente', clienteController.login_cliente);

module.exports = api;