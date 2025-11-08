import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';

const navItems = [
  { to: '/', label: 'Products', icon: SparklesIcon },
  { to: '/cart', label: 'Cart', icon: ShoppingCartIcon },
  { to: '/checkout', label: 'Checkout', icon: ShoppingCartIcon },
];

const linkClasses = ({ isActive }) =>
  `px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
    isActive
      ? 'text-primary-dark bg-primary-light/20'
      : 'text-neutral-600 hover:text-primary-dark hover:bg-neutral-100'
  }`;

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-neutral-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-neutral-600 transition hover:bg-neutral-100 lg:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            <NavLink
              to="/"
              className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-primary-dark to-primary text-transparent bg-clip-text hover:opacity-80 transition"
            >
              <SparklesIcon className="h-6 w-6 text-primary-dark" />
              <span>VibeCart</span>
            </NavLink>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to} className={linkClasses}>
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <NavLink
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-neutral-600 hover:text-primary-dark hover:bg-neutral-100 transition"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-r from-primary-dark to-primary px-1.5 text-xs font-bold text-white shadow-lg animate-pulse">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </NavLink>

            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-dark to-primary px-4 py-2 text-sm font-medium text-white transition hover:shadow-lg hover:scale-105 transition"
                >
                  <UserIcon className="h-4 w-4" />
                  <span className="hidden sm:block">{user?.name?.split(' ')[0]}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl border border-neutral-200 py-2 overflow-hidden">
                    <div className="px-4 py-3 border-b border-neutral-100">
                      <p className="text-sm font-semibold text-neutral-900">{user?.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/register"
                  className="hidden sm:inline-flex items-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/login"
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-primary-dark to-primary px-4 py-2 text-sm font-medium text-white transition hover:shadow-lg hover:scale-105"
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="space-y-1 border-t border-neutral-200 py-4 lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition ${
                      isActive
                        ? 'bg-primary-light/20 text-primary-dark'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};
