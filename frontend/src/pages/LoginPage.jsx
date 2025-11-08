import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer.jsx';
import { useAuth } from '../hooks/useAuth.js';

const DEFAULT_EMAIL = 'demo@vibecommerce.com';
const DEFAULT_PASSWORD = 'Password123!';

export const LoginPage = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch {
      // Error handled by AuthContext toast.
    }
  };

  return (
    <PageContainer
      title="Welcome back"
      subtitle="Sign in with the demo account to manage your shopping cart"
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-4">
          <label className="block text-sm font-medium text-neutral-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </label>
          <label className="block text-sm font-medium text-neutral-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full bg-primary-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary disabled:opacity-70"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-center text-xs text-neutral-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-primary-dark hover:text-primary">
            Sign up
          </Link>
        </p>
        <p className="text-xs text-neutral-500">
          Tip: Use the demo credentials pre-filled above to explore the full experience.
        </p>
      </form>
    </PageContainer>
  );
};


