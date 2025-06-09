import express from 'express';
import { openBankingCoreRoutes } from './routes/openBankingCore.routes';
import { strategicDecisionRoutes } from './routes/strategicDecision.routes';

const app = express();

app.use(express.json());

// Open Banking Core Routes
app.use('/api/v1/open-banking', openBankingCoreRoutes);

// Strategic Decision Routes
app.use('/api/open-banking', strategicDecisionRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;