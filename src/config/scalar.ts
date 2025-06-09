export const scalarConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Open Banking Strategic Decision API',
    version: '1.0.0',
    description: `API for Open Banking strategic decision making using a Hybrid Hierarchical Multi-Criteria Decision Analysis (Hi-MCDA) model.

This API implements a sophisticated decision-support tool that helps bank decision-makers select optimal digital strategies for Open Banking through:

- Fuzzy Analytical Hierarchy Process (FAHP) for handling uncertainty in decision-making
- Evidential Reasoning (ER) for aggregating multiple decision-makers' judgments
- Multi-Objective Optimization (MOO) for prioritizing actions
- Strategic Value Index (SVI) for evaluating different strategic scenarios

The model considers key dimensions such as:
- Implementation time
- Associated costs
- Strategic importance
- Governance
- Security
- Data Modernization
- Products and Services
- Marketplace
- Customer Relationship/Centrality`,
    contact: {
      name: 'API Support',
      email: 'support@example.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  paths: {
    '/api/open-banking/scenarios': {
      get: {
        summary: 'Get all strategic scenarios',
        description: 'Retrieves all available strategic scenarios for Open Banking implementation, including internal development, outsourced solutions, and hybrid approaches.',
        responses: {
          '200': {
            description: 'List of strategic scenarios',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/StrategicScenario'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/open-banking/scenarios/{id}': {
      get: {
        summary: 'Get scenario by ID',
        description: 'Retrieves detailed information about a specific strategic scenario.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer'
            },
            description: 'Unique identifier of the scenario'
          }
        ],
        responses: {
          '200': {
            description: 'Strategic scenario details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/StrategicScenario'
                }
              }
            }
          },
          '404': {
            description: 'Scenario not found'
          }
        }
      }
    },
    '/api/open-banking/calculate-svi': {
      post: {
        summary: 'Calculate Strategic Value Index (SVI)',
        description: 'Calculates the Strategic Value Index for a new scenario using FAHP, ER, and MOO methodologies.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SviCalculation'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'SVI calculation result',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SviResult'
                }
              }
            }
          }
        }
      }
    },
    '/api/open-banking/fahp-weights': {
      get: {
        summary: 'Get FAHP weights',
        description: 'Retrieves the Fuzzy Analytical Hierarchy Process weights for different criteria used in decision-making.',
        responses: {
          '200': {
            description: 'FAHP weights for criteria',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    strategicImportance: {
                      type: 'number',
                      description: 'Weight for strategic importance (0-1)'
                    },
                    cost: {
                      type: 'number',
                      description: 'Weight for cost (0-1)'
                    },
                    timeToImplement: {
                      type: 'number',
                      description: 'Weight for time to implement (0-1)'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      StrategicScenario: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'Unique identifier for the scenario'
          },
          name: {
            type: 'string',
            description: 'Name of the strategic scenario (e.g., Internal Development, Outsourced Solution, Hybrid Approach)'
          },
          cost: {
            type: 'number',
            description: 'Implementation cost in currency units'
          },
          timeToImplement: {
            type: 'number',
            description: 'Time to implement in months'
          },
          strategicImportance: {
            type: 'number',
            description: 'Strategic importance score (0-1) based on FAHP analysis'
          },
          svi: {
            type: 'number',
            description: 'Strategic Value Index (0-1) calculated using the Hi-MCDA model'
          }
        }
      },
      SviCalculation: {
        type: 'object',
        required: ['cost', 'timeToImplement', 'strategicImportance'],
        properties: {
          cost: {
            type: 'number',
            description: 'Implementation cost in currency units'
          },
          timeToImplement: {
            type: 'number',
            description: 'Time to implement in months'
          },
          strategicImportance: {
            type: 'number',
            description: 'Strategic importance score (0-1) based on FAHP analysis'
          }
        }
      },
      SviResult: {
        type: 'object',
        properties: {
          svi: {
            type: 'number',
            description: 'Calculated Strategic Value Index (0-1)'
          },
          factors: {
            type: 'object',
            properties: {
              strategicImportance: {
                type: 'number',
                description: 'Strategic importance score used in calculation'
              },
              cost: {
                type: 'number',
                description: 'Cost factor used in calculation'
              },
              timeToImplement: {
                type: 'number',
                description: 'Time to implement factor used in calculation'
              }
            }
          }
        }
      }
    }
  }
};