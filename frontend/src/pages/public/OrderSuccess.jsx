import React, { useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Truck, Calendar, Home, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const details = useMemo(() => {
    return location.state || {
      orderId: 'ORD-72941',
      shipping: { name: 'Manish Kumar', address: '123 Tech Lane', city: 'Austin', zip: '78701' },
      total: 1654.96
    };
  }, [location]);

  const timelineSteps = [
    { label: 'Order Placed', desc: 'Secure payment cleared', done: true, date: 'Today, 11:45 AM' },
    { label: 'Processing & Assembly', desc: 'Motherboard VRM clearance stress tests', done: true, date: 'In Progress' },
    { label: 'Shipped', desc: 'Tracking details issued', done: false, date: 'Expected: Tomorrow' },
    { label: 'Delivered', desc: 'Dispatched to location address', done: false, date: 'Expected: 3 Days' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Green Check Status */}
      <div className="text-center space-y-4">
        <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-full w-fit mx-auto animate-bounce">
          <CheckCircle2 className="w-16 h-16" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Order Placed Successfully!</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Thank you for choosing Gearbox PC. Your build parts invoice and details are recorded below.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-805 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 space-y-8">
        
        {/* Code info block */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-slate-150 dark:border-slate-700 pb-6 text-xs font-semibold">
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Order ID</span>
            <span className="text-slate-805 dark:text-white font-bold text-sm block mt-1">{details.orderId}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Shipping Receiver</span>
            <span className="text-slate-805 dark:text-white font-bold block mt-1 truncate">{details.shipping.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Courier Status</span>
            <span className="text-emerald-555 font-bold block mt-1">Confirmed</span>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-bold text-[10px]">Grand Total</span>
            <span className="text-slate-805 dark:text-white font-bold text-sm block mt-1">${(details.total + details.total * 0.08).toFixed(2)}</span>
          </div>
        </div>

        {/* Timeline Progress Tracker */}
        <div className="space-y-6">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-450">Delivery Tracking Timeline</h3>
          
          <div className="relative border-l border-slate-200 dark:border-slate-700 ml-3.5 space-y-8 py-2">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative pl-8">
                
                {/* Bullet circle badge */}
                <span className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center border shadow-sm ${
                  step.done
                    ? 'bg-emerald-500 border-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                }`}>
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                </span>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5">
                  <div>
                    <h4 className={`text-sm font-bold ${step.done ? 'text-slate-850 dark:text-white' : 'text-slate-400'}`}>
                      {step.label}
                    </h4>
                    <p className="text-xs text-slate-450 dark:text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                    {step.date}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="flex gap-4">
        <Link
          to="/"
          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-805 dark:hover:bg-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Home className="w-4.5 h-4.5" /> Return Home
        </Link>
        
        <Link
          to="/dashboard"
          className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10 transition-colors"
        >
          Order History <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
