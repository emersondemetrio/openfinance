import { z } from 'zod';
import { ScenarioSchema, ScenarioResponseSchema } from '../schemas/strategicDecision.schema';

// Type inference from Zod schemas
export type Scenario = z.infer<typeof ScenarioSchema>;
export type ScenarioResponse = z.infer<typeof ScenarioResponseSchema>;

// Mock data for demonstration - now properly typed and validated
const mockStrategicScenarios: Scenario[] = [
  {
    id: 1,
    name: 'Internal Development',
    cost: 1000000,
    timeToImplement: 12,
    strategicImportance: 0.8,
    svi: 0.75,
    description: 'Build open banking solution internally with dedicated team',
    risks: ['High development complexity', 'Resource allocation challenges', 'Regulatory compliance burden'],
    benefits: ['Full control over features', 'Deep domain knowledge', 'Long-term strategic value']
  },
  {
    id: 2,
    name: 'Outsourced Solution',
    cost: 800000,
    timeToImplement: 6,
    strategicImportance: 0.7,
    svi: 0.65,
    description: 'Partner with third-party provider for open banking implementation',
    risks: ['Vendor dependency', 'Limited customization', 'Integration challenges'],
    benefits: ['Faster time to market', 'Lower initial cost', 'Proven solution']
  },
  {
    id: 3,
    name: 'Hybrid Approach',
    cost: 900000,
    timeToImplement: 8,
    strategicImportance: 0.85,
    svi: 0.82,
    description: 'Combine internal development with strategic partnerships',
    risks: ['Coordination complexity', 'Mixed technology stack', 'Higher management overhead'],
    benefits: ['Balanced risk profile', 'Flexibility in implementation', 'Strategic partnerships']
  }
];

export class StrategicScenarioModel {
  private scenarios: Scenario[];

  constructor() {
    // Validate mock data against schema
    this.scenarios = mockStrategicScenarios.map(scenario =>
      ScenarioSchema.parse(scenario)
    );
  }

  /**
   * Get all strategic scenarios
   */
  getAllScenarios(): ScenarioResponse {
    const response = { scenarios: this.scenarios };
    return ScenarioResponseSchema.parse(response);
  }

  /**
   * Get scenario by ID
   */
  getScenarioById(id: number): Scenario | null {
    const scenario = this.scenarios.find(s => s.id === id);
    return scenario ? ScenarioSchema.parse(scenario) : null;
  }

  /**
   * Add a new scenario (for future use)
   */
  addScenario(scenarioData: Omit<Scenario, 'id'>): Scenario {
    const newId = Math.max(...this.scenarios.map(s => s.id)) + 1;
    const newScenario = { ...scenarioData, id: newId };

    // Validate the new scenario
    const validatedScenario = ScenarioSchema.parse(newScenario);
    this.scenarios.push(validatedScenario);

    return validatedScenario;
  }

  /**
   * Update existing scenario (for future use)
   */
  updateScenario(id: number, updates: Partial<Omit<Scenario, 'id'>>): Scenario | null {
    const scenarioIndex = this.scenarios.findIndex(s => s.id === id);
    if (scenarioIndex === -1) return null;

    const updatedScenario = { ...this.scenarios[scenarioIndex], ...updates };

    // Validate the updated scenario
    const validatedScenario = ScenarioSchema.parse(updatedScenario);
    this.scenarios[scenarioIndex] = validatedScenario;

    return validatedScenario;
  }
}