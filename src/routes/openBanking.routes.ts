import { Router } from 'express';
import { scalarConfig } from '../config/scalar';

const router = Router();

// Mock data for demonstration
const mockStrategicScenarios = [
  {
    id: 1,
    name: 'Internal Development',
    cost: 1000000,
    timeToImplement: 12,
    strategicImportance: 0.8,
    svi: 0.75
  },
  {
    id: 2,
    name: 'Outsourced Solution',
    cost: 800000,
    timeToImplement: 6,
    strategicImportance: 0.7,
    svi: 0.65
  },
  {
    id: 3,
    name: 'Hybrid Approach',
    cost: 900000,
    timeToImplement: 8,
    strategicImportance: 0.85,
    svi: 0.82
  }
];

// OpenAPI spec
router.get('/openapi.json', (req, res) => {
  res.json(scalarConfig);
});

// Get all strategic scenarios
router.get('/scenarios', (req, res) => {
  res.json(mockStrategicScenarios);
});

// Get scenario by ID
router.get('/scenarios/:id', (req, res) => {
  const scenario = mockStrategicScenarios.find(s => s.id === parseInt(req.params.id));
  if (!scenario) {
    return res.status(404).json({ message: 'Scenario not found' });
  }
  res.json(scenario);
});

// Calculate SVI for a new scenario
router.post('/calculate-svi', (req, res) => {
  const { cost, timeToImplement, strategicImportance } = req.body;

  // Mock calculation
  const svi = (strategicImportance * 0.5) +
              ((1 - cost/1000000) * 0.3) +
              ((1 - timeToImplement/12) * 0.2);

  res.json({
    svi: parseFloat(svi.toFixed(2)),
    factors: {
      strategicImportance,
      cost,
      timeToImplement
    }
  });
});

// Get FAHP weights
router.get('/fahp-weights', (req, res) => {
  res.json({
    strategicImportance: 0.5,
    cost: 0.3,
    timeToImplement: 0.2
  });
});

export const openBankingRoutes = router;