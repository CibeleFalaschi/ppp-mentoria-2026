const jwt = require('jsonwebtoken');
const { users } = require('../models/userModel');
const { AppError } = require('../utils/AppError');

const login = ({ username, password }) => {
  const user = users.find((item) => item.username === username && item.password === password && !item.deleted);

  if (!user) {
    throw new AppError(401, 'Usuário não autenticado ou token inválido.');
  }

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'secret-key', {
    expiresIn: '1h',
  });

  return {
    message: 'Operação realizada com sucesso.',
    token,
  };
};

module.exports = { login };
