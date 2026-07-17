import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Cpu, AlertTriangle } from 'lucide-react';
import { usePCBuilder } from '../../context/PCBuilderContext';
import ProductCard from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/Skeletons';

export default function Search() {
  const { components, componentsLoading } = usePCBuilder();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (!componentsLoading) {
      setIsLoading(false);
    }
  }, [componentsLoading, query]);

  const results = useMemo(() => {
    if (!query.trim() || !components) return [];
    return components.filter(
      c => c.name.toLowerCase().includes(query.toLowerCase()) ||
           c.brand.toLowerCase().includes(query.toLowerCase()) ||
           c.category.toLowerCase().includes(query.toLowerCase()) ||
           (c.description && c.description.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, components]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-extrabold uppercase text-primary tracking-widest">Search Results</span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-1">
          {query ? `Results for "${query}"` : 'Search Component Catalog'}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {isLoading ? 'Searching database...' : `Found ${results.length} matching hardware options`}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto space-y-4">
          <div className="p-4 bg-slate-100 dark:bg-slate-750 text-slate-400 dark:text-slate-500 rounded-full w-fit mx-auto">
            <AlertTriangle className="w-12 h-12" />
          </div>
          <h3 className="font-bold text-lg text-slate-850 dark:text-white">No items matched your query</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
            Verify spelling or try typing general category keywords like "GPU", "Ryzen", or "Corsair".
          </p>
          <Link
            to="/catalog"
            className="inline-block mt-4 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Browse Full Catalog
          </Link>
        </div>
      )}

    </div>
  );
}
