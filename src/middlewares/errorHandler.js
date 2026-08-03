const { AppError } = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
    });
  }

  console.error(err);

  return res.status(500).json({
    message: 'Ocorreu um erro interno no servidor.',
    statusCode: 500,
  });
};

module.exports = { errorHandler };
