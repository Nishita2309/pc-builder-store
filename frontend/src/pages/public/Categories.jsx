import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

export default function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Component Categories</h1>
        <p className="text-sm text-slate-500 mt-1">Select a hardware category to filter and explore parts catalog</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={`/catalog?category=${cat.id}`}
            className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-primary transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 text-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-450 dark:text-slate-400 mt-2 leading-relaxed">
                {cat.desc}
              </p>
            </div>
            <div className="flex items-center gap-1 text-primary text-xs font-bold mt-6 hover:underline">
              Browse Parts <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
