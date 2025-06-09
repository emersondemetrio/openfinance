import app from './app';
import { scalarConfig } from './config/scalar';

const PORT = process.env.PORT || 3000;

// Serve Scalar API documentation
app.get('/api-docs', (req, res) => {
  res.json(scalarConfig);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});