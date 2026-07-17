import React, { useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Cpu, Calendar, ShieldCheck, Heart, ShoppingCart } from 'lucide-react';
import { usePCBuilder } from '../../context/PCBuilderContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function BuildDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { savedBuilds, addComponentToBuild, clearBuild } = usePCBuilder();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const build = useMemo(() => {
    // Read from location state, or find by id in savedBuilds
    if (location.state?.build) return location.state.build;
    return savedBuilds.find(b => b.id === id);
  }, [id, savedBuilds, location]);

  if (!build) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Build Not Found</h2>
        <button onClick={() => navigate('/dashboard')} className="mt-6 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
          Return to Dashboard
        </button>
      </div>
    );
  }

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

  const handlePurchaseAll = () => {
    let count = 0;
    Object.values(build.parts).forEach((item) => {
      if (item) {
        addToCart(item);
        count++;
      }
    });
    if (count > 0) {
      showToast(`Added ${count} components to shopping cart!`, 'success');
      navigate('/cart');
    }
  };

  const parts = Object.entries(build.parts).filter(([_, val]) => Boolean(val));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{build.name}</h1>
          <div className="flex items-center gap-4 mt-1 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Saved: {build.date}</span>
            <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5" /> {parts.length} components</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 space-y-8">
        
        {/* Parts Table */}
        <div className="border border-slate-150 dark:border-slate-700 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-150 dark:border-slate-700 text-xs font-bold text-slate-450 uppercase bg-slate-50 dark:bg-slate-800/40">
                <th className="px-6 py-4">Slot</th>
                <th className="px-6 py-4">Component name</th>
                <th className="px-6 py-4 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-slate-150 dark:divide-slate-700">
              {parts.map(([key, part]) => (
                <tr key={key}>
                  <td className="px-6 py-4 font-bold text-slate-450 uppercase">{key}</td>
                  <td className="px-6 py-4 text-slate-700 dark:text-slate-205 font-semibold">{part.name}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-800 dark:text-white">${part.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 dark:bg-slate-800/20 font-bold border-t border-slate-150 dark:border-slate-700">
                <td colSpan="2" className="px-6 py-5 text-sm text-slate-500 text-right uppercase">Total Price</td>
                <td className="px-6 py-5 text-lg font-black text-right text-slate-900 dark:text-white">${build.totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Action triggers */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleLoadBuild}
            className="flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2"
          >
            Load into PC Builder
          </button>
          
          <button
            onClick={handlePurchaseAll}
            className="flex-1 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" /> Add All Parts to Cart
          </button>
        </div>

      </div>

    </div>
  );
}
