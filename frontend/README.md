# Frontend - VibeCart

A modern, responsive React application built with Vite, TailwindCSS, and React Router for the VibeCart e-commerce platform.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Available Scripts](#-available-scripts)
- [Project Structure Details](#-project-structure-details)
- [Key Components](#-key-components)
- [State Management](#-state-management)
- [Routing](#-routing)
- [Styling](#-styling)
- [Development](#-development)
- [Production Build](#-production-build)

## 🚀 Tech Stack

- **Build Tool:** Vite 7.1.7
- **Framework:** React 19.1.1
- **Routing:** React Router DOM 7.9.5
- **Styling:** TailwindCSS 3.4.17
- **HTTP Client:** Axios 1.13.2
- **UI Components:** Headless UI 2.2.9
- **Icons:** Heroicons 2.2.0
- **Notifications:** React Hot Toast 2.6.0
- **Code Quality:** ESLint 9.36.0

## ✨ Features

- 🎨 Modern, responsive UI with TailwindCSS
- 🔐 User authentication (login, register)
- 🛒 Shopping cart with real-time updates
- 📦 Product catalog with grid layout
- 💳 Checkout flow with receipt modal
- 🔔 Toast notifications for user feedback
- 🛡️ Protected routes for authenticated pages
- 📱 Fully responsive design (mobile-first)
- ⚡ Fast development with Vite HMR
- 🎭 Smooth animations and transitions
- 🎨 Gradient designs and modern aesthetics

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── api/            # API client functions
│   │   ├── authApi.js
│   │   ├── cartApi.js
│   │   ├── checkoutApi.js
│   │   ├── httpClient.js
│   │   └── productApi.js
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   │   ├── CartItemRow.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── PageContainer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── QuantitySelector.jsx
│   │   └── ReceiptModal.jsx
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useCart.js
│   ├── pages/           # Page components
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProductsPage.jsx
│   │   └── RegisterPage.jsx
│   ├── routes/          # Route configuration
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── utils/           # Utility functions
│   │   └── currency.js
│   ├── App.jsx          # Main app component
│   ├── App.css          # App-specific styles
│   ├── index.css        # Global styles & Tailwind
│   └── main.jsx         # Application entry point
├── .env                 # Environment variables (optional)
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔧 Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Backend API running (see backend README)

## 📦 Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment (optional):**
   ```bash
   # Create .env file if backend is on different URL
   echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:5173
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `frontend` directory (optional):

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |

**Example `.env` file:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Note:** Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

## 📜 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev
```

Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The page will reload automatically when you make changes.

### Build

```bash
# Build for production
npm run build
```

Creates an optimized production build in the `dist` directory.

### Preview

```bash
# Preview production build locally
npm run preview
```

Serves the production build locally for testing.

### Lint

```bash
# Run ESLint
npm run lint
```

Checks code for linting errors and warnings.

## 📂 Project Structure Details

### API Layer (`src/api/`)

- **httpClient.js:** Axios instance with interceptors for auth tokens and error handling
- **authApi.js:** Authentication API calls (login, register, get current user)
- **cartApi.js:** Cart operations (get, add, remove items)
- **checkoutApi.js:** Checkout processing
- **productApi.js:** Product fetching

### Components (`src/components/`)

Reusable UI components:

- **Navbar.jsx:** Main navigation with user menu and cart badge
- **ProductCard.jsx:** Product display card with add to cart
- **CartItemRow.jsx:** Individual cart item with quantity controls
- **QuantitySelector.jsx:** Increment/decrement quantity buttons
- **ReceiptModal.jsx:** Checkout success modal
- **Loader.jsx:** Loading spinner component
- **EmptyState.jsx:** Empty state placeholder
- **PageContainer.jsx:** Page layout wrapper

### Context (`src/context/`)

Global state management:

- **AuthContext.jsx:** Authentication state (user, token, login/logout)
- **CartContext.jsx:** Shopping cart state (items, total, operations)

### Hooks (`src/hooks/`)

Custom React hooks:

- **useAuth.js:** Access authentication context
- **useCart.js:** Access cart context

### Pages (`src/pages/`)

Route components:

- **ProductsPage.jsx:** Product catalog grid
- **CartPage.jsx:** Shopping cart with order summary
- **CheckoutPage.jsx:** Checkout form and order review
- **LoginPage.jsx:** User login form
- **RegisterPage.jsx:** User registration form

### Routes (`src/routes/`)

- **AppRoutes.jsx:** Main routing configuration
- **ProtectedRoute.jsx:** Route guard for authenticated pages

## 🎨 Key Components

### Navbar

- Sticky header with backdrop blur
- Responsive mobile menu
- User dropdown with profile info
- Cart badge with item count
- Gradient branding

### ProductCard

- Image hover effects
- Category badges
- Add to cart with loading states
- Success confirmation
- Gradient price display

### CartItemRow

- Product image and details
- Quantity selector
- Remove button
- Subtotal calculation
- Hover effects

### ReceiptModal

- Success animation
- Order summary
- Itemized receipt
- Total amount display
- Continue shopping button

## 🔄 State Management

### Authentication State

Managed via `AuthContext`:

```javascript
const { 
  user,           // Current user object
  token,          // JWT token
  isAuthenticated, // Boolean
  login,          // Login function
  register,       // Register function
  logout          // Logout function
} = useAuth();
```

**Features:**
- Token stored in localStorage
- Auto-refresh on page load
- Automatic logout on token expiry

### Cart State

Managed via `CartContext`:

```javascript
const {
  items,          // Cart items array
  total,          // Total price
  loading,        // Loading state
  isEmpty,        // Boolean
  addItem,        // Add to cart
  updateQuantity, // Update item quantity
  removeItem      // Remove item
} = useCart();
```

**Features:**
- Auto-sync with backend
- Real-time total calculation
- Persistent across sessions
- Clears on checkout

## 🛣️ Routing

### Public Routes

- `/` - Products page
- `/login` - Login page
- `/register` - Registration page

### Protected Routes

Require authentication:

- `/cart` - Shopping cart
- `/checkout` - Checkout page

**Protected Route Behavior:**
- Redirects to `/login` if not authenticated
- Preserves intended destination for redirect after login

## 🎨 Styling

### TailwindCSS Configuration

Custom theme in `tailwind.config.js`:

- **Primary Colors:** Indigo gradient (`#6366F1` to `#4F46E5`)
- **Neutral Palette:** Gray scale (50-900)
- **Custom Shadows:** Card shadow utilities
- **Responsive Breakpoints:** sm, lg, xl

### Global Styles

- Gradient background
- Custom animations (fade-in)
- Smooth transitions
- Antialiased text

### Component Styling

- Utility-first approach
- Responsive design (mobile-first)
- Hover states and transitions
- Gradient accents
- Modern card designs

## 🛠️ Development

### Hot Module Replacement (HMR)

Vite provides instant HMR:
- Fast refresh for React components
- CSS updates without page reload
- State preservation during updates

### Code Quality

**ESLint Configuration:**
- React Hooks rules
- React Refresh plugin
- Modern JavaScript standards

**Linting:**
```bash
npm run lint
```

### Best Practices

- ✅ Component-based architecture
- ✅ Reusable custom hooks
- ✅ Context for global state
- ✅ Error boundaries (recommended)
- ✅ Loading states
- ✅ Empty states
- ✅ Responsive design
- ✅ Accessibility considerations

## 🚀 Production Build

### Build Process

```bash
npm run build
```

**Output:**
- Optimized bundle in `dist/` directory
- Code splitting
- Minified assets
- Tree-shaking

### Deployment Options

**Static Hosting:**
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

**Configuration:**
1. Set `VITE_API_BASE_URL` to production API URL
2. Build the project
3. Deploy `dist/` directory
4. Configure API CORS for your domain

### Environment Variables

For production, set environment variables in your hosting platform:

```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## 📱 Responsive Design

Breakpoints:
- **Mobile:** Default (< 640px)
- **Tablet:** `sm:` (≥ 640px)
- **Desktop:** `lg:` (≥ 1024px)
- **Large Desktop:** `xl:` (≥ 1280px)

## 🎯 Features in Detail

### Authentication Flow

1. User registers/logs in
2. JWT token stored in localStorage
3. Token included in API requests
4. Protected routes check authentication
5. Auto-logout on token expiry

### Shopping Cart Flow

1. Browse products
2. Add items to cart (requires login)
3. View cart with quantities
4. Update quantities or remove items
5. Proceed to checkout
6. Complete checkout with contact info
7. View receipt modal
8. Cart automatically cleared

### Error Handling

- Toast notifications for errors
- Form validation
- API error messages displayed
- Graceful fallbacks

## 🔍 Troubleshooting

### Common Issues

**API Connection Errors:**
- Verify backend is running
- Check `VITE_API_BASE_URL` in `.env`
- Verify CORS configuration

**Authentication Issues:**
- Clear localStorage
- Check token expiration
- Verify JWT_SECRET matches backend

**Build Errors:**
- Clear `node_modules` and reinstall
- Check Node.js version (18+)
- Verify all dependencies installed

## 📝 Notes

- Uses React 19 (latest features)
- Vite for fast development experience
- TailwindCSS for utility-first styling
- Headless UI for accessible components
- React Hot Toast for notifications
- Heroicons for consistent iconography

## 🤝 Contributing

This is a screening project for Vibe Commerce. Feel free to fork and extend.

## 📄 License

ISC

---

Built with ❤️ using React, Vite, and TailwindCSS
