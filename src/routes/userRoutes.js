const express = require('express');
const { getAllUsers, getOneUser, createNewUser, updateExistingUser, removeUser } = require('../controllers/userController');
const { AppError } = require('../utils/AppError');

const router = express.Router();

const ensureAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return next(new AppError(403, 'Você não possui permissão para acessar este recurso.'));
  }

  return next();
};

router.get('/usuarios', ensureAdmin, getAllUsers);
router.get('/usuarios/:id', ensureAdmin, getOneUser);
router.post('/usuarios', ensureAdmin, createNewUser);
router.put('/usuarios/:id', ensureAdmin, updateExistingUser);
router.delete('/usuarios/:id', ensureAdmin, removeUser);

module.exports = router;
