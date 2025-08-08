const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();

// Middleware
app.use(express.json());

// CORS: izinkan akses dari frontend Vite (port 5173)
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  })
);

// Routes
app.use('/api/products', productsRouter);

// 404 handler untuk route yang tidak dikenal
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});


// Error handler umum
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  return res.status(status).json({
    error: err.message || 'Internal Server Error'
  });
});

// Jalankan server pada port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});