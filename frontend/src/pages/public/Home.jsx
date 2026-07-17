import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { CATEGORIES, BRANDS } from '../../data/mockData';
import ProductCard from '../../components/ProductCard';
import { usePCBuilder } from '../../context/PCBuilderContext';

export default function Home() {
  const { components } = usePCBuilder();
  // Get featured products (first 4 items)
  const featuredProducts = (components || []).slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 overflow-hidden rounded-b-[2rem] shadow-2xl">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left md:flex items-center gap-12">
          <div className="flex-1 space-y-6">
            <span className="inline-block bg-primary/20 text-primary-light border border-primary/30 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Next-Gen Custom Rigs
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Build Your Ultimate <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Gaming Battle Station
              </span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-xl">
              Choose from hundreds of premium components. Test compatibility in real-time with our smart build engine. Get it delivered pre-assembled or as parts!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/builder"
                className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-full text-base font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Cpu className="w-5 h-5" />
                Start PC Builder
              </Link>
              <Link
                to="/catalog"
                className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-base font-semibold border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                Browse Catalog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="hidden md:block flex-1 max-w-md">
            <div className="relative border border-slate-700 p-6 rounded-3xl bg-slate-950/80 backdrop-blur shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Cpu className="w-5 h-5 text-purple-500 animate-spin" style={{ animationDuration: '3s' }} />
                  Compatibility Engine
                </div>
                <span className="bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Healthy
                </span>
              </div>
              <div className="space-y-3 py-4 text-xs font-mono text-slate-400">
                <div className="flex justify-between"><span>[CPU]</span> <span className="text-white">Ryzen 7 7800X3D</span></div>
                <div className="flex justify-between"><span>[GPU]</span> <span className="text-white">RTX 4080 Super</span></div>
                <div className="flex justify-between"><span>[Motherboard]</span> <span className="text-white">MSI B650 Tomahawk</span></div>
                <div className="flex justify-between"><span>[Power Supply]</span> <span className="text-white">Corsair RM850x (850W)</span></div>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs mt-2">
                <span className="text-slate-400">Est. Power Budget</span>
                <span className="font-bold text-white">405W / 850W</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Shop by Category</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Find exactly the PC component slot you need</p>
          </div>
          <Link to="/categories" className="text-sm text-primary font-bold flex items-center gap-1 hover:underline">
            All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.id}`}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl text-center group hover:border-primary dark:hover:border-primary hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 text-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200">{cat.name}</h3>
              <p className="text-xs text-slate-450 dark:text-slate-400 mt-1 line-clamp-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Featured Gear</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Top rated parts chosen by our builders</p>
          </div>
          <Link to="/catalog" className="text-sm text-primary font-bold flex items-center gap-1 hover:underline">
            View All Components <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Banner promo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-650 via-indigo-700 to-purple-800 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-extrabold">Stuck planning your next upgrade?</h2>
            <p className="text-indigo-100 max-w-xl text-sm md:text-base">
              Use our interactive parts configuration dashboard. Drag and drop motherboards, CPUs, and power supplies to verify sizing, compatibility, and real-time prices.
            </p>
          </div>
          <Link
            to="/builder"
            className="px-8 py-3.5 bg-white text-indigo-900 hover:bg-slate-100 font-bold rounded-full transition-all text-sm md:text-base whitespace-nowrap shadow-xl"
          >
            Launch Builder Dashboard
          </Link>
        </div>
      </section>

      {/* Features Lists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-blue-500/10 text-primary rounded-xl">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Instant Assembly Check</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Our automated rules verify socket designs, clearances, RAM forms, and minimum powers immediately.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Verified Authenticity</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We source directly from official authorized brand manufacturers with warranties included.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Premium Customer Service</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Access 24/7 technical chat support to assist with troubleshooting, BIOS updates, and drivers.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Authorized Brand Partners</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Direct distribution partnership for original parts warranties</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
          {BRANDS.map((b) => (
            <Link key={b.id} to={`/catalog?brand=${b.name}`} className="hover:opacity-100 transition-opacity font-extrabold text-lg md:text-xl text-slate-500 dark:text-slate-450 tracking-widest">
              {b.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
