import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, X, Cpu } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import ProductCard from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/Skeletons';
import { usePCBuilder } from '../../context/PCBuilderContext';

export default function Catalog() {
  const { components, componentsLoading } = usePCBuilder();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Filters state
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || 'all');
  const [priceRange, setPriceRange] = useState(1200); // max slider value
  const [sortOption, setSortOption] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand, priceRange, sortOption, query]);

  // Sync params from URL
  useEffect(() => {
    const qParam = searchParams.get('q');
    const catParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    
    if (qParam !== null) setQuery(qParam);
    if (catParam !== null) setSelectedCategory(catParam);
    if (brandParam !== null) setSelectedBrand(brandParam);
  }, [searchParams]);

  // Handle filter changes
  const applyFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);

    if (key === 'category') setSelectedCategory(value);
    if (key === 'brand') setSelectedBrand(value);
  };

  // Get distinct brands from mock data
  const brandsList = useMemo(() => {
    const brands = (components || []).map(c => c.brand);
    return ['all', ...new Set(brands)];
  }, [components]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...(components || [])];

    // Search query
    if (query) {
      result = result.filter(
        c => c.name.toLowerCase().includes(query.toLowerCase()) ||
             c.brand.toLowerCase().includes(query.toLowerCase()) ||
             c.category.toLowerCase().includes(query.toLowerCase()) ||
             (c.description && c.description.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Category
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(c => c.category === selectedCategory);
    }

    // Brand
    if (selectedBrand && selectedBrand !== 'all') {
      result = result.filter(c => c.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    // Price range
    result = result.filter(c => c.price <= priceRange);

    // Sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [query, selectedCategory, selectedBrand, priceRange, sortOption]);

  // Paginated elements
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setIsLoading(true);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsLoading(false), 350); // Simulate page load transition
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Component Catalog</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredProducts.length} high-quality PC hardware options
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex w-full md:w-auto items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold rounded-xl"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          
          <div className="flex-1 md:flex-none relative min-w-[160px]">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-slate-800 dark:text-slate-100"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        
        {/* Sidebar Desktop Filters */}
        <aside className="hidden md:block w-64 flex-shrink-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-6">
          {/* Search Box */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-450">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Find parts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-3 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-primary text-slate-800 dark:text-slate-100"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-2 top-2.5 text-slate-450">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal pl-0.5">
              Searches name, brand, category, and full descriptions.
            </p>
          </div>

          {/* Category List */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-450">Category</h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => applyFilters('category', 'all')}
                className={`w-full text-left px-2 py-1 rounded-md text-xs font-semibold ${
                  selectedCategory === 'all'
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                All Categories
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => applyFilters('category', c.id)}
                  className={`w-full text-left px-2 py-1 rounded-md text-xs font-semibold truncate ${
                    selectedCategory === c.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Brands List */}
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-450">Brand</h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {brandsList.map((b) => (
                <button
                  key={b}
                  onClick={() => applyFilters('brand', b)}
                  className={`w-full text-left px-2 py-1 rounded-md text-xs font-semibold capitalize ${
                    selectedBrand.toLowerCase() === b.toLowerCase()
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {b === 'all' ? 'All Brands' : b}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-450">
              <span>Max Price</span>
              <span className="text-primary">${priceRange}</span>
            </div>
            <input
              type="range"
              min="20"
              max="1200"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </aside>

        {/* Product Cards Area */}
        <main className="flex-1">
          {isLoading || componentsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pg = idx + 1;
                    return (
                      <button
                        key={pg}
                        onClick={() => handlePageChange(pg)}
                        className={`w-10 h-10 rounded-xl border text-sm font-bold transition-colors ${
                          currentPage === pg
                            ? 'bg-primary border-primary text-white'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-750 dark:text-slate-300'
                        }`}
                      >
                        {pg}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <Cpu className="w-12 h-12 text-slate-350 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">No components match filters</h3>
              <p className="text-slate-450 dark:text-slate-400 text-sm mt-1 max-w-xs mx-auto">
                Try widening your search terms or adjusting the maximum price slider.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setPriceRange(1200);
                  setSearchParams({});
                }}
                className="mt-6 px-5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white rounded-xl text-sm font-semibold transition-all text-slate-700 dark:text-slate-200"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer (Filters overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm md:hidden">
          <div className="fixed inset-0" onClick={() => setSidebarOpen(false)} />
          
          <div className="relative w-80 max-w-xs bg-white dark:bg-slate-800 h-full p-6 shadow-2xl overflow-y-auto flex flex-col gap-6 animate-slide-in">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-450">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find parts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2 pl-3 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-primary text-slate-800 dark:text-slate-100"
                />
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-555 leading-normal pl-0.5">
                Searches name, brand, category, and full descriptions.
              </p>
            </div>

            {/* Mobile Category List */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-450">Category</h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => { applyFilters('category', 'all'); setSidebarOpen(false); }}
                  className={`w-full text-left px-2 py-1.5 rounded-md text-xs font-semibold ${selectedCategory === 'all' ? 'bg-primary/10 text-primary' : ''}`}
                >
                  All Categories
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { applyFilters('category', c.id); setSidebarOpen(false); }}
                    className={`w-full text-left px-2 py-1.5 rounded-md text-xs font-semibold truncate ${selectedCategory === c.id ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Brands List */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-450">Brand</h3>
              <div className="space-y-1.5">
                {brandsList.map((b) => (
                  <button
                    key={b}
                    onClick={() => { applyFilters('brand', b); setSidebarOpen(false); }}
                    className={`w-full text-left px-2 py-1.5 rounded-md text-xs font-semibold capitalize ${selectedBrand.toLowerCase() === b.toLowerCase() ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    {b === 'all' ? 'All Brands' : b}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-450">
                <span>Max Price</span>
                <span className="text-primary">${priceRange}</span>
              </div>
              <input
                type="range"
                min="20"
                max="1200"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            <button
              onClick={() => setSidebarOpen(false)}
              className="mt-auto w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-semibold transition-colors shadow-lg"
            >
              Apply Filters
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
