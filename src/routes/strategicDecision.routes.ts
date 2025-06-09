import { Router } from 'express';
import { validate } from '../middleware/validate';
import {
  SviCalculationRequestSchema,
  SviCalculationResponseSchema,
  FahpWeightsSchema,
  ScenarioSchema,
  ScenarioResponseSchema
} from '../schemas/strategicDecision.schema';

const router = Router();

// Mock data for strategic scenarios
const scenarios = [
  {
    id: 1,
    name: 'Internal Development',
    cost: 2500000,
    timeToImplement: 18,
    strategicImportance: 0.85,
    svi: 0.78,
    description: 'Full in-house development of Open Banking platform',
    risks: ['High initial cost', 'Longer time to market'],
    benefits: ['Full control', 'Customization', 'IP ownership']
  },
  {
    id: 2,
    name: 'Outsourced Solution',
    cost: 1500000,
    timeToImplement: 8,
    strategicImportance: 0.65,
    svi: 0.72,
    description: 'Implementation using third-party Open Banking platform',
    risks: ['Vendor lock-in', 'Less customization'],
    benefits: ['Faster time to market', 'Lower initial cost']
  },
  {
    id: 3,
    name: 'Hybrid Approach',
    cost: 2000000,
    timeToImplement: 12,
    strategicImportance: 0.75,
    svi: 0.80,
    description: 'Combination of internal development and third-party solutions',
    risks: ['Integration complexity', 'Medium cost'],
    benefits: ['Balanced approach', 'Flexibility', 'Moderate time to market']
  }
];

// Get all strategic scenarios
router.get('/scenarios', (req, res) => {
  const response = { scenarios };
  const validatedResponse = ScenarioResponseSchema.parse(response);
  res.json(validatedResponse);
});

// Get scenario by ID
router.get('/scenarios/:id', (req, res) => {
  const scenario = scenarios.find(s => s.id === parseInt(req.params.id));
  if (!scenario) {
    return res.status(404).json({ error: 'Scenario not found' });
  }
  const validatedScenario = ScenarioSchema.parse(scenario);
  res.json(validatedScenario);
});

// Calculate Strategic Value Index (SVI)
router.post('/calculate-svi',
  validate(SviCalculationRequestSchema),
  (req, res) => {
    const { cost, timeToImplement, strategicImportance } = req.body;

    // Mock FAHP weights (in a real implementation, these would be calculated)
    const weights = {
      strategicImportance: 0.5,
      cost: 0.3,
      timeToImplement: 0.2
    };

    // Normalize inputs
    const normalizedCost = 1 - (cost / 5000000); // Assuming max cost of 5M
    const normalizedTime = 1 - (timeToImplement / 24); // Assuming max time of 24 months

    // Calculate SVI using weighted sum
    const svi = (
      weights.strategicImportance * strategicImportance +
      weights.cost * normalizedCost +
      weights.timeToImplement * normalizedTime
    );

    const response = {
      svi: parseFloat(svi.toFixed(2)),
      factors: {
        strategicImportance: {
          weight: weights.strategicImportance,
          value: strategicImportance
        },
        cost: {
          weight: weights.cost,
          value: normalizedCost
        },
        timeToImplement: {
          weight: weights.timeToImplement,
          value: normalizedTime
        }
      }
    };

    // Validate response
    const validatedResponse = SviCalculationResponseSchema.parse(response);
    res.json(validatedResponse);
  });

// Get FAHP weights
router.get('/fahp-weights', (req, res) => {
  // Mock FAHP weights (in a real implementation, these would be calculated)
  const weights = {
    strategicImportance: 0.5,
    cost: 0.3,
    timeToImplement: 0.2
  };

  // Validate weights
  const validatedWeights = FahpWeightsSchema.parse(weights);
  res.json(validatedWeights);
});

export const strategicDecisionRoutes = router;