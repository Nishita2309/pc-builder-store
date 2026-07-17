import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export default function ServerError() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-md mx-auto my-20 p-8 text-center space-y-6">
      <div className="p-4 bg-rose-500/10 text-rose-500 rounded-full w-fit mx-auto animate-pulse">
        <ShieldAlert className="w-16 h-16" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-800 dark:text-white">500</h1>
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-205">Internal Server Error</h2>
        <p className="text-sm text-slate-455">
          Something went wrong on our mock server assembly lines. Please try reloading this page.
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleReload}
          className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Reload Page
        </button>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-md"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
