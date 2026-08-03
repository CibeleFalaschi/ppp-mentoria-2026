const {
  listClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getDashboard,
} = require('../services/clientService');

const getAllClients = (req, res, next) => {
  try {
    const result = listClients(req.query);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const getOneClient = (req, res, next) => {
  try {
    const result = getClientById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const createNewClient = (req, res, next) => {
  try {
    const result = createClient(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
};

const updateExistingClient = (req, res, next) => {
  try {
    const result = updateClient(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const removeClient = (req, res, next) => {
  try {
    const result = deleteClient(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const dashboard = (req, res, next) => {
  try {
    const result = getDashboard();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllClients,
  getOneClient,
  createNewClient,
  updateExistingClient,
  removeClient,
  dashboard,
};
