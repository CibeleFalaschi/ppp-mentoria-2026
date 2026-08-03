const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../resources/swagger.json');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const userRoutes = require('./routes/userRoutes');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandler');
const { AppError } = require('./utils/AppError');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(authRoutes);
app.use(authMiddleware);
app.use(userRoutes);
app.use(clientRoutes);

app.use((req, res, next) => {
  next(new AppError(404, 'Rota não encontrada.'));
});

app.use(errorHandler);

module.exports = app;
