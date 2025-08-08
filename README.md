# Products Full-Stack App (Express + React Vite)

A simple CRUD application for "products" data with a Node.js + Express.js backend and a React.js (Vite) frontend. Ready to run locally.

## Spesifikasi

- Backend:
  - REST API CRUD `/api/products` (GET, POST, PUT, DELETE)
  - Mock database (array in-memory)
  - Validasi input dan error handling
  - CORS untuk origin `http://localhost:5173`
  - Port: 5000

- Frontend:
  - Menampilkan daftar produk
  - Form tambah produk
  - Edit dan hapus per item
  - Styling: CSS Modules
  - Menggunakan `fetch` untuk API
  - Port: 5173


---

## Cara menjalankan

1) Jalankan Backend (port 5000)

```bash
cd server
npm install
npm start
```
cd ../client
npm install
npm run dev
Kunjungi: http://localhost:5173


---

## Penjelasan singkat cara kerja tiap bagian

### Backend (server)
- server.js
  - Menginisialisasi Express, mengaktifkan CORS untuk origin frontend, parsing JSON, dan mengikat router /api/products.
  - Menyediakan handler 404 untuk route yang tidak dikenal dan middleware error handler global.
  - Menjalankan server pada port 5000.

- routes/products.js
  - Menyimpan data produk dalam array in-memory, dengan id auto-increment.
  - Menyediakan endpoint:
    - GET /api/products: ambil semua produk.
    - GET /api/products/:id: ambil produk berdasarkan id.
    - POST /api/products: validasi payload lalu buat produk baru.
    - PUT /api/products/:id: validasi payload lalu update produk.
    - DELETE /api/products/:id: hapus produk.
  - Menangani error umum: 400 (id invalid / payload invalid) dan 404 (produk tidak ditemukan).

### Frontend (client)
- Vite config pada port 5173, sehingga URL frontend adalah http://localhost:5173.
- App.jsx
  - Mengelola state produk, memuat data dari backend saat mount, serta menyediakan handler add/update/delete.
  - Menampilkan error global jika request gagal.
- ProductForm.jsx
  - Form tambah produk baru dengan validasi sisi-klien sederhana.
- ProductList.jsx
  - Menampilkan kumpulan ProductItem dalam grid responsif.
- ProductItem.jsx
  - Menampilkan satu produk, menyediakan mode edit inline dan tombol hapus.
- CSS Modules
  - Styling sederhana namun rapi, terisolasi per komponen untuk menghindari konflik kelas.

Selamat mencoba, M. Kalau ingin menambahkan pencarian, pagination, atau penyimpanan ke database nyata (mis. PostgreSQL/SQLite), bilang ya—kita bisa kembangkan dari fondasi ini.

## 📬 Contact

| Platform | Link |
|---------|------|
| 🌐 Website | [vizart.netlify.app](https://vizart.netlify.app) |
| 💼 LinkedIn | [linkedin.com/in/myfza](https://linkedin.com/in/myfza) |
| 🐙 GitHub | [github.com/Myfza](https://github.com/Myfza) |
| 📧 Email | [vizart.id@gmail.com](mailto:vizart.id@gmail.com) |

---

Made by **Muhammad Yusuf Aditiya**  
Open-source for educational and personal development.
