const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    status: 'ativo',
    deleted: false,
  },
];

let userSequence = 1;

const getNextUserId = () => {
  userSequence += 1;
  return userSequence;
};

const normalizeUser = (user) => ({
  id: user.id,
  username: user.username,
  role: user.role,
  status: user.status,
  deleted: Boolean(user.deleted),
});

module.exports = {
  users,
  getNextUserId,
  normalizeUser,
};
