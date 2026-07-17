import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      showToast('Please fill out all fields.', 'warning');
      return;
    }
    if (password !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    try {
      const sessionUser = await register(name, email, password);
      showToast(`Registered successfully as ${sessionUser.name}! Welcome!`, 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast(err.message || 'Registration failed.', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl space-y-6">
      
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-black tracking-tight">Create an Account</h1>
        <p className="text-xs text-slate-400">Join Gearbox PC to build, save, and order custom rigs.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Full Name</label>
          <div className="relative">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Connor"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Email Address</label>
          <div className="relative">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. sarah@example.com"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Password</label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Confirm Password</label>
          <div className="relative">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Create Account
        </button>

      </form>

      <p className="text-xs text-center text-slate-450 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-primary hover:underline">
          Sign In
        </Link>
      </p>

    </div>
  );
}
