import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BRANDS } from '../../data/mockData';

export default function Brands() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Our Brand Partners</h1>
        <p className="text-sm text-slate-500 mt-1">We source components directly from leading hardware manufactures</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {BRANDS.map((brand) => (
          <Link
            key={brand.id}
            to={`/catalog?brand=${brand.name}`}
            className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-primary transition-all text-center flex flex-col items-center justify-between"
          >
            <div className="w-full h-24 bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden mb-4 flex items-center justify-center p-4">
              <span className="text-xl font-extrabold tracking-widest text-slate-400 group-hover:text-primary dark:text-slate-600 group-hover:scale-105 transition-all uppercase">
                {brand.name}
              </span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-2">{brand.name}</h3>
            <div className="flex items-center gap-1 text-primary text-xs font-bold hover:underline">
              View Products <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
