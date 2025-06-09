import express from 'express';
import { openBankingCoreRoutes } from './routes/openBankingCore.routes';

const app = express();

app.use(express.json());

// Open Banking Core Routes
app.use('/api/v1/open-banking', openBankingCoreRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;