import { z } from 'zod';
import {
  SviCalculationRequestSchema,
  SviCalculationResponseSchema,
  FahpWeightsSchema,
  FactorSchema
} from '../schemas/strategicDecision.schema';

// Type inference from Zod schemas
export type SviCalculationRequest = z.infer<typeof SviCalculationRequestSchema>;
export type SviCalculationResponse = z.infer<typeof SviCalculationResponseSchema>;
export type FahpWeights = z.infer<typeof FahpWeightsSchema>;
export type Factor = z.infer<typeof FactorSchema>;

export class SviModel {
  private fahpWeights: FahpWeights;

  constructor() {
    // Default FAHP weights - validated against schema
    this.fahpWeights = FahpWeightsSchema.parse({
      strategicImportance: 0.5,
      cost: 0.3,
      timeToImplement: 0.2
    });
  }

  /**
   * Get current FAHP weights
   */
  getFahpWeights(): FahpWeights {
    return FahpWeightsSchema.parse(this.fahpWeights);
  }

  /**
   * Update FAHP weights
   */
  updateFahpWeights(newWeights: FahpWeights): FahpWeights {
    this.fahpWeights = FahpWeightsSchema.parse(newWeights);
    return this.fahpWeights;
  }

  /**
   * Calculate SVI based on input factors
   */
  calculateSvi(request: SviCalculationRequest): SviCalculationResponse {
    // Validate input
    const validatedRequest = SviCalculationRequestSchema.parse(request);
    const { cost, timeToImplement, strategicImportance } = validatedRequest;

    // Normalize factors to 0-1 scale
    const normalizedCost = this.normalizeCost(cost);
    const normalizedTime = this.normalizeTime(timeToImplement);

    // Create factor objects with weights and values
    const strategicImportanceFactor: Factor = {
      weight: this.fahpWeights.strategicImportance,
      value: strategicImportance
    };

    const costFactor: Factor = {
      weight: this.fahpWeights.cost,
      value: normalizedCost
    };

    const timeToImplementFactor: Factor = {
      weight: this.fahpWeights.timeToImplement,
      value: normalizedTime
    };

    // Calculate weighted SVI
    const svi = (strategicImportanceFactor.weight * strategicImportanceFactor.value) +
                (costFactor.weight * costFactor.value) +
                (timeToImplementFactor.weight * timeToImplementFactor.value);

    // Prepare response
    const response: SviCalculationResponse = {
      svi: parseFloat(Math.max(0, Math.min(1, svi)).toFixed(3)), // Ensure 0-1 range
      factors: {
        strategicImportance: strategicImportanceFactor,
        cost: costFactor,
        timeToImplement: timeToImplementFactor
      }
    };

    // Validate and return response
    return SviCalculationResponseSchema.parse(response);
  }

  /**
   * Normalize cost (higher cost = lower value)
   * Assumes max cost around 2M for normalization
   */
  private normalizeCost(cost: number): number {
    const maxCost = 2000000;
    return Math.max(0, Math.min(1, 1 - (cost / maxCost)));
  }

  /**
   * Normalize time to implement (higher time = lower value)
   * Assumes max time around 24 months for normalization
   */
  private normalizeTime(timeToImplement: number): number {
    const maxTime = 24;
    return Math.max(0, Math.min(1, 1 - (timeToImplement / maxTime)));
  }

  /**
   * Calculate SVI for multiple scenarios (batch processing)
   */
  calculateMultipleSvi(requests: SviCalculationRequest[]): SviCalculationResponse[] {
    return requests.map(request => this.calculateSvi(request));
  }
}