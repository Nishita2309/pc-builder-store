import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Share2, ShoppingCart, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { usePCBuilder } from '../../context/PCBuilderContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function BuildSummary() {
  const { build, compatibility, getBuildTotal } = usePCBuilder();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link to build summary copied to clipboard!', 'info');
  };

  const handlePurchaseAll = () => {
    let count = 0;
    Object.values(build).forEach((item) => {
      if (item) {
        addToCart(item);
        count++;
      }
    });
    if (count > 0) {
      showToast(`Added ${count} parts to shopping cart!`, 'success');
      navigate('/cart');
    }
  };

  const filledParts = Object.entries(build).filter(([_, val]) => Boolean(val));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:py-0">
      
      {/* Header toolbar */}
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-6 print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/builder')}
            className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Build Configuration Summary</h1>
            <p className="text-xs text-slate-450 mt-0.5">Review, print, or purchase your completed system parts</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Share Rig link"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={handlePrint}
            className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Print Specification Invoice"
          >
            <Printer className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Print container */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 space-y-8 print:border-none print:shadow-none">
        
        {/* Title logo info (for invoice layouts) */}
        <div className="flex justify-between items-start border-b border-slate-150 dark:border-slate-700 pb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-primary uppercase">GEARBOX PC Custom Rig</h2>
            <p className="text-xs text-slate-450 mt-1">Generated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Estimated TDP Load</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{compatibility.estimatedWattage}W</span>
          </div>
        </div>

        {/* Compatibility Overview */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
          <h3 className="font-extrabold text-sm mb-3 uppercase tracking-wider text-slate-450">Compatibility Diagnosis</h3>
          <div className="space-y-2 text-xs leading-relaxed">
            {compatibility.messages.map((msg, i) => (
              <div key={i} className="flex gap-2 items-center text-slate-650 dark:text-slate-350 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications listing */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-450">Parts List</h3>
          
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
                {filledParts.map(([key, part]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 font-bold text-slate-450 uppercase">{key}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-semibold">{part.name}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800 dark:text-white">${part.price.toFixed(2)}</td>
                  </tr>
                ))}
                {filledParts.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-slate-400 font-semibold">
                      Your current build configuration has no selected components.
                    </td>
                  </tr>
                )}
              </tbody>
              {filledParts.length > 0 && (
                <tfoot>
                  <tr className="bg-slate-50 dark:bg-slate-800/20 font-bold border-t border-slate-150 dark:border-slate-700">
                    <td colSpan="2" className="px-6 py-5 text-sm text-slate-500 text-right uppercase tracking-wider">Subtotal</td>
                    <td className="px-6 py-5 text-lg font-black text-right text-slate-900 dark:text-white">${getBuildTotal().toFixed(2)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>

      </div>

      {/* Cart submission controls (print hidden) */}
      {filledParts.length > 0 && (
        <div className="flex gap-4 print:hidden">
          <Link
            to="/builder"
            className="flex-1 py-3.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-sm font-bold transition-colors text-center"
          >
            Edit Configuration
          </Link>
          <button
            onClick={handlePurchaseAll}
            className="flex-1 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" /> Add All Parts to Cart
          </button>
        </div>
      )}

    </div>
  );
}
