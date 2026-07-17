import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

export default function EmptyState({
  icon: Icon = HelpCircle,
  title = 'No Items Found',
  message = 'We couldn\'t find what you were looking for.',
  actionText,
  actionLink,
  onActionClick
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800/40">
      <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 dark:text-slate-500 mb-4">
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-550 dark:text-slate-400 max-w-sm mb-6">{message}</p>
      
      {actionLink && actionText && (
        <Link
          to={actionLink}
          className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-semibold transition-colors shadow-md shadow-blue-500/15"
        >
          {actionText}
        </Link>
      )}

      {!actionLink && actionText && onActionClick && (
        <button
          onClick={onActionClick}
          className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-semibold transition-colors shadow-md shadow-blue-500/15"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
