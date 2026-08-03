const clients = [];
const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
  },
];

let sequence = 0;

const statusEnum = ['Aberto', 'Fechado', 'Perdido'];

const getNextId = () => {
  sequence += 1;
  return sequence;
};

const normalizeClient = (client) => ({
  id: client.id,
  nome: client.nome,
  email: client.email,
  telefone: client.telefone,
  empresa: client.empresa || '',
  endereco: {
    logradouro: client.endereco.logradouro,
    numero: client.endereco.numero,
    complemento: client.endereco.complemento || '',
    bairro: client.endereco.bairro,
    cidade: client.endereco.cidade,
    estado: client.endereco.estado,
    cep: client.endereco.cep,
  },
  observacoes: client.observacoes || '',
  status: client.status,
  deleted: Boolean(client.deleted),
});

module.exports = {
  clients,
  users,
  statusEnum,
  getNextId,
  normalizeClient,
};
