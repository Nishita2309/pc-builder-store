import React, { useMemo } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle2, ShieldCheck, MapPin, CreditCard } from 'lucide-react';
import { MOCK_ORDERS } from '../../data/mockData';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const order = useMemo(() => {
    if (location.state?.order) return location.state.order;
    return MOCK_ORDERS.find(o => o.id === id);
  }, [id, location]);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Order Not Found</h2>
        <button onClick={() => navigate('/dashboard')} className="mt-6 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const tax = order.total * 0.08;
  const grandTotal = order.total + tax;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Order Details</h1>
          <p className="text-xs text-slate-455 mt-0.5">Order ID: <span className="font-mono font-bold">{order.id}</span> • Placed: {order.date}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Order items & Timeline tracking */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Timeline tracking panel */}
          <div className="bg-white dark:bg-slate-805 border border-slate-200 dark:border-slate-700 rounded-3xl p-6">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-450 mb-6">Delivery Tracking</h3>
            
            <div className="relative border-l border-slate-200 dark:border-slate-700 ml-3.5 space-y-6 py-2">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="relative pl-8">
                  <span className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center border shadow-sm ${
                    step.completed
                      ? 'bg-emerald-500 border-emerald-600 text-white'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                  }`}>
                    {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                  </span>
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <h4 className={`font-bold ${step.completed ? 'text-slate-850 dark:text-white' : 'text-slate-400'}`}>{step.status}</h4>
                      <p className="text-slate-450 text-[10px] mt-0.5">{step.completed ? 'Action completed' : 'Pending dispatch'}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items list */}
          <div className="bg-white dark:bg-slate-805 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 space-y-4">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-450 mb-2">Ordered Components</h3>
            
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-150">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{item.category} • Qty: {item.quantity}</p>
                  </div>
                  <span className="font-black text-sm text-slate-800 dark:text-white">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Shipping & Billing summaries */}
        <aside className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 space-y-4">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-450">Shipping Destination</h3>
            <div className="flex gap-3 text-xs">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-805 dark:text-slate-100">Receiver details:</p>
                <p className="text-slate-500 mt-1">{order.shippingAddress}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 space-y-4">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-455">Billing Details</h3>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-805 dark:text-slate-100">Payment type:</p>
                  <p className="text-slate-500 mt-0.5">{order.paymentMethod}</p>
                </div>
              </div>
              <hr className="border-slate-150 dark:border-slate-700" />
              <div className="space-y-2">
                <div className="flex justify-between text-slate-455 font-semibold">
                  <span>Parts Cost</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-455 font-semibold">
                  <span>Sales Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-455 font-semibold">
                  <span>Shipping Courier</span>
                  <span className="text-emerald-500 uppercase font-bold">Free</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold border-t border-slate-150 dark:border-slate-700 pt-2 text-slate-905 dark:text-white">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>

    </div>
  );
}
