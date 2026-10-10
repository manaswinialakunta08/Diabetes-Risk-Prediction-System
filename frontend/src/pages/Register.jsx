import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/common/Button';
import InputField from '../components/forms/InputField';
import ErrorMessage from '../components/common/ErrorMessage';
import { useAuth } from '../context/AuthContext';
import { validateRegisterForm } from '../utils/validation';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regError, setRegError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegError(null);

    const { isValid, errors } = validateRegisterForm(
      name,
      email,
      password,
      confirmPassword
    );

    if (!termsAccepted) {
      errors.terms = 'You must acknowledge the research and clinical data terms.';
    }

    if (!isValid || !termsAccepted) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setRegError(
        err.message || 'Registration failed. The server could not create your account.'
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
          Create Analyst Account
        </h2>
        <p className="mt-1.5 text-center text-xs sm:text-sm text-slate-500">
          Set up secure workspace credentials to track longitudinal health indicators.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200/90 shadow-card">
          {regError && (
            <div className="mb-5">
              <ErrorMessage
                title="Registration Request Failed"
                message={regError}
                onRetry={() => setRegError(null)}
              />
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <InputField
              id="name"
              name="name"
              label="Full Name"
              required
              placeholder="Dr. Jordan Rivera"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={validationErrors.name}
              autoComplete="name"
            />

            {/* Email */}
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

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-lg shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className={`block w-full rounded-lg text-sm border py-2.5 px-3.5 ${
                  validationErrors.confirmPassword
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-slate-300 focus:border-navy-primary focus:ring-navy-primary/20'
                } focus:outline-none focus:ring-2`}
              />
              {validationErrors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Acknowledgement */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-navy-primary border-slate-300 focus:ring-navy-primary"
                />
                <span>
                  I understand this system provides survey-based machine learning risk estimates
                  and does not replace clinical laboratory diagnoses.
                </span>
              </label>
              {validationErrors.terms && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">
                  {validationErrors.terms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-xs sm:text-sm text-slate-500">
          Already registered?{' '}
          <Link
            to="/login"
            className="font-bold text-navy-primary hover:text-teal-accent transition-colors"
          >
            Sign in to existing account
          </Link>
        </p>
      </div>
    </div>
  );
}

