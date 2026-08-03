const { users, getNextUserId, normalizeUser } = require('../models/userModel');
const { AppError } = require('../utils/AppError');

const validateUserPayload = (payload) => {
  const requiredFields = ['username', 'password', 'role', 'status'];

  const hasMissingField = requiredFields.some((field) => {
    return payload[field] === undefined || payload[field] === null || payload[field] === '';
  });

  if (hasMissingField) {
    throw new AppError(400, 'Os dados informados são inválidos.');
  }

  const validRoles = ['admin', 'vendedor'];
  const validStatuses = ['ativo', 'inativo'];

  if (!validRoles.includes(payload.role)) {
    throw new AppError(400, 'Os dados informados são inválidos.');
  }

  if (!validStatuses.includes(payload.status)) {
    throw new AppError(400, 'Os dados informados são inválidos.');
  }

  return true;
};

const listUsers = () => {
  return users.filter((user) => !user.deleted).map(normalizeUser);
};

const getUserById = (id) => {
  const user = users.find((item) => item.id === Number(id) && !item.deleted);

  if (!user) {
    throw new AppError(404, 'Usuário não encontrado.');
  }

  return normalizeUser(user);
};

const createUser = (payload) => {
  validateUserPayload(payload);

  const usernameExists = users.some((user) => user.username.toLowerCase() === payload.username.toLowerCase() && !user.deleted);
  if (usernameExists) {
    throw new AppError(409, 'Já existe um usuário cadastrado com este nome de usuário.');
  }

  const user = {
    id: getNextUserId(),
    username: payload.username,
    password: payload.password,
    role: payload.role,
    status: payload.status,
    deleted: false,
  };

  users.push(user);

  return {
    message: 'Usuário cadastrado com sucesso.',
    user: normalizeUser(user),
  };
};

const updateUser = (id, payload) => {
  validateUserPayload(payload);

  const user = users.find((item) => item.id === Number(id));
  if (!user || user.deleted) {
    throw new AppError(404, 'Usuário não encontrado.');
  }

  const usernameExists = users.some(
    (item) => item.id !== Number(id) && item.username.toLowerCase() === payload.username.toLowerCase() && !item.deleted,
  );

  if (usernameExists) {
    throw new AppError(409, 'Já existe um usuário cadastrado com este nome de usuário.');
  }

  Object.assign(user, payload);

  return {
    message: 'Usuário atualizado com sucesso.',
    user: normalizeUser(user),
  };
};

const deleteUser = (id) => {
  const user = users.find((item) => item.id === Number(id));

  if (!user || user.deleted) {
    throw new AppError(404, 'Usuário não encontrado.');
  }

  user.deleted = true;

  return {
    message: 'Usuário removido com sucesso.',
  };
};

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
