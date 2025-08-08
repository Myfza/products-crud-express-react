import { useState } from 'react';
import styles from '../styles/ProductForm.module.css';

export default function ProductForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setName('');
    setPrice('');
    setStock('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const priceNum = Number(price);
    const stockNum = Number(stock);

    if (!name.trim()) {
      setError('Nama tidak boleh kosong');
      return;
    }
    if (Number.isNaN(priceNum) || priceNum < 0) {
      setError('Harga harus angka >= 0');
      return;
    }
    if (!Number.isInteger(stockNum) || stockNum < 0) {
      setError('Stok harus bilangan bulat >= 0');
      return;
    }

    setSubmitting(true);
    const result = await onAdd({ name: name.trim(), price: priceNum, stock: stockNum });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error || 'Gagal menambahkan produk');
      return;
    }
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.row}>
        <label htmlFor="name">Nama</label>
        <input
          id="name"
          type="text"
          placeholder="Nama produk"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="price">Harga</label>
        <input
          id="price"
          type="number"
          placeholder="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="stock">Stok</label>
        <input
          id="stock"
          type="number"
          placeholder="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          step="1"
        />
      </div>

      <button type="submit" disabled={submitting} className={styles.submit}>
        {submitting ? 'Menyimpan...' : 'Tambah'}
      </button>
    </form>
  );
}