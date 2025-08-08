import { useState } from 'react';
import styles from '../styles/ProductItem.module.css';

export default function ProductItem({ product, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [stock, setStock] = useState(String(product.stock));
  const [error, setError] = useState('');
  const [working, setWorking] = useState(false);

  const startEdit = () => {
    setEditing(true);
    setError('');
    setName(product.name);
    setPrice(String(product.price));
    setStock(String(product.stock));
  };

  const cancelEdit = () => {
    setEditing(false);
    setError('');
  };

  const saveEdit = async () => {
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

    setWorking(true);
    const result = await onUpdate(product.id, {
      name: name.trim(),
      price: priceNum,
      stock: stockNum
    });
    setWorking(false);

    if (!result.ok) {
      setError(result.error || 'Gagal menyimpan perubahan');
      return;
    }
    setEditing(false);
  };

  const doDelete = async () => {
    if (!confirm(`Hapus produk "${product.name}"?`)) return;
    setWorking(true);
    const result = await onDelete(product.id);
    setWorking(false);
    if (!result.ok) {
      setError(result.error || 'Gagal menghapus produk');
    }
  };

  if (editing) {
    return (
      <div className={styles.card}>
        <div className={styles.title}>Edit Produk #{product.id}</div>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.grid}>
          <label>Nama</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Harga</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
          />

          <label>Stok</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min="0"
            step="1"
          />
        </div>

        <div className={styles.actions}>
          <button onClick={saveEdit} disabled={working}>
            {working ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button onClick={cancelEdit} className={styles.secondary} disabled={working}>
            Batal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.title}>
        #{product.id} • {product.name}
      </div>
      <div className={styles.meta}>
        <span>Harga: Rp {product.price.toLocaleString('id-ID')}</span>
        <span>Stok: {product.stock}</span>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.actions}>
        <button onClick={startEdit}>Edit</button>
        <button onClick={doDelete} className={styles.danger} disabled={working}>
          {working ? 'Menghapus...' : 'Hapus'}
        </button>
      </div>
    </div>
  );
}