const { listUsers, getUserById, createUser, updateUser, deleteUser } = require('../services/userService');

const getAllUsers = (req, res, next) => {
  try {
    const result = listUsers();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const getOneUser = (req, res, next) => {
  try {
    const result = getUserById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const createNewUser = (req, res, next) => {
  try {
    const result = createUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

const updateExistingUser = (req, res, next) => {
  try {
    const result = updateUser(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const removeUser = (req, res, next) => {
  try {
    const result = deleteUser(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateExistingUser,
  removeUser,
};
