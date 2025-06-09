# Open Banking Strategic Decision API

A TypeScript-based API implementation of a Hybrid Hierarchical Multi-Criteria Decision Analysis (Hi-MCDA) model for Open Banking strategic decision making.

## Research Overview

This project is based on a doctoral thesis that proposes a sophisticated decision-support model for traditional banks to navigate the strategic challenges posed by Open Banking.

### The Problem

Traditional banks are facing intense competition from digital banks, FinTechs, and Big Tech, largely due to the rise of **Open Banking**. Open Banking is a framework that allows secure data sharing between financial and non-financial institutions via **APIs**, driven by customer consent. This shift means banks are losing competitive edge, particularly with customer data outflow. Bank decision-makers struggle to formulate optimal digital strategies due to rapid technological changes, regulatory updates, and managing external competitive pressure.

### The Goal

The research proposes a **decision-support tool** to help bank decisors select **optimal digital strategies** related to Open Banking. This tool aims to guide banks in prioritizing strategic actions. The ultimate objective is to help commercial bank decisors select strategies for Open Banking management.

### The Proposed Solution (The Model)

The core of the research is a **Hybrid Hierarchical Multi-Criteria Decision Analysis (Hi-MCDA)** model. This model is designed to structure and quantify the attractiveness of objectives related to Open Banking management.

#### Hierarchical Structure
- **Strategic Level**: High-level objectives
- **Tactical Level**: More specific goals
- **Operational Level**: Practical tasks or actions

Key strategic objectives include:
- Governance
- Security
- Data Modernization
- Products and Services
- Marketplace
- Customer Relationship/Centrality

#### Methodologies
1. **Fuzzy Analytical Hierarchy Process (FAHP)**
   - Handles uncertainty and ambiguity in decision-making
   - Assesses relative importance of objectives and actions
   - Incorporates multiple decision-makers' judgments

2. **Evidential Reasoning (ER)**
   - Aggregates judgments from multiple decisors
   - Processes empirical data (ROI, risk, ESG scores)
   - Addresses incomplete or conflicting information

3. **Multiobjective Optimization (MOO)**
   - Prioritizes operational actions
   - Balances competing objectives
   - Focuses on importance, time, and cost

### Key Output

The model produces a **Strategic Value Index (SVI)**, which is a metric derived from the normalized prioritization values of actions (considering importance, time, and cost). The SVI is used to **evaluate and compare the effectiveness of different strategic scenarios**.

### Findings & Comparisons

The research was validated with a real application in a Latin American bank. Key findings include:

- The **hybrid approach** (combining internal development with outsourced solutions) is:
  - More flexible
  - More cost-effective
  - More time-efficient
  - Particularly beneficial when facing tight deadlines or budget constraints

- Data modernization and new products/services were identified as the most important strategic objectives by the bank's decisors.

### Implementation

The original algorithms (FAHP, ER, MOO) are available at [GitHub Profile @viniciudezem1](https://github.com/viniciudezem1).

## API Implementation

This repository implements the research model as a TypeScript-based API.

### Key Features

- Strategic scenario evaluation and comparison
- SVI calculation for new scenarios
- FAHP weights management
- Comprehensive API documentation with Scalar UI

### Getting Started

#### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

#### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/openfinance.git
cd openfinance
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### API Documentation

Access the interactive API documentation at `http://localhost:3000/scalar`

#### Available Endpoints

- `GET /api/open-banking/scenarios` - List all strategic scenarios
- `GET /api/open-banking/scenarios/:id` - Get scenario details
- `POST /api/open-banking/calculate-svi` - Calculate SVI for a new scenario
- `GET /api/open-banking/fahp-weights` - Get FAHP weights

### Development

#### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

#### Project Structure

```
src/
├── config/         # Configuration files
├── routes/         # API routes
├── models/         # Data models
├── services/       # Business logic
└── index.ts        # Application entry point
```

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### License

This project is licensed under the MIT License - see the LICENSE file for details.
