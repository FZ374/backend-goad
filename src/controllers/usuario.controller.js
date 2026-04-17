const usuarioService = require('../services/usuario.service');
const { hashPassword } = require('../utils/hash');

const getUsuarios = async (req, res) => {
  const data = await usuarioService.getUsuarios();
  res.json(data);
};

const createUsuario = async (req, res) => {
  const body = req.body;

  body.passw = await hashPassword(body.passw);

  const user = await usuarioService.createUsuario(body);
  res.json(user);
};

module.exports = { getUsuarios, createUsuario };