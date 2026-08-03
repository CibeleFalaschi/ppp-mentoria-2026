const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/AppError');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError(401, 'Usuário não autenticado ou token inválido.'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret-key');
    req.user = payload;
    return next();
  } catch (error) {
    return next(new AppError(401, 'Usuário não autenticado ou token inválido.'));
  }
};

module.exports = { authMiddleware };
