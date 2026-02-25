const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const diagnosisRoutes = require('./routes/diagnosisRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',');
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api', dataRoutes);
app.use('/api/diagnoses', diagnosisRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
