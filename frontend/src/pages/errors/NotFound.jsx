import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-20 p-8 text-center space-y-6">
      <div className="p-4 bg-amber-500/10 text-amber-500 rounded-full w-fit mx-auto animate-pulse">
        <ShieldAlert className="w-16 h-16" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-800 dark:text-white">404</h1>
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-205">Page Not Found</h2>
        <p className="text-sm text-slate-455">
          The link you followed may be broken or the directory was relocated. Verify the target URL.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-md"
      >
        <Home className="w-4 h-4" /> Go Back Home
      </Link>
    </div>
  );
}
