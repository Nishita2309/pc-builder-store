import React from 'react';
import { Cpu, Users, HeartHandshake, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Intro banner */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          About GEARBOX PC
        </h1>
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
          Founded in 2024, Gearbox PC is on a mission to simplify computer building. We believe hardware integration should be accessible, visually interactive, and worry-free.
        </p>
      </section>

      {/* Grid info stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {[
          { metric: '50K+', label: 'PCs Assembled' },
          { metric: '99.7%', label: 'Compatibility Accuracy' },
          { metric: '24/7', label: 'Tech Expert Chat' },
          { metric: '3-Year', label: 'Average Part Warranty' }
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <span className="text-3xl md:text-4xl font-extrabold text-primary block">{stat.metric}</span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mt-2">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight text-center">Our Core Operating Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-slate-150 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 rounded-2xl flex gap-4">
            <Cpu className="w-10 h-10 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Technical Excellence</h3>
              <p className="text-sm text-slate-450 dark:text-slate-400 leading-relaxed">
                We design precise compatibility algorithms ensuring every CPU socket, motherboard factor, and graphics slot matches perfectly.
              </p>
            </div>
          </div>
          <div className="p-6 border border-slate-150 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 rounded-2xl flex gap-4">
            <HeartHandshake className="w-10 h-10 text-purple-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Customer Empowerment</h3>
              <p className="text-sm text-slate-450 dark:text-slate-400 leading-relaxed">
                We provide loading skeletons, detailed reviews, clear pricing, and live timelines so our users feel confident in their purchase.
              </p>
            </div>
          </div>
          <div className="p-6 border border-slate-150 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 rounded-2xl flex gap-4">
            <Award className="w-10 h-10 text-emerald-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg mb-2">Direct Relationships</h3>
              <p className="text-sm text-slate-450 dark:text-slate-400 leading-relaxed">
                We work directly with authorized brand partners, guaranteeing original boxes, official accessories, and standard manufacturer warranties.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
