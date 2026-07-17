import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex flex-col h-full animate-pulse">
      <div className="w-full pt-[75%] bg-slate-200 dark:bg-slate-700 rounded-xl mb-4" />
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-2" />
      <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
      <div className="flex gap-2 mb-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
      </div>
      <div className="mt-auto pt-3 border-t border-slate-150 dark:border-slate-700 flex justify-between items-center">
        <div>
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-8 mb-1" />
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-16" />
        </div>
        <div className="w-9 h-9 bg-slate-200 dark:bg-slate-700 rounded-xl" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="w-full border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 p-4 animate-pulse">
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-6" />
      <div className="space-y-4">
        <div className="flex gap-4 border-b border-slate-250 dark:border-slate-700 pb-2">
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="h-4 bg-slate-205 dark:bg-slate-700 rounded flex-1" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 py-2 border-b border-slate-100 dark:border-slate-800">
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="h-4 bg-slate-150 dark:bg-slate-800 rounded flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 animate-pulse">
      <div className="pt-[100%] bg-slate-200 dark:bg-slate-700 rounded-2xl" />
      <div className="space-y-4">
        <div className="h-4 bg-slate-205 dark:bg-slate-700 rounded w-1/6" />
        <div className="h-8 bg-slate-205 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-4 bg-slate-205 dark:bg-slate-700 rounded w-1/4" />
        <hr className="border-slate-200 dark:border-slate-700" />
        <div className="h-6 bg-slate-205 dark:bg-slate-700 rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-205 dark:bg-slate-700 rounded w-full" />
          <div className="h-4 bg-slate-205 dark:bg-slate-700 rounded w-full" />
          <div className="h-4 bg-slate-205 dark:bg-slate-700 rounded w-2/3" />
        </div>
        <hr className="border-slate-200 dark:border-slate-700" />
        <div className="flex gap-4 pt-4">
          <div className="h-12 bg-slate-205 dark:bg-slate-700 rounded-xl w-1/2" />
          <div className="h-12 bg-slate-205 dark:bg-slate-700 rounded-xl w-1/2" />
        </div>
      </div>
    </div>
  );
}
