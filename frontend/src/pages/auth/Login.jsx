import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password.', 'warning');
      return;
    }

    try {
      const sessionUser = await login(email, password);
      showToast(`Logged in successfully as ${sessionUser.name}!`, 'success');
      
      if (sessionUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      showToast(err.message || 'Login failed.', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl space-y-6">
      
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black tracking-tight">Sign In to Your Account</h1>
        <p className="text-xs text-slate-400">Welcome back! Please enter your details below.</p>
      </div>

      {/* Helper Notification */}
      <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 text-xs rounded-xl text-blue-600 dark:text-blue-400 font-medium">
        <p className="font-bold mb-0.5">Quick Demo Tip:</p>
        <p>• Admin: <span className="underline font-bold">admin@pcbuilder.com</span> / <span className="font-bold">admin123</span></p>
        <p>• Customer: <span className="underline font-bold">customer@pcbuilder.com</span> / <span className="font-bold">customer123</span></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. customer@example.com"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Password</label>
            <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4.5 h-4.5 text-primary bg-slate-100 dark:bg-slate-900 rounded border-slate-300 dark:border-slate-700 focus:ring-0 cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-pointer">
            Remember my credentials
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <LogIn className="w-4 h-4" /> Sign In
        </button>

      </form>

      <p className="text-xs text-center text-slate-450 mt-4">
        New to Gearbox PC?{' '}
        <Link to="/register" className="font-bold text-primary hover:underline">
          Create an Account
        </Link>
      </p>

    </div>
  );
}
