import { Router } from 'express';

const router = Router();

// Account Information Services (AISP)
router.get('/accounts', (req, res) => {
  res.json({
    accounts: [
      {
        id: 'acc_123',
        type: 'checking',
        balance: 5000.00,
        currency: 'USD',
        status: 'active'
      }
    ]
  });
});

router.get('/accounts/:id/transactions', (req, res) => {
  res.json({
    transactions: [
      {
        id: 'tx_123',
        amount: 100.00,
        type: 'debit',
        description: 'Payment to Merchant',
        date: '2024-01-20T10:00:00Z'
      }
    ]
  });
});

router.get('/accounts/:id/balance', (req, res) => {
  res.json({
    balance: 5000.00,
    currency: 'USD',
    lastUpdated: '2024-01-20T10:00:00Z'
  });
});

// Payment Initiation Services (PISP)
router.post('/payments', (req, res) => {
  const { amount, currency, recipient, description } = req.body;
  res.json({
    paymentId: 'pay_123',
    status: 'pending',
    amount,
    currency,
    recipient,
    description,
    createdAt: new Date().toISOString()
  });
});

router.get('/payments/:id', (req, res) => {
  res.json({
    paymentId: req.params.id,
    status: 'completed',
    amount: 100.00,
    currency: 'USD',
    recipient: 'Merchant Name',
    description: 'Payment for services',
    createdAt: '2024-01-20T10:00:00Z',
    completedAt: '2024-01-20T10:01:00Z'
  });
});

// Consent Management
router.post('/consents', (req, res) => {
  const { accounts, permissions, expirationDate } = req.body;
  res.json({
    consentId: 'cons_123',
    status: 'active',
    accounts,
    permissions,
    expirationDate,
    createdAt: new Date().toISOString()
  });
});

router.get('/consents/:id', (req, res) => {
  res.json({
    consentId: req.params.id,
    status: 'active',
    accounts: ['acc_123'],
    permissions: ['read', 'write'],
    expirationDate: '2024-12-31T23:59:59Z',
    createdAt: '2024-01-01T00:00:00Z'
  });
});

router.delete('/consents/:id', (req, res) => {
  res.json({
    consentId: req.params.id,
    status: 'revoked',
    revokedAt: new Date().toISOString()
  });
});

// Security and Authentication
router.post('/auth/token', (req, res) => {
  res.json({
    accessToken: 'mock_access_token',
    tokenType: 'Bearer',
    expiresIn: 3600,
    refreshToken: 'mock_refresh_token'
  });
});

// Data Sharing
router.post('/data-sharing/requests', (req, res) => {
  const { dataType, purpose, recipient } = req.body;
  res.json({
    requestId: 'req_123',
    status: 'pending',
    dataType,
    purpose,
    recipient,
    createdAt: new Date().toISOString()
  });
});

// Financial Management Services
router.get('/financial-management/summary', (req, res) => {
  res.json({
    totalBalance: 10000.00,
    monthlyIncome: 5000.00,
    monthlyExpenses: 3000.00,
    savingsRate: 0.4,
    lastUpdated: new Date().toISOString()
  });
});

// New Banking Products
router.get('/products', (req, res) => {
  res.json({
    products: [
      {
        id: 'prod_123',
        type: 'investment',
        name: 'Digital Investment Fund',
        description: 'Automated investment portfolio',
        riskLevel: 'moderate',
        minimumAmount: 1000.00
      }
    ]
  });
});

// Marketplace Integration
router.get('/marketplace/products', (req, res) => {
  res.json({
    products: [
      {
        id: 'mp_123',
        type: 'loan',
        name: 'Personal Loan',
        provider: 'Bank XYZ',
        interestRate: 0.05,
        term: 36,
        minimumAmount: 5000.00
      }
    ]
  });
});

// Emerging Technologies Integration
router.post('/crypto/link', (req, res) => {
  const { walletAddress, currency } = req.body;
  res.json({
    linkId: 'link_123',
    status: 'active',
    walletAddress,
    currency,
    linkedAt: new Date().toISOString()
  });
});

export const openBankingCoreRoutes = router;