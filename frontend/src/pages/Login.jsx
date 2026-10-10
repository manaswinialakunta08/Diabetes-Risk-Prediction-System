import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Activity,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import Button from '../components/common/Button';
import InputField from '../components/forms/InputField';
import ErrorMessage from '../components/common/ErrorMessage';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validation';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const fromPath = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);

    const { isValid, errors } = validateLoginForm(email, password);
    if (!isValid) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setLoading(true);

    try {
      const result = await login(email, password, rememberMe);
      navigate(fromPath, { replace: true });
    } catch (err) {
      setAuthError(
        err.message || 'Authentication failed. Please verify your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-navy-primary flex items-center justify-center text-[#2A9D8F] shadow-sm">
            <Activity className="w-7 h-7" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-navy-deep tracking-tight">
          Sign In to DiaRisk
        </h2>
        <p className="mt-1.5 text-center text-xs sm:text-sm text-slate-500">
          Access your clinical health history and population analytics dashboard.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200/90 shadow-card">
          {authError && (
            <div className="mb-5">
              <ErrorMessage
                title="Authentication Error"
                message={authError}
                onRetry={() => setAuthError(null)}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email Field */}
            <InputField
              id="email"
              name="email"
              type="email"
              label="Email Address"
              required
              placeholder="analyst@healthcare.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={validationErrors.email}
              autoComplete="email"
            />

            {/* Password Field with Show/Hide toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    alert('Password reset endpoint (/api/auth/forgot-password) is pending backend configuration.')
                  }
                  className="text-xs font-semibold text-navy-primary hover:text-teal-accent"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative rounded-lg shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className={`block w-full rounded-lg text-sm border pr-10 py-2.5 px-3.5 ${
                    validationErrors.password
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-slate-300 focus:border-navy-primary focus:ring-navy-primary/20'
                  } focus:outline-none focus:ring-2`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {validationErrors.password && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-navy-primary border-slate-300 focus:ring-navy-primary"
                />
                <span>Remember this workstation</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          {/* Quick Demo Credentials Tip */}
          <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50 -mx-6 -mb-8 px-6 py-4 rounded-b-2xl text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-teal-accent" />
              <span>Development / Demo Mode:</span>
            </div>
            If the Flask API server is not running locally, submitting valid credentials will initiate a simulated analyst session for testing.
          </div>
        </div>

        <p className="mt-6 text-center text-xs sm:text-sm text-slate-500">
          Don't have an analyst account yet?{' '}
          <Link
            to="/register"
            className="font-bold text-navy-primary hover:text-teal-accent transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

