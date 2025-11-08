import { Routes, Route } from 'react-router-dom';
import { ProductsPage } from '../pages/ProductsPage.jsx';
import { CartPage } from '../pages/CartPage.jsx';
import { CheckoutPage } from '../pages/CheckoutPage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { RegisterPage } from '../pages/RegisterPage.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<ProductsPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Route>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Routes>
);

