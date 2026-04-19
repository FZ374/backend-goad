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

const buscarUsuarioById = async (req, res) => {
  const { id_usuario } = req.params;
  const data = await usuarioService.buscarUsuarioById(id_usuario);
  if (!data) return res.status(404).json({ msg: 'Usuario no encontrado' });
  res.json(data);
};

module.exports = { getUsuarios, createUsuario, buscarUsuarioById };