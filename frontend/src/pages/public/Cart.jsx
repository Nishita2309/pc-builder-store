import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, Minus, Plus, Cpu } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import EmptyState from '../../components/EmptyState';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleCheckoutRedirect = () => {
    if (cartItems.length === 0) {
      showToast('Your shopping cart is currently empty.', 'warning');
      return;
    }
    navigate('/checkout');
  };

  const salesTax = cartTotal * 0.08; // 8% sales tax
  const shippingCost = cartTotal > 500 ? 0 : 15.00; // Free shipping over $500
  const grandTotal = cartTotal + salesTax + shippingCost;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Shopping Cart</h1>
        <p className="text-sm text-slate-500 mt-1">Review your selected components and finalize order shipping</p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-slate-805 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden p-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0"
                >
                  
                  {/* Thumbnail and title info */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl bg-slate-100 dark:bg-slate-900 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest block">{item.product.brand}</span>
                      <Link to={`/component/${item.product.id}`} className="font-bold text-sm text-slate-800 dark:text-slate-100 hover:text-primary hover:underline transition-colors block">
                        {item.product.name}
                      </Link>
                    </div>
                  </div>

                  {/* Quantity controls & Price info */}
                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-50 dark:border-slate-800">
                    <div className="flex items-center border border-slate-250 dark:border-slate-750 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-900">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-500"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3.5 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-500"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="font-black text-sm md:text-base text-slate-800 dark:text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        removeFromCart(item.product.id);
                        showToast(`Removed ${item.product.name} from cart.`, 'info');
                      }}
                      className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            <div className="flex justify-between items-center px-6">
              <button
                onClick={() => {
                  clearCart();
                  showToast('Shopping cart cleared.', 'info');
                }}
                className="text-xs font-bold text-slate-400 hover:text-red-500 hover:underline"
              >
                Clear Cart
              </button>
              <Link to="/catalog" className="text-xs font-bold text-primary hover:underline">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Pricing totals summary card */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 space-y-6">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-450">Order Summary</h3>
            
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between font-medium">
                <span className="text-slate-450">Subtotal</span>
                <span className="text-slate-800 dark:text-slate-100 font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-450">Estimated Tax (8%)</span>
                <span className="text-slate-800 dark:text-slate-100 font-bold">${salesTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-slate-450">Shipping Courier</span>
                <span className="text-slate-800 dark:text-slate-100 font-bold">
                  {shippingCost === 0 ? <span className="text-emerald-500 font-extrabold uppercase">Free</span> : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <hr className="border-slate-150 dark:border-slate-700" />
              <div className="flex justify-between items-end">
                <span className="text-slate-450 font-medium">Total Cost</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-slate-905 dark:text-white">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckoutRedirect}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 flex items-center justify-center gap-1.5"
            >
              Proceed to Shipping
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        <div className="max-w-md mx-auto py-12">
          <EmptyState
            icon={ShoppingCart}
            title="Your Shopping Cart is Empty"
            message="Looks like you haven't added any components or custom rigs to your shopping cart yet."
            actionText="Go Shop PC Components"
            actionLink="/catalog"
          />
        </div>
      )}

    </div>
  );
}
