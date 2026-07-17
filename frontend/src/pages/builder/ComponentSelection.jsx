import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Search, ArrowLeft, Check, AlertTriangle, ShieldCheck, Filter } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { usePCBuilder } from '../../context/PCBuilderContext';
import { useToast } from '../../context/ToastContext';

export default function ComponentSelection() {
  const { partType } = useParams();
  const navigate = useNavigate();
  const { build, addComponentToBuild, components, componentsLoading } = usePCBuilder();
  const { showToast } = useToast();

  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [onlyCompatible, setOnlyCompatible] = useState(true);

  const slotInfo = useMemo(() => {
    return CATEGORIES.find(cat => cat.id === partType);
  }, [partType]);

  const componentsForSlot = useMemo(() => {
    return (components || []).filter(c => c.category === partType);
  }, [components, partType]);

  const brandsForSlot = useMemo(() => {
    const brands = componentsForSlot.map(c => c.brand);
    return ['all', ...new Set(brands)];
  }, [componentsForSlot]);

  // Compatibility matcher function
  const checkIsCompatible = (item) => {
    const { cpu, motherboard, case: pcCase } = build;

    // 1. CPU & Motherboard socket compatibility
    if (partType === 'cpu' && motherboard) {
      return item.specs.socket === motherboard.specs.socket;
    }
    if (partType === 'motherboard' && cpu) {
      return item.specs.socket === cpu.specs.socket;
    }

    // 2. Motherboard & Case compatibility
    if (partType === 'motherboard' && pcCase) {
      return (pcCase.specs.supportedFormFactors || []).includes(item.specs.formFactor);
    }
    if (partType === 'case' && motherboard) {
      return (item.specs.supportedFormFactors || []).includes(motherboard.specs.formFactor);
    }

    // Default: compatible
    return true;
  };

  const filteredComponents = useMemo(() => {
    let result = [...componentsForSlot];

    // Search query
    if (query) {
      result = result.filter(
        c => c.name.toLowerCase().includes(query.toLowerCase()) ||
             (c.description && c.description.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Brand
    if (selectedBrand !== 'all') {
      result = result.filter(c => c.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Compatibility filter toggle
    if (onlyCompatible) {
      result = result.filter(checkIsCompatible);
    }

    return result;
  }, [componentsForSlot, query, selectedBrand, onlyCompatible, build]);

  const handleSelectComponent = (component) => {
    addComponentToBuild(partType, component);
    showToast(`Added ${component.name} to build!`, 'success');
    navigate('/builder');
  };

  if (!slotInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Invalid Category Slot</h2>
        <Link to="/builder" className="mt-6 inline-block px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
          Return to PC Builder
        </Link>
      </div>
    );
  }

  if (componentsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent mx-auto"></div>
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Retrieving hardware registry...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/builder')}
            className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Select {slotInfo.name}</h1>
            <p className="text-xs text-slate-450 dark:text-slate-400 mt-0.5">{slotInfo.desc}</p>
          </div>
        </div>

        {/* Compatibility Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="compatible-check"
            checked={onlyCompatible}
            onChange={(e) => setOnlyCompatible(e.target.checked)}
            className="w-4.5 h-4.5 text-primary bg-slate-100 dark:bg-slate-900 rounded border-slate-350 dark:border-slate-700 cursor-pointer focus:ring-0"
          />
          <label htmlFor="compatible-check" className="text-xs font-bold text-slate-650 dark:text-slate-350 cursor-pointer flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Filter compatible parts only
          </label>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Sidebar filters */}
        <aside className="w-full md:w-60 flex-shrink-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-6">
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase text-slate-450 tracking-wider">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search models..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-3 pr-8 text-xs focus:ring-1 focus:ring-primary focus:outline-none text-slate-800 dark:text-slate-100"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <p className="text-[10px] text-slate-450 dark:text-slate-500 leading-normal pl-0.5">
              Searches model name and description.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase text-slate-450 tracking-wider flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Brands</h3>
            <div className="flex flex-wrap gap-1.5 md:flex-col">
              {brandsForSlot.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize text-left md:w-full ${
                    selectedBrand.toLowerCase() === brand.toLowerCase()
                      ? 'bg-primary text-white shadow'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {brand === 'all' ? 'All Brands' : brand}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Part Selection grid */}
        <main className="flex-1 w-full">
          {filteredComponents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents.map((item) => {
                const isCompatible = checkIsCompatible(item);

                return (
                  <div
                    key={item.id}
                    className={`bg-white dark:bg-slate-800 border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${
                      !isCompatible ? 'border-rose-250 dark:border-rose-900/50 opacity-80' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    
                    {/* Thumbnail */}
                    <div className="relative pt-[60%] bg-slate-100 dark:bg-slate-900">
                      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                      {!isCompatible && (
                        <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center p-4">
                          <span className="bg-rose-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" /> Incompatible
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">{item.brand}</span>
                        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-2 mt-0.5">{item.name}</h3>
                        {item.description && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        
                        {/* Short Specs list */}
                        <div className="mt-3 space-y-1">
                          {Object.entries(item.specs).slice(0, 3).map(([k, v]) => (
                            <div key={k} className="flex justify-between text-[10px] font-medium text-slate-500 dark:text-slate-400 capitalize">
                              <span>{k}:</span>
                              <span className="font-bold text-slate-750 dark:text-slate-300">{Array.isArray(v) ? v.slice(0, 2).join(', ') : v}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Buy Action footer */}
                      <div className="flex justify-between items-center pt-3 border-t border-slate-150 dark:border-slate-700">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Price</span>
                          <span className="text-base font-extrabold text-slate-900 dark:text-white">${item.price.toFixed(2)}</span>
                        </div>

                        <button
                          onClick={() => handleSelectComponent(item)}
                          disabled={!isCompatible}
                          className="px-3.5 py-2 text-xs font-extrabold text-white rounded-lg bg-primary hover:bg-primary-dark disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
                        >
                          Add to Build
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-3">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
              <h3 className="font-bold text-lg text-slate-850 dark:text-white">No hardware matches selected filters</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Disable the "Filter compatible parts" checkbox to check parts with warnings or sockets clearance concerns.
              </p>
            </div>
          )}
        </main>
      </div>

    </div>
  );
}
