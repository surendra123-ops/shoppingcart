import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer.jsx';
import { useAuth } from '../hooks/useAuth.js';

export const RegisterPage = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      return;
    }

    if (password.length < 6) {
      return;
    }

    try {
      await register({ name, email, password });
      navigate('/', { replace: true });
    } catch {
      // Error handled by AuthContext toast.
    }
  };

  const passwordsMatch = password === confirmPassword || confirmPassword === '';
  const passwordValid = password.length >= 6 || password === '';

  return (
    <PageContainer
      title="Create an account"
      subtitle="Sign up to start shopping"
    >
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-4">
          <label className="block text-sm font-medium text-neutral-700">
            Full Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
              placeholder="John Doe"
              required
            />
          </label>
          <label className="block text-sm font-medium text-neutral-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
              placeholder="you@example.com"
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
              placeholder="At least 6 characters"
              required
              minLength={6}
            />
            {!passwordValid && password && (
              <p className="mt-1 text-xs text-red-500">Password must be at least 6 characters</p>
            )}
          </label>
          <label className="block text-sm font-medium text-neutral-700">
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2 text-sm focus:border-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light"
              placeholder="Re-enter your password"
              required
            />
            {!passwordsMatch && confirmPassword && (
              <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
            )}
          </label>
        </div>
        <button
          type="submit"
          disabled={loading || !passwordsMatch || !passwordValid}
          className="inline-flex w-full items-center justify-center rounded-full bg-primary-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary disabled:opacity-70"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
        <p className="text-center text-xs text-neutral-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-dark hover:text-primary">
            Sign in
          </Link>
        </p>
      </form>
    </PageContainer>
  );
};

