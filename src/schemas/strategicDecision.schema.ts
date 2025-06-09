import { z } from 'zod';

// Base schemas for common fields
export const RiskSchema = z.string();
export const BenefitSchema = z.string();

// Scenario schemas
export const ScenarioSchema = z.object({
  id: z.number(),
  name: z.string(),
  cost: z.number().positive(),
  timeToImplement: z.number().positive(),
  strategicImportance: z.number().min(0).max(1),
  svi: z.number().min(0).max(1),
  description: z.string(),
  risks: z.array(RiskSchema),
  benefits: z.array(BenefitSchema)
});

export const ScenarioResponseSchema = z.object({
  scenarios: z.array(ScenarioSchema)
});

// SVI Calculation schemas
export const SviCalculationRequestSchema = z.object({
  cost: z.number().positive(),
  timeToImplement: z.number().positive(),
  strategicImportance: z.number().min(0).max(1)
});

export const FactorSchema = z.object({
  weight: z.number().min(0).max(1),
  value: z.number().min(0).max(1)
});

export const SviCalculationResponseSchema = z.object({
  svi: z.number().min(0).max(1),
  factors: z.object({
    strategicImportance: FactorSchema,
    cost: FactorSchema,
    timeToImplement: FactorSchema
  })
});

// FAHP Weights schema
export const FahpWeightsSchema = z.object({
  strategicImportance: z.number().min(0).max(1),
  cost: z.number().min(0).max(1),
  timeToImplement: z.number().min(0).max(1)
}).refine(
  (data) => {
    const sum = Object.values(data).reduce((a, b) => a + b, 0);
    return Math.abs(sum - 1) < 0.0001; // Allow for small floating-point errors
  },
  {
    message: "Weights must sum to 1"
  }
);