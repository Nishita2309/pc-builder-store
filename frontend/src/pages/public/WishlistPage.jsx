import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`Added ${product.name} to shopping cart!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Your Wishlist</h1>
        <p className="text-sm text-slate-500 mt-1">
          Keep track of parts you want to buy or add to your next rig build
        </p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              
              {/* Optional Quick Action Overlays */}
              <button
                onClick={() => {
                  removeFromWishlist(product.id);
                  showToast(`Removed ${product.name} from wishlist.`, 'info');
                }}
                className="absolute top-16 right-4 p-2 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto py-12">
          <EmptyState
            icon={Heart}
            title="Your Wishlist is Empty"
            message="You haven't saved any hardware components yet. Browse our catalog and click the heart icons to save items here!"
            actionText="Browse Hardware Catalog"
            actionLink="/catalog"
          />
        </div>
      )}

    </div>
  );
}
