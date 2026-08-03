const express = require('express');
const {
  getAllClients,
  getOneClient,
  createNewClient,
  updateExistingClient,
  removeClient,
  dashboard,
} = require('../controllers/clientController');

const router = express.Router();

router.get('/clientes', getAllClients);
router.get('/clientes/:id', getOneClient);
router.post('/clientes', createNewClient);
router.put('/clientes/:id', updateExistingClient);
router.delete('/clientes/:id', removeClient);
router.get('/dashboard', dashboard);

module.exports = router;
