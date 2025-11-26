const express = require('express');
const { registerReseller, loginReseller } = require('../../controller/Reseller/ResellerController');

const resellerRouter = express.Router();

resellerRouter
.post('/register', registerReseller)
.post('/login', loginReseller);

module.exports = resellerRouter;
