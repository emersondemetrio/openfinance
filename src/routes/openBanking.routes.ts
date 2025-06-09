import { Router } from 'express';
import { OpenBankingController } from '../controllers/openBanking.controller';

const router = Router();
const openBankingController = new OpenBankingController();

// OpenAPI spec
router.get('/openapi.json', openBankingController.getOpenApiSpec);

// Get all strategic scenarios
router.get('/scenarios', openBankingController.getAllScenarios);

// Get scenario by ID
router.get('/scenarios/:id', openBankingController.getScenarioById);

// Calculate SVI for a new scenario
router.post('/calculate-svi', openBankingController.calculateSvi);

// Get FAHP weights
router.get('/fahp-weights', openBankingController.getFahpWeights);

// Update FAHP weights (new endpoint)
router.put('/fahp-weights', openBankingController.updateFahpWeights);

// Calculate SVI for multiple scenarios (new batch endpoint)
router.post('/calculate-svi/batch', openBankingController.calculateMultipleSvi);

export const openBankingRoutes = router;