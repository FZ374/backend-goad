const { findUserByEmail } = require('../services/auth.service');
const { comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

const login = async (req, res) => {
  const { email, passw } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ msg: 'No existe' });

  const valid = await comparePassword(passw, user.passw);
  if (!valid) return res.status(401).json({ msg: 'Credenciales inválidas' });

  const token = generateToken(user);

  res.json({ token, user });
};

module.exports = { login };