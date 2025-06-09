import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { openBankingRoutes } from './routes/openBanking.routes';
import { apiReference } from "@scalar/express-api-reference";
import { scalarConfig } from './config/scalar';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/open-banking', openBankingRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Scalar API Reference
const scalar = apiReference({
  metaData: {
    title: "Open Banking Strategic Decision API",
    description: "API for Open Banking strategic decision making using FAHP and Multi-Objective Optimization"
  },
  sources: [
    {
      spec: scalarConfig,
      url: '/api/open-banking/openapi.json'
    }
  ],
});

app.use("/scalar", scalar);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API Documentation available at http://localhost:${port}/scalar`);
});