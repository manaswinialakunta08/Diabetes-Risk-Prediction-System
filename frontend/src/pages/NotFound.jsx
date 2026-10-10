import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-navy-mist flex items-center justify-center text-navy-primary mb-4 border border-navy-soft">
        <HelpCircle className="w-8 h-8 text-navy-primary" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
        HTTP Error 404
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight mb-2">
        Clinical Route Not Located
      </h1>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
        The application endpoint or analysis resource you requested does not exist or has been relocated within the clinical system.
      </p>

      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="primary" icon={Home}>
            Return to Home
          </Button>
        </Link>
        <Link to="/predict">
          <Button variant="outline" icon={ArrowLeft}>
            New Assessment
          </Button>
        </Link>
      </div>
    </div>
  );
}

