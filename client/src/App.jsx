import { useEffect, useState, useCallback } from 'react';
import styles from './styles/App.module.css';
import ProductForm from './components/ProductForm.jsx';
import ProductList from './components/ProductList.jsx';

const API_BASE = 'http://localhost:5000/api/products';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setGlobalError('');
      const res = await fetch(API_BASE);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Gagal memuat data');
      }
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      setGlobalError(e.message || 'Terjadi kesalahan saat memuat produk');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (payload) => {
    try {
      setGlobalError('');
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        const message = data?.errors?.join(', ') || data?.error || 'Gagal menambah produk';
        throw new Error(message);
      }
      setProducts((prev) => [...prev, data]);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  const updateProduct = async (id, payload) => {
    try {
      setGlobalError('');
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        const message = data?.errors?.join(', ') || data?.error || 'Gagal mengubah produk';
        throw new Error(message);
      }
      setProducts((prev) => prev.map((p) => (p.id === id ? data : p)));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      setGlobalError('');
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        const message = data?.error || 'Gagal menghapus produk';
        throw new Error(message);
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Products</h1>
        <p className={styles.subtitle}>CRUD sederhana dengan Node.js + Express dan React (Vite)</p>
      </header>

      {globalError && <div className={styles.errorBanner}>{globalError}</div>}

      <section className={styles.section}>
        <h2>Tambah Produk</h2>
        <ProductForm onAdd={addProduct} />
      </section>

      <section className={styles.section}>
        <h2>Daftar Produk</h2>
        {loading ? (
          <p>Memuat...</p>
        ) : (
          <ProductList products={products} onUpdate={updateProduct} onDelete={deleteProduct} />
        )}
      </section>
    </div>
  );
}