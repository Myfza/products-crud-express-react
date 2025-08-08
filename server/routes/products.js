const express = require('express');
const router = express.Router();

// Mock database (in-memory)
let products = [
  { id: 1, name: 'Keyboard', price: 250000, stock: 10 },
  { id: 2, name: 'Mouse', price: 150000, stock: 25 }
];
let nextId = 3;

// Helper: validasi payload
function validateProductPayload(body) {
  const errors = [];

  if (typeof body.name !== 'string' || body.name.trim().length === 0) {
    errors.push('name harus berupa string dan tidak boleh kosong');
  }

  if (typeof body.price !== 'number' || Number.isNaN(body.price) || body.price < 0) {
    errors.push('price harus berupa number >= 0');
  }

  if (
    typeof body.stock !== 'number' ||
    Number.isNaN(body.stock) ||
    body.stock < 0 ||
    !Number.isInteger(body.stock)
  ) {
    errors.push('stock harus berupa integer >= 0');
  }

  return errors;
}

// GET /api/products - list all
router.get('/', (req, res) => {
  return res.json(products);
});

// GET /api/products/:id - get by id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'id harus berupa number' });
  }
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product tidak ditemukan' });
  }
  return res.json(product);
});

// POST /api/products - create
router.post('/', (req, res) => {
  const { name, price, stock } = req.body;

  const errors = validateProductPayload({ name, price, stock });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const newProduct = {
    id: nextId++,
    name: name.trim(),
    price,
    stock
  };

  products.push(newProduct);
  return res.status(201).json(newProduct);
});

// PUT /api/products/:id - update
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'id harus berupa number' });
  }

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product tidak ditemukan' });
  }

  const { name, price, stock } = req.body;
  const errors = validateProductPayload({ name, price, stock });
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  products[index] = {
    id,
    name: name.trim(),
    price,
    stock
  };

  return res.json(products[index]);
});

// DELETE /api/products/:id - delete
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'id harus berupa number' });
  }

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product tidak ditemukan' });
  }

  const deleted = products.splice(index, 1)[0];
  return res.json({ message: 'Product dihapus', product: deleted });
});

module.exports = router;