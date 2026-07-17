import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    showToast(`Added ${product.name} to cart!`, 'success');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    if (isInWishlist(product.id)) {
      showToast(`Removed ${product.name} from wishlist.`, 'info');
    } else {
      showToast(`Added ${product.name} to wishlist!`, 'success');
    }
  };

  const isFavorite = isInWishlist(product.id);

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-350 flex flex-col h-full">
      {/* Wishlist trigger */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-4 right-4 z-10 p-2 rounded-full border shadow-sm transition-all duration-200 ${
          isFavorite
            ? 'bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-900 text-rose-500 hover:scale-105'
            : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 text-slate-450 hover:text-rose-500'
        }`}
      >
        <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      {/* Image container */}
      <Link to={`/component/${product.id}`} className="block overflow-hidden relative pt-[75%] bg-slate-100 dark:bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
            <span className="bg-rose-600 text-white font-semibold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Info details */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.brand}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{product.rating}</span>
          </div>
        </div>

        <Link to={`/component/${product.id}`} className="hover:text-primary transition-colors mb-2 block">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm md:text-base line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}


        {/* Technical spec tag preview */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {product.specs && Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
            <span key={key} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-md text-slate-655 dark:text-slate-350">
              <span className="capitalize">{key}</span>: {val}
            </span>
          ))}
        </div>

        {/* Purchase footer */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-slate-150 dark:border-slate-700">
          <div>
            <span className="text-xs text-slate-400 block">Price</span>
            <span className="font-bold text-lg text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
          </div>

          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-primary dark:hover:bg-primary hover:text-white transition-all text-slate-600 dark:text-slate-200"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          ) : (
            <button
              disabled
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/40 text-slate-300 dark:text-slate-600 cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
