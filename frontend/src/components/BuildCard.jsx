import React from 'react';
import { Calendar, Layers, ArrowUpRight, Trash2, ShieldAlert } from 'lucide-react';
import { usePCBuilder } from '../context/PCBuilderContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export default function BuildCard({ build, onDelete }) {
  const { addComponentToBuild, clearBuild } = usePCBuilder();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLoadBuild = () => {
    clearBuild();
    Object.entries(build.parts).forEach(([slotKey, component]) => {
      if (component) {
        addComponentToBuild(slotKey, component);
      }
    });
    showToast(`Loaded "${build.name}" into PC Builder!`, 'success');
    navigate('/builder');
  };

  const partCount = Object.values(build.parts).filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg line-clamp-1">{build.name}</h3>
          <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {build.date}</span>
            <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> {partCount} Components</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(build.id)}
          className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Delete Build"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Mini summary list */}
      <div className="space-y-2 mb-5">
        {Object.entries(build.parts).slice(0, 3).map(([key, part]) => {
          if (!part) return null;
          return (
            <div key={key} className="flex justify-between text-xs">
              <span className="text-slate-400 uppercase font-semibold text-[10px] w-12">{key}</span>
              <span className="text-slate-700 dark:text-slate-300 truncate flex-1 text-right">{part.name}</span>
            </div>
          );
        })}
        {partCount > 3 && (
          <p className="text-xs text-primary font-semibold text-right">+ {partCount - 3} more parts</p>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-150 dark:border-slate-700">
        <div>
          <span className="text-xs text-slate-400 block">Est. Cost</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">${build.totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleLoadBuild}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-primary hover:bg-primary-dark text-white shadow-md shadow-blue-500/10 transition-colors"
          >
            Edit Build
          </button>
          <button
            onClick={() => navigate(`/builder/details/${build.id}`, { state: { build } })}
            className="p-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            title="View Details"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
