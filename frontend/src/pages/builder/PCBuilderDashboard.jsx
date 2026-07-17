import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Cpu, Tv, Layers, Database, HardDrive, Zap, Wind, Box, Plus, Trash2, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePCBuilder } from '../../context/PCBuilderContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';

export default function PCBuilderDashboard() {
  const { build, compatibility, getBuildTotal, removeComponentFromBuild, clearBuild, saveBuild, isBuildComplete } = usePCBuilder();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [buildName, setBuildName] = useState('');

  const slots = [
    { key: 'cpu', label: 'CPU (Processor)', icon: Cpu, optional: false },
    { key: 'motherboard', label: 'Motherboard', icon: Layers, optional: false },
    { key: 'ram', label: 'Memory (RAM)', icon: Database, optional: false },
    { key: 'gpu', label: 'Graphics Card (GPU)', icon: Tv, optional: true },
    { key: 'storage', label: 'Storage (SSD/HDD)', icon: HardDrive, optional: false },
    { key: 'psu', label: 'Power Supply (PSU)', icon: Zap, optional: false },
    { key: 'cooler', label: 'CPU Cooler', icon: Wind, optional: true },
    { key: 'case', label: 'PC Case', icon: Box, optional: false }
  ];

  const handleSaveBuild = (e) => {
    e.preventDefault();
    if (!buildName.trim()) {
      showToast('Please enter a name for your custom build.', 'warning');
      return;
    }
    const saved = saveBuild(buildName);
    showToast(`Build "${saved.name}" has been recorded!`, 'success');
    setBuildName('');
    setSaveModalOpen(false);
  };

  const handleAddAllToCart = () => {
    let count = 0;
    Object.values(build).forEach((item) => {
      if (item) {
        addToCart(item);
        count++;
      }
    });
    if (count > 0) {
      showToast(`Added ${count} build components to your shopping cart!`, 'success');
      navigate('/cart');
    } else {
      showToast('Your custom build configuration is currently empty.', 'warning');
    }
  };

  const buildTotal = getBuildTotal();
  const activeWattage = compatibility.estimatedWattage;

  const statusColors = {
    compatible: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400',
    warning: 'bg-amber-50 dark:bg-amber-950/20 border-amber-250 dark:border-amber-900/50 text-amber-700 dark:text-amber-400',
    error: 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-450'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Interactive PC Builder</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Configure, optimize, and assemble your dream custom system with real-time specs checking
          </p>
        </div>

        <div className="flex gap-2.5 w-full md:w-auto">
          <button
            onClick={() => {
              clearBuild();
              showToast('PC build configuration has been reset.', 'info');
            }}
            className="flex-1 md:flex-none px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold rounded-xl text-slate-650 dark:text-slate-200"
          >
            Clear Configuration
          </button>
          
          <button
            onClick={() => setSaveModalOpen(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold rounded-xl"
          >
            Save Custom Rig
          </button>
        </div>
      </div>

      {/* Grid Summary and Compatibility Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Builder Rows (Col span 2) */}
        <div className="lg:col-span-2 space-y-4">
          {slots.map((slot) => {
            const part = build[slot.key];
            const Icon = slot.icon;

            return (
              <div
                key={slot.key}
                className={`bg-white dark:bg-slate-805 border rounded-2xl p-5 flex flex-col sm:flex-row items-center sm:justify-between gap-4 transition-all ${
                  part
                    ? 'border-slate-200 dark:border-slate-700 hover:shadow-sm'
                    : 'border-dashed border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary bg-slate-50/50 dark:bg-slate-800/10'
                }`}
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className={`p-3.5 rounded-xl ${part ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      {slot.label} {slot.optional && <span className="text-[8px] text-slate-450 normal-case">(Optional)</span>}
                    </span>
                    
                    {part ? (
                      <Link to={`/component/${part.id}`} className="font-bold text-sm md:text-base text-slate-850 dark:text-slate-105 hover:text-primary hover:underline transition-colors block mt-0.5">
                        {part.name}
                      </Link>
                    ) : (
                      <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 block mt-0.5">
                        No component selected
                      </span>
                    )}
                  </div>
                </div>

                {part ? (
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Cost</span>
                      <span className="font-bold text-slate-800 dark:text-white">${part.price.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/builder/select/${slot.key}`)}
                        className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        Change
                      </button>
                      <button
                        onClick={() => removeComponentFromBuild(slot.key)}
                        className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                        title="Remove Component"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate(`/builder/select/${slot.key}`)}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-lg bg-primary hover:bg-primary-dark text-white shadow-md shadow-blue-500/10 flex items-center justify-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Select Part
                  </button>
                )}

              </div>
            );
          })}
        </div>

        {/* Right Side: Configuration Summary Panels */}
        <div className="space-y-6">
          
          {/* Compatibility Checker Alert */}
          <div className={`border rounded-2xl p-5 space-y-4 ${statusColors[compatibility.status]}`}>
            <div className="flex items-center gap-2 font-bold text-sm md:text-base border-b border-current/10 pb-2">
              <ShieldAlert className="w-5 h-5" />
              Compatibility Check
            </div>
            
            <div className="space-y-2 text-xs leading-relaxed max-h-56 overflow-y-auto pr-1">
              {compatibility.messages.map((msg, i) => (
                <div key={i} className="flex gap-2 items-start font-medium">
                  <span>•</span>
                  <span>{msg.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Power specs summary */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 space-y-5">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-450">Build Summary</h3>
            
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between font-medium">
                <span className="text-slate-450">Estimated Load</span>
                <span className="text-slate-800 dark:text-slate-100 font-bold">{activeWattage}W</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-450">Active Parts</span>
                <span className="text-slate-800 dark:text-slate-100 font-bold">
                  {Object.values(build).filter(Boolean).length} / 8 slots
                </span>
              </div>
              <hr className="border-slate-150 dark:border-slate-700" />
              <div className="flex justify-between items-end">
                <span className="text-slate-450 font-medium">Total Cost</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">${buildTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Assemble check */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAddAllToCart}
                className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 flex items-center justify-center gap-1.5"
              >
                Add Build to Cart
              </button>
              
              <button
                onClick={() => navigate('/builder/summary')}
                className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl text-slate-750 dark:text-slate-200"
                title="View Full Summary"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {!isBuildComplete() && (
              <p className="text-[10px] text-slate-450 dark:text-slate-500 font-medium text-center">
                * Complete all required fields (CPU, Mobo, RAM, Storage, PSU, Case) to verify full boot support.
              </p>
            )}
          </div>

          {/* AI Optimizer recommendation banner */}
          <div className="p-5 bg-gradient-to-tr from-purple-900 to-indigo-900 text-white rounded-2xl space-y-3 relative overflow-hidden shadow-md">
            <Sparkles className="absolute -right-4 -bottom-4 w-20 h-20 text-purple-650/30" />
            <h4 className="font-bold text-sm flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-purple-300" /> Intelligent Optimizer</h4>
            <p className="text-xs text-purple-100 leading-relaxed font-medium">
              We recommend pairing your Intel Core i7 with an ASUS Z790 board to enable dual channel memory overclocks and high power clearances.
            </p>
          </div>

        </div>

      </div>

      {/* Save build dialog modal */}
      <Modal isOpen={saveModalOpen} onClose={() => setSaveModalOpen(false)} title="Save Custom Build">
        <form onSubmit={handleSaveBuild} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Build Name</label>
            <input
              type="text"
              required
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              placeholder="e.g. Dream Gaming Rig, Coding Workstation..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-md"
          >
            Save to Profile Dashboard
          </button>
        </form>
      </Modal>

    </div>
  );
}
