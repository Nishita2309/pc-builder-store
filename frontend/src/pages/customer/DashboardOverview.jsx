import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Layers, ShieldCheck, ShoppingBag, Heart, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePCBuilder } from '../../context/PCBuilderContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { MOCK_ORDERS } from '../../data/mockData';
import BuildCard from '../../components/BuildCard';
import ProductCard from '../../components/ProductCard';
import EmptyState from '../../components/EmptyState';

export default function DashboardOverview() {
  const { user, logout, updateProfile } = useAuth();
  const { savedBuilds, deleteBuild } = usePCBuilder();
  const { wishlistItems } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview');
  
  // Profile edit states
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');

  const orders = useMemo(() => {
    return MOCK_ORDERS;
  }, []);

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateProfile({ name: profileName, email: profileEmail });
    showToast('Customer profile parameters updated successfully!', 'success');
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out of session.', 'info');
    navigate('/login');
  };

  const sidebarLinks = [
    { id: 'overview', label: 'Dashboard Overview', icon: User },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'builds', label: 'Saved PC Builds', icon: Layers },
    { id: 'wishlist', label: 'My Wishlist', icon: Heart },
    { id: 'orders', label: 'Order History', icon: ShoppingBag }
  ];

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Access Restricted</h2>
        <p className="text-sm text-slate-500">Please sign in to view your dashboard console.</p>
        <button onClick={() => navigate('/login')} className="px-5 py-2 bg-primary text-white text-xs font-semibold rounded-lg">
          Go to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 h-fit space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-150 dark:border-slate-700">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-base">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white line-clamp-1">{user.name}</h3>
              <span className="text-[10px] text-slate-400 capitalize font-semibold">{user.role} Account</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-left transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </button>
              );
            })}

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors mt-4"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Right Dashboard Content */}
        <main className="flex-1 min-w-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-sm">
          
          {/* Active Tab rendering */}

          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight">Overview Dashboard</h2>
                <p className="text-xs text-slate-450">Quick metrics breakdown for your account logs</p>
              </div>

              {/* Metrics cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-750 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Joined Date</span>
                  <span className="text-base font-extrabold text-slate-800 dark:text-slate-100 block mt-1.5 flex items-center gap-1.5">
                    <Calendar className="w-4.5 h-4.5 text-primary" /> {user.joined}
                  </span>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-750 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Custom Rigs</span>
                  <span className="text-base font-extrabold text-slate-800 dark:text-slate-100 block mt-1.5 flex items-center gap-1.5">
                    <Layers className="w-4.5 h-4.5 text-purple-500" /> {savedBuilds.length} Saved Builds
                  </span>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-750 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 block uppercase">Total Purchases</span>
                  <span className="text-base font-extrabold text-slate-800 dark:text-slate-100 block mt-1.5 flex items-center gap-1.5">
                    <ShoppingBag className="w-4.5 h-4.5 text-emerald-500" /> {orders.length} Orders
                  </span>
                </div>
              </div>

              {/* Recent Saved Builds Preview */}
              <div className="space-y-4">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-450 border-b border-slate-100 dark:border-slate-700 pb-2">
                  Recent Saved PC Configs
                </h3>
                {savedBuilds.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedBuilds.slice(0, 2).map((build) => (
                      <BuildCard key={build.id} build={build} onDelete={deleteBuild} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No saved custom builds found. Try launching the PC Builder dashboard!</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight">Customer Profile Settings</h2>
                <p className="text-xs text-slate-450 font-semibold">Update contact names and delivery parameters</p>
              </div>

              <form onSubmit={handleProfileSave} className="space-y-4 max-w-md">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-455 dark:text-slate-500 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Save Profile Details
                </button>
              </form>
            </div>
          )}

          {activeTab === 'builds' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight">Saved Custom Rigs</h2>
                <p className="text-xs text-slate-455">Load configs back into the builder workspace</p>
              </div>

              {savedBuilds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedBuilds.map((build) => (
                    <BuildCard key={build.id} build={build} onDelete={deleteBuild} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Layers}
                  title="No Saved Builds"
                  message="Create and optimize PC configs with compatibility checking before recording them here."
                  actionText="Launch PC Builder Tool"
                  actionLink="/builder"
                />
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight">Saved Wishlist Parts</h2>
                <p className="text-xs text-slate-455">Quick actions to add desired hardware parts directly to cart</p>
              </div>

              {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {wishlistItems.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Heart}
                  title="Wishlist is Empty"
                  message="Save parts while shopping to follow pricing cuts and inventory status changes."
                  actionText="Browse Component Catalog"
                  actionLink="/catalog"
                />
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight">Order Purchase History</h2>
                <p className="text-xs text-slate-455 font-semibold">Track shipping status and assembly phases</p>
              </div>

              {orders.length > 0 ? (
                <div className="border border-slate-150 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-150 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 font-bold text-slate-400 uppercase">
                          <th className="px-6 py-4">Order ID</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Est. Cost</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 dark:divide-slate-700 font-semibold">
                        {orders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                            <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">{ord.id}</td>
                            <td className="px-6 py-4 text-slate-500">{ord.date}</td>
                            <td className="px-6 py-4 text-slate-800 dark:text-slate-200">${ord.total.toFixed(2)}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border ${
                                ord.status === 'Delivered'
                                  ? 'bg-emerald-500/10 border-emerald-550/20 text-emerald-500'
                                  : 'bg-blue-500/10 border-blue-550/20 text-blue-500'
                              }`}>
                                {ord.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => navigate(`/orders/${ord.id}`, { state: { order: ord } })}
                                className="inline-flex items-center gap-0.5 text-primary hover:underline"
                              >
                                Details <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <EmptyState
                  icon={ShoppingBag}
                  title="No Orders Placed"
                  message="You haven't checked out any orders. Select some parts and complete checkout simulator!"
                  actionText="Shop PC Hardware"
                  actionLink="/catalog"
                />
              )}
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
