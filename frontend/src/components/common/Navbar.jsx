import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Activity,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  FileCheck2,
  Stethoscope,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePrediction } from '../../context/PredictionContext';
import Button from './Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { latestAssessment } = usePrediction();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors px-3 py-2 rounded-lg ${
      isActive
        ? 'text-navy-primary bg-navy-mist font-semibold'
        : 'text-slate-600 hover:text-navy-primary hover:bg-slate-50'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-navy-primary/30 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-navy-primary flex items-center justify-center text-teal-accent shadow-sm">
              <Activity className="w-5 h-5 text-[#2A9D8F]" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-navy-deep leading-none block">
                DiaRisk<span className="text-[#2A9D8F] font-semibold">.AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block">
                Diabetes Prediction System
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink to="/" end className={navLinkClasses}>
              Home
            </NavLink>
            <a
              href="/#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-navy-primary hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors"
            >
              How It Works
            </a>
            <a
              href="/#features"
              className="text-sm font-medium text-slate-600 hover:text-navy-primary hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors"
            >
              Features
            </a>
            <NavLink to="/predict" className={navLinkClasses}>
              Risk Assessment
            </NavLink>
            {latestAssessment && (
              <NavLink to="/results" className={navLinkClasses}>
                Latest Results
              </NavLink>
            )}
            <NavLink to="/dashboard" className={navLinkClasses}>
              Analytics Dashboard
            </NavLink>
          </nav>

          {/* Right Action / Auth Menu */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy-primary/20"
                >
                  <div className="w-6 h-6 rounded-full bg-navy-mist text-navy-primary flex items-center justify-center font-bold">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[120px] truncate">{user?.name || 'Account'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-800 truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                      {user?.isMock && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Dev Mock Session
                        </span>
                      )}
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-slate-400" />
                      Dashboard
                    </Link>
                    <Link
                      to="/predict"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
                      New Assessment
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium text-left border-t border-slate-100"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-700 hover:text-navy-primary px-3 py-2 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link to="/predict">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-navy-primary hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-150 shadow-lg">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-base font-medium ${
                isActive ? 'bg-navy-mist text-navy-primary font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Home
          </NavLink>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            How It Works
          </a>
          <a
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50"
          >
            Features
          </a>
          <NavLink
            to="/predict"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-base font-medium ${
                isActive ? 'bg-navy-mist text-navy-primary font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Risk Assessment Form
          </NavLink>
          {latestAssessment && (
            <NavLink
              to="/results"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive ? 'bg-navy-mist text-navy-primary font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              Prediction Results
            </NavLink>
          )}
          <NavLink
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-base font-medium ${
                isActive ? 'bg-navy-mist text-navy-primary font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            Analytics Dashboard
          </NavLink>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <div className="px-3 py-1 text-xs text-slate-500">
                  Signed in as <strong className="text-slate-800">{user?.name}</strong>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/predict"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center px-4 py-2.5 rounded-lg bg-navy-primary text-sm font-semibold text-white shadow-sm"
                >
                  Start Assessment
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

