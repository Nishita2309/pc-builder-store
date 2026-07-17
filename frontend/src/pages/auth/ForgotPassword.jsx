import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Key } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ForgotPassword() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email address.', 'warning');
      return;
    }
    setSubmitted(true);
    showToast(`Password reset link has been dispatched to ${email}!`, 'success');
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl space-y-6">
      
      <div className="text-center space-y-2">
        <div className="p-3 bg-blue-500/10 text-primary rounded-full w-fit mx-auto mb-2">
          <Key className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black tracking-tight">Reset Your Password</h1>
        <p className="text-xs text-slate-450">
          {!submitted 
            ? "Enter your email address and we'll dispatch a link to restore access."
            : "Check your mailbox for instructions."
          }
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. email@example.com"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-lg"
          >
            Send Recovery Email
          </button>
        </form>
      ) : (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-xs rounded-xl text-emerald-600 dark:text-emerald-400 text-center font-medium">
          An email has been sent to <span className="font-bold">{email}</span>. Click the link inside to set a new password.
        </div>
      )}

      <div className="text-center pt-2">
        <Link to="/login" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </div>

    </div>
  );
}
