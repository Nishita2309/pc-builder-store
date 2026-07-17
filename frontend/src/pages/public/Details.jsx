import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Cpu, Calendar, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { usePCBuilder } from '../../context/PCBuilderContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../../components/ProductCard';
import { DetailSkeleton } from '../../components/Skeletons';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addComponentToBuild, components, componentsLoading } = usePCBuilder();
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const product = useMemo(() => {
    if (!components) return null;
    return components.find((c) => c.id === id);
  }, [id, components]);

  useEffect(() => {
    if (!componentsLoading) {
      setIsLoading(false);
    }
  }, [componentsLoading, id]);

  const relatedProducts = useMemo(() => {
    if (!product || !components) return [];
    return components.filter(
      (c) => c.category === product.category && c.id !== product.id
    ).slice(0, 4);
  }, [product, components]);

  if (!product && !isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Component Not Found</h2>
        <p className="text-slate-500 mt-2">The PC hardware option you specified does not exist in our catalog.</p>
        <Link to="/catalog" className="mt-6 inline-block px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`Added ${product.name} to your shopping cart!`, 'success');
  };

  const handleAddToBuild = () => {
    addComponentToBuild(product.category, product);
    showToast(`Added ${product.name} as your build's ${product.category.toUpperCase()}!`, 'success');
    navigate('/builder');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      showToast('Please fill out all review fields.', 'error');
      return;
    }
    // Simulate reviews update
    product.reviews = [
      ...product.reviews,
      { user: reviewName, rating: Number(reviewRating), comment: reviewComment }
    ];
    setReviewName('');
    setReviewComment('');
    showToast('Thank you! Your feedback has been recorded.', 'success');
  };

  const isFavorite = isInWishlist(product?.id);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DetailSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-450 dark:text-slate-400">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/catalog" className="hover:text-primary">Catalog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/catalog?category=${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-slate-200 truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left Image View */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden p-8 shadow-sm">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {!product.inStock && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white font-bold text-xs px-3 py-1.5 rounded-full">
                OUT OF STOCK
              </span>
            )}
          </div>
        </div>

        {/* Right Product Buy Information */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-primary uppercase tracking-widest">{product.brand}</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-350 dark:text-slate-650'
                    }`}
                  />
                ))}
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-400">{product.reviews.length} Customer Reviews</span>
            </div>
          </div>

          <div className="p-5 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Retail Price</span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
            </div>
            
            <div className="text-right">
              <span className="text-xs text-slate-450 block">Availability</span>
              <span className={`text-sm font-bold ${product.inStock ? 'text-emerald-500' : 'text-rose-500'}`}>
                {product.inStock ? 'In Stock (Ships Tomorrow)' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-550 dark:text-slate-400 leading-relaxed">
            {product.description}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-4 py-4">
            {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
              <div key={key} className="p-3 border border-slate-150 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/40">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">{key}</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate block mt-0.5">{Array.isArray(val) ? val.join(', ') : val}</span>
              </div>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            
            {/* PC Builder Slot insertion */}
            <button
              onClick={handleAddToBuild}
              className="flex-1 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-750 hover:to-indigo-750 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              Add to PC Build
            </button>

            {/* Add to Cart */}
            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Shopping Cart
              </button>
            ) : (
              <button
                disabled
                className="flex-1 py-3.5 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-xl text-sm font-bold cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Out of Stock
              </button>
            )}

            {/* Favorite toggle */}
            <button
              onClick={() => {
                toggleWishlist(product);
                showToast(isFavorite ? 'Removed from wishlist' : 'Added to wishlist', 'info');
              }}
              className={`p-3.5 border rounded-xl shadow-sm transition-colors ${
                isFavorite
                  ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900 text-rose-500'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-rose-500'
              }`}
              title="Add to Wishlist"
            >
              <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>

          </div>

          <div className="flex gap-6 text-xs text-slate-450 dark:text-slate-400 pt-2">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /> 3-Year Brand Warranty</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Hassle-Free 30-Day Returns</span>
          </div>

        </div>

      </div>

      {/* Tabs description / specifications / reviews */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          {['overview', 'specifications', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-bold text-sm border-b-2 capitalize transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-150 dark:border-slate-700 leading-relaxed text-sm text-slate-650 dark:text-slate-300 space-y-4">
            <h3 className="font-extrabold text-base text-slate-850 dark:text-white">Product Overview</h3>
            <p>{product.description}</p>
            <p>
              Engineered for extreme reliability under intense multi-threaded processing loads, this product features robust architectural specs and dynamic voltage management systems to maintain structural integrity and system thermal properties.
            </p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-150 dark:border-slate-700 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([key, value], idx) => (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-800/20' : ''}>
                    <td className="px-6 py-4 font-bold text-slate-450 dark:text-slate-500 capitalize w-1/3">{key}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-semibold">{Array.isArray(value) ? value.join(', ') : value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reviews list */}
            <div className="lg:col-span-2 space-y-4">
              {product.reviews.length > 0 ? (
                product.reviews.map((rev, idx) => (
                  <div key={idx} className="p-5 bg-white dark:bg-slate-800/40 border border-slate-150 dark:border-slate-700 rounded-2xl">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white">{rev.user}</h4>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> Verified Purchase</span>
                    </div>
                    <p className="text-sm text-slate-550 dark:text-slate-400 mt-3 font-medium leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400">
                  No reviews left yet for this hardware component. Be the first to share your experience!
                </div>
              )}
            </div>

            {/* Write a review form */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 h-fit">
              <h3 className="font-extrabold text-base text-slate-850 dark:text-white mb-4">Add Your Review</h3>
              
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase">Name</label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Enter your nickname..."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase">Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="5">5 Stars (Excellent)</option>
                    <option value="4">4 Stars (Good)</option>
                    <option value="3">3 Stars (Average)</option>
                    <option value="2">2 Stars (Poor)</option>
                    <option value="1">1 Star (Terrible)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase">Review Details</label>
                  <textarea
                    rows={4}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="What did you like or dislike about this product?"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-850 dark:text-white">Related Components</h2>
            <p className="text-xs text-slate-400 mt-1">Check out similar configurations in the same category slot</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
