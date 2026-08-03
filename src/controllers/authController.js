const { login } = require('../services/authService');

const loginController = (req, res, next) => {
  try {
    const result = login(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = { loginController };
