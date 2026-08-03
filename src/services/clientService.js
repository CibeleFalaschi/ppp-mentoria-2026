const { clients, statusEnum, getNextId, normalizeClient } = require('../models/clientModel');
const { AppError } = require('../utils/AppError');

const validateClientPayload = (payload) => {
  const requiredFields = [
    'nome',
    'email',
    'telefone',
    'endereco.logradouro',
    'endereco.numero',
    'endereco.bairro',
    'endereco.cidade',
    'endereco.estado',
    'endereco.cep',
    'status',
  ];

  const hasMissingField = requiredFields.some((fieldPath) => {
    const value = fieldPath.split('.').reduce((acc, part) => acc?.[part], payload);
    return value === undefined || value === null || value === '';
  });

  if (hasMissingField) {
    throw new AppError(400, 'Os dados informados são inválidos.');
  }

  if (!statusEnum.includes(payload.status)) {
    throw new AppError(400, 'Os dados informados são inválidos.');
  }

  return true;
};

const listClients = (query = {}) => {
  const filters = {
    nome: query.nome?.toLowerCase(),
    email: query.email?.toLowerCase(),
    telefone: query.telefone,
    status: query.status,
  };

  return clients
    .filter((client) => !client.deleted)
    .filter((client) => {
      return (
        (!filters.nome || client.nome.toLowerCase().includes(filters.nome)) &&
        (!filters.email || client.email.toLowerCase().includes(filters.email)) &&
        (!filters.telefone || client.telefone.includes(filters.telefone)) &&
        (!filters.status || client.status.toLowerCase() === filters.status.toLowerCase())
      );
    })
    .map(normalizeClient);
};

const getClientById = (id) => {
  const client = clients.find((item) => item.id === Number(id) && !item.deleted);

  if (!client) {
    throw new AppError(404, 'Cliente não encontrado.');
  }

  return normalizeClient(client);
};

const createClient = (payload) => {
  validateClientPayload(payload);

  const emailExists = clients.some((item) => item.email.toLowerCase() === payload.email.toLowerCase() && !item.deleted);
  if (emailExists) {
    throw new AppError(409, 'Já existe um cliente cadastrado com este e-mail.');
  }

  const client = {
    id: getNextId(),
    nome: payload.nome,
    email: payload.email,
    telefone: payload.telefone,
    empresa: payload.empresa || '',
    endereco: {
      logradouro: payload.endereco.logradouro,
      numero: payload.endereco.numero,
      complemento: payload.endereco.complemento || '',
      bairro: payload.endereco.bairro,
      cidade: payload.endereco.cidade,
      estado: payload.endereco.estado,
      cep: payload.endereco.cep,
    },
    observacoes: payload.observacoes || '',
    status: payload.status,
    deleted: false,
  };

  clients.push(client);

  return {
    message: 'Cliente cadastrado com sucesso.',
    client: normalizeClient(client),
  };
};

const updateClient = (id, payload) => {
  validateClientPayload(payload);

  const client = clients.find((item) => item.id === Number(id));

  if (!client || client.deleted) {
    throw new AppError(404, 'Cliente não encontrado.');
  }

  const emailExists = clients.some(
    (item) => item.id !== Number(id) && item.email.toLowerCase() === payload.email.toLowerCase() && !item.deleted,
  );

  if (emailExists) {
    throw new AppError(409, 'Já existe um cliente cadastrado com este e-mail.');
  }

  Object.assign(client, {
    nome: payload.nome,
    email: payload.email,
    telefone: payload.telefone,
    empresa: payload.empresa || '',
    endereco: {
      logradouro: payload.endereco.logradouro,
      numero: payload.endereco.numero,
      complemento: payload.endereco.complemento || '',
      bairro: payload.endereco.bairro,
      cidade: payload.endereco.cidade,
      estado: payload.endereco.estado,
      cep: payload.endereco.cep,
    },
    observacoes: payload.observacoes || '',
    status: payload.status,
  });

  return {
    message: 'Cliente atualizado com sucesso.',
    client: normalizeClient(client),
  };
};

const deleteClient = (id) => {
  const client = clients.find((item) => item.id === Number(id));

  if (!client || client.deleted) {
    throw new AppError(404, 'Cliente não encontrado.');
  }

  client.deleted = true;

  return {
    message: 'Cliente excluído com sucesso.',
  };
};

const getDashboard = () => {
  const activeClients = clients.filter((client) => !client.deleted);
  const summary = {
    totalClientes: activeClients.length,
    abertos: activeClients.filter((client) => client.status === 'Aberto').length,
    fechados: activeClients.filter((client) => client.status === 'Fechado').length,
    perdidos: activeClients.filter((client) => client.status === 'Perdido').length,
  };

  return summary;
};

module.exports = {
  listClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getDashboard,
};
