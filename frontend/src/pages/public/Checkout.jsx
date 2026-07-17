import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [shippingInfo, setShippingInfo] = useState({ name: '', email: '', address: '', city: '', zip: '' });
  const [paymentInfo, setPaymentInfo] = useState({ cardNo: '', expiry: '', cvv: '' });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.address || !shippingInfo.city || !shippingInfo.zip) {
      showToast('Please complete all shipping address fields.', 'warning');
      return;
    }
    if (!paymentInfo.cardNo || !paymentInfo.expiry || !paymentInfo.cvv) {
      showToast('Please complete mock payment credit card fields.', 'warning');
      return;
    }

    // Success simulation
    const ordId = `ORD-${Math.floor(Math.random() * 80000) + 10000}`;
    
    // Clear items in cart
    clearCart();
    
    showToast('Mock Payment Approved! Your custom order has been initialized.', 'success');
    navigate('/order-success', { state: { orderId: ordId, shipping: shippingInfo, total: cartTotal } });
  };

  const salesTax = cartTotal * 0.08;
  const shippingCost = cartTotal > 500 ? 0 : 15.00;
  const grandTotal = cartTotal + salesTax + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Your Cart is Empty</h2>
        <p className="text-slate-500 mt-2">Add items to your cart before proceeding to checkout.</p>
        <Link to="/catalog" className="mt-6 inline-block px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <Link
          to="/cart"
          className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Checkout</h1>
          <p className="text-xs text-slate-450 mt-0.5">Secure payment authorization simulator</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Shipping Form & Card Form (Col span 2) */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-6">
          
          {/* Shipping Address Panel */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-450">Shipping Details</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Receiver Name</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    placeholder="e.g. sarah@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  placeholder="e.g. 456 Cyber Road"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">City</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    placeholder="e.g. San Francisco"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Postal/ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    placeholder="e.g. 94103"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Secure Payment Panel */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 space-y-4">
            <div className="flex justify-between items-center pb-2">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-450">Credit Card Information</h3>
              <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-extrabold uppercase bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <Lock className="w-3 h-3" /> Secure Simulator
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={paymentInfo.cardNo}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNo: e.target.value })}
                    placeholder="4111 2222 3333 4444"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                  <CreditCard className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-455 dark:text-slate-500 uppercase">Expiry Date</label>
                  <input
                    type="text"
                    required
                    value={paymentInfo.expiry}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                    placeholder="MM/YY"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-455 dark:text-slate-500 uppercase">CVV Code</label>
                  <input
                    type="text"
                    required
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                    placeholder="123"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/10 flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-5 h-5" /> Authorize Mock Purchase (${grandTotal.toFixed(2)})
          </button>

        </form>

        {/* Right order subtotal overview panel */}
        <aside className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-450">Review Items</h3>
          
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-700 last:border-0 pb-2">
                <div className="flex-1 pr-4">
                  <p className="font-bold text-slate-800 dark:text-slate-150 line-clamp-1">{item.product.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Quantity: {item.quantity}</p>
                </div>
                <span className="font-bold text-slate-800 dark:text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="border-slate-150 dark:border-slate-700" />

          <div className="space-y-2 text-xs font-semibold">
            <div className="flex justify-between text-slate-450">
              <span>Items Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-450">
              <span>Sales Tax</span>
              <span>${salesTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-450">
              <span>Shipping Fee</span>
              <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold border-t border-slate-150 dark:border-slate-700 pt-2 text-slate-900 dark:text-white">
              <span>Order Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </aside>

      </div>

    </div>
  );
}
