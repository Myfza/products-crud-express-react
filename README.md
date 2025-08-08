# Products Full-Stack App (Express + React Vite)

A simple CRUD application for "products" data with a Node.js + Express.js backend and a React.js (Vite) frontend. Ready to run locally.

## Specifications

- Backend:
- REST API CRUD `/api/products` (GET, POST, PUT, DELETE)
- Mock database (in-memory array)
- Input validation and error handling
- CORS for origin `http://localhost:5173`
- Port: 5000

- Frontend:
- Display product list
- Add product form
- Edit and delete per item
- Styling: CSS Modules
- Using `fetch` for API
- Port: 5173

---

## How to run

1) Run Backend (port 5000)

```bash
cd server
npm install
npm start
```
cd ../client
npm install
npm run dev
Visit: http://localhost:5173

---

## Brief explanation of how each part works

### Backend (server)
- server.js
- Initializes Express, enables CORS for the origin frontend, parses JSON, and binds the /api/products router.
- Provides a 404 handler for unknown routes and a global error handler middleware.
- Runs the server on port 5000.

- routes/products.js
- Stores product data in an in-memory array with auto-incrementing IDs.
- Provides endpoints:
- GET /api/products: retrieves all products.
- GET /api/products/:id: retrieves a product by ID.
- POST /api/products: validates the payload and then creates a new product.
- PUT /api/products/:id: validates the payload and then updates the product.
- DELETE /api/products/:id: deletes the product.
- Handles common errors: 400 (invalid ID / invalid payload) and 404 (product not found).

### Frontend (client)
- Vite configures on port 5173, so the frontend URL is http://localhost:5173.
- App.jsx
- Manages product state, loads data from the backend on mount, and provides add/update/delete handlers.
- Displays a global error if the request fails.
- ProductForm.jsx
- Add new product form with simple client-side validation.
- ProductList.jsx
- Displays a collection of ProductItems in a responsive grid.
- ProductItem.jsx
- Displays a single product, provides an inline edit mode and a delete button.
- CSS Modules
- Simple yet clean styling, isolated per component to avoid class conflicts.

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
