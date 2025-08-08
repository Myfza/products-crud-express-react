import styles from '../styles/ProductList.module.css';
import ProductItem from './ProductItem.jsx';

export default function ProductList({ products, onUpdate, onDelete }) {
  if (!products.length) {
    return <p>Tidak ada produk. Tambahkan produk baru.</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map((p) => (
        <ProductItem key={p.id} product={p} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}