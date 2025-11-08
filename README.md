# Mock E-Com Cart

Mock E-Com Cart is a production-ready full-stack shopping cart experience built for the Vibe Commerce screening. It showcases a modern React frontend, an Express API backed by MongoDB, and Fake Store API powered catalog seeding.

## 🚀 Tech Stack

- **Frontend:** React (Vite), React Router, TailwindCSS, Axios, React Hot Toast
- **Backend:** Node.js, Express, Mongoose, JWT authentication
- **Database:** MongoDB
- **Integrations:** Fake Store API for initial product catalog

## 🧩 Features

- Authenticated mock shopper flow with a seeded demo account
- Product catalog seeded from Fake Store API with graceful fallback data
- Persistent cart per user with quantity management and removal
- Checkout flow with contact form, receipt modal, and cart clearing
- Responsive Tailwind UI with toast notifications and protected routes
- Centralized REST API with error handling middleware and environment-driven configuration

## 📁 Project Structure

```
.
├── backend/        # Express API, MongoDB models, services
├── frontend/       # React + Vite SPA
└── README.md       # Project documentation (this file)
```

## 🔧 Prerequisites

- Node.js 18+
- npm 9+
- MongoDB running locally (or a connection string to a hosted instance)

## ⚙️ Backend Setup

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Copy the environment example and update as needed:

   ```bash
   cp env.example .env
   ```

   | Variable        | Description                                  |
   | --------------- | -------------------------------------------- |
   | `PORT`          | API port (default `5000`)                     |
   | `NODE_ENV`      | Environment label                             |
   | `MONGO_URI`     | MongoDB connection string                     |
   | `JWT_SECRET`    | Secret for signing auth tokens                |
   | `JWT_EXPIRES_IN`| Token lifetime (e.g., `2h`)                   |
   | `FAKE_STORE_URL`| Upstream products endpoint                    |

3. Start the API:

   ```bash
   npm run dev
   ```

   On launch the server will:

   - Connect to MongoDB
   - Seed Fake Store products (with fallback data)
   - Seed the demo user (`demo@vibecommerce.com` / `Password123!`)

## 🎨 Frontend Setup

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. (Optional) Create a `.env` file to point to a non-default API base:

   ```bash
   echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env
   ```

3. Start the Vite dev server:

   ```bash
   npm run dev
   ```

4. Visit the app at the URL logged by Vite (default `http://localhost:5173`).

## 🔐 Demo Credentials

- **Email:** `demo@vibecommerce.com`
- **Password:** `Password123!`

These values are also pre-filled on the login page for convenience.

## 🛠️ Testing the Flow

1. Open the frontend, log in with the demo user.
2. Browse the products grid and add items to the cart.
3. Review cart contents, adjust quantities, and remove items as needed.
4. Proceed to checkout, verify pre-filled details, and submit.
5. Observe the receipt modal with totals and timestamp.

## 📸 Suggested Screenshots

Capture the following for portfolio or submission materials:

- Products grid showcasing Fake Store items
- Cart page with multiple items and order summary
- Checkout form and receipt modal

## 🧼 Linting & Quality

- Backend: `npm run lint` (placeholder command; configure ESLint as desired)
- Frontend: `npm run lint`

## 📦 Production Build

```bash
# Build frontend assets
cd frontend
npm run build

# Start backend (ensure env + MongoDB configured)
cd ../backend
npm start
```

Serve the frontend build using your preferred static host (e.g., Nginx, Vercel) and point it to the deployed backend API.

## 🤝 Contributing

This project is tailored for the Vibe Commerce screening, but feel free to fork and adapt for your own experiments or interviews.

---

Happy hacking! ✨


