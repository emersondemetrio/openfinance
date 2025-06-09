import { Request, Response } from 'express';
import { z } from 'zod';
import { StrategicScenarioModel } from '../models/strategicScenario.model';
import { SviModel } from '../models/svi.model';
import { scalarConfig } from '../config/scalar';

export class OpenBankingController {
  private scenarioModel: StrategicScenarioModel;
  private sviModel: SviModel;

  constructor() {
    this.scenarioModel = new StrategicScenarioModel();
    this.sviModel = new SviModel();
  }

  /**
   * Get OpenAPI specification
   */
  getOpenApiSpec = (req: Request, res: Response): void => {
    try {
      res.json(scalarConfig);
    } catch (error) {
      this.handleError(res, error, 'Failed to get OpenAPI specification');
    }
  };

  /**
   * Get all strategic scenarios
   */
  getAllScenarios = (req: Request, res: Response): void => {
    try {
      const scenarios = this.scenarioModel.getAllScenarios();
      res.json(scenarios);
    } catch (error) {
      this.handleError(res, error, 'Failed to retrieve scenarios');
    }
  };

  /**
   * Get scenario by ID
   */
  getScenarioById = (req: Request, res: Response): void => {
    try {
      const idParam = req.params.id;
      const id = parseInt(idParam);

      // Validate ID parameter
      if (isNaN(id)) {
        res.status(400).json({
          message: 'Invalid scenario ID',
          error: 'ID must be a valid number'
        });
        return;
      }

      const scenario = this.scenarioModel.getScenarioById(id);

      if (!scenario) {
        res.status(404).json({
          message: 'Scenario not found',
          id: id
        });
        return;
      }

      res.json(scenario);
    } catch (error) {
      this.handleError(res, error, 'Failed to retrieve scenario');
    }
  };

  /**
   * Calculate SVI for a new scenario
   */
  calculateSvi = (req: Request, res: Response): void => {
    try {
      // The SviModel will validate the request body using Zod schemas
      const calculationResult = this.sviModel.calculateSvi(req.body);
      res.json(calculationResult);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: 'Invalid request data',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
        return;
      }
      this.handleError(res, error, 'Failed to calculate SVI');
    }
  };

  /**
   * Get FAHP weights
   */
  getFahpWeights = (req: Request, res: Response): void => {
    try {
      const weights = this.sviModel.getFahpWeights();
      res.json(weights);
    } catch (error) {
      this.handleError(res, error, 'Failed to retrieve FAHP weights');
    }
  };

  /**
   * Update FAHP weights (additional endpoint for future use)
   */
  updateFahpWeights = (req: Request, res: Response): void => {
    try {
      const updatedWeights = this.sviModel.updateFahpWeights(req.body);
      res.json({
        message: 'FAHP weights updated successfully',
        weights: updatedWeights
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: 'Invalid weights data',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
        return;
      }
      this.handleError(res, error, 'Failed to update FAHP weights');
    }
  };

  /**
   * Calculate SVI for multiple scenarios (batch endpoint for future use)
   */
  calculateMultipleSvi = (req: Request, res: Response): void => {
    try {
      const { scenarios } = req.body;

      if (!Array.isArray(scenarios)) {
        res.status(400).json({
          message: 'Invalid request format',
          error: 'scenarios must be an array'
        });
        return;
      }

      const results = this.sviModel.calculateMultipleSvi(scenarios);
      res.json({
        message: 'Batch SVI calculation completed',
        results: results
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: 'Invalid scenario data',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
        return;
      }
      this.handleError(res, error, 'Failed to calculate multiple SVI');
    }
  };

  /**
   * Generic error handler
   */
  private handleError(res: Response, error: unknown, message: string): void {
    console.error(`${message}:`, error);

    res.status(500).json({
      message,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}