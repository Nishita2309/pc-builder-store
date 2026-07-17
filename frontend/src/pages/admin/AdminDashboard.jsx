import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, LayoutDashboard, Users, Cpu, Layers, Tag, Database, ShoppingCart, BarChart3,
  TrendingUp, Activity, Plus, Edit2, Trash2, ArrowUpRight, Check, X, ShieldAlert
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { COMPONENTS, CATEGORIES, BRANDS, MOCK_ORDERS, MOCK_USERS, ADMIN_STATS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');

  // CRUD & Interactive states
  const [componentsList, setComponentsList] = useState(COMPONENTS);
  const [usersList, setUsersList] = useState(MOCK_USERS);
  const [ordersList, setOrdersList] = useState(MOCK_ORDERS);
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [brandsList, setBrandsList] = useState(BRANDS);

  // Modal forms states
  const [editingItem, setEditingItem] = useState(null);
  const [crudModalOpen, setCrudModalOpen] = useState(false);
  const [crudType, setCrudType] = useState(''); // 'component', 'user', 'category', 'brand'

  // Component form inputs
  const [compName, setCompName] = useState('');
  const [compBrand, setCompBrand] = useState('');
  const [compPrice, setCompPrice] = useState(99);
  const [compCategory, setCompCategory] = useState('cpu');
  const [compStock, setCompStock] = useState(true);

  // User form inputs
  const [usrName, setUsrName] = useState('');
  const [usrEmail, setUsrEmail] = useState('');
  const [usrRole, setUsrRole] = useState('customer');

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  // CRUD actions: Components
  const openComponentModal = (item = null) => {
    setEditingItem(item);
    setCrudType('component');
    if (item) {
      setCompName(item.name);
      setCompBrand(item.brand);
      setCompPrice(item.price);
      setCompCategory(item.category);
      setCompStock(item.inStock);
    } else {
      setCompName('');
      setCompBrand('');
      setCompPrice(99);
      setCompCategory('cpu');
      setCompStock(true);
    }
    setCrudModalOpen(true);
  };

  const handleSaveComponent = (e) => {
    e.preventDefault();
    if (!compName || !compBrand) {
      showToast('Please fill out component name and brand details.', 'warning');
      return;
    }

    if (editingItem) {
      // Edit
      setComponentsList(prev => prev.map(c =>
        c.id === editingItem.id ? { ...c, name: compName, brand: compBrand, price: Number(compPrice), category: compCategory, inStock: compStock } : c
      ));
      showToast('Component updated successfully!', 'success');
    } else {
      // Create new component
      const newComp = {
        id: `comp-${Date.now()}`,
        name: compName,
        brand: compBrand,
        price: Number(compPrice),
        category: compCategory,
        rating: 5.0,
        inStock: compStock,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&auto=format&fit=crop&q=80',
        description: 'New custom component added from admin control workspace panel details.',
        specs: {},
        reviews: []
      };
      setComponentsList(prev => [newComp, ...prev]);
      showToast('New component created!', 'success');
    }
    setCrudModalOpen(false);
  };

  const handleDeleteComponent = (id) => {
    setComponentsList(prev => prev.filter(c => c.id !== id));
    showToast('Component removed from database records.', 'info');
  };

  // CRUD actions: Users
  const openUserModal = (item = null) => {
    setEditingItem(item);
    setCrudType('user');
    if (item) {
      setUsrName(item.name);
      setUsrEmail(item.email);
      setUsrRole(item.role);
    } else {
      setUsrName('');
      setUsrEmail('');
      setUsrRole('customer');
    }
    setCrudModalOpen(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!usrName || !usrEmail) {
      showToast('Please fill out user name and email Address details.', 'warning');
      return;
    }

    if (editingItem) {
      setUsersList(prev => prev.map(u =>
        u.id === editingItem.id ? { ...u, name: usrName, email: usrEmail, role: usrRole } : u
      ));
      showToast('User record updated.', 'success');
    } else {
      const newUser = {
        id: `USR-${Math.floor(Math.random() * 800) + 200}`,
        name: usrName,
        email: usrEmail,
        role: usrRole,
        joined: new Date().toISOString().split('T')[0]
      };
      setUsersList(prev => [...prev, newUser]);
      showToast('New user account registered.', 'success');
    }
    setCrudModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsersList(prev => prev.filter(u => u.id !== id));
    showToast('User account deleted.', 'info');
  };

  // Manage Order status changes
  const handleOrderStatusChange = (ordId, nextStatus) => {
    setOrdersList(prev => prev.map(o => {
      if (o.id === ordId) {
        const nextTimeline = o.timeline.map(step => {
          if (step.status === nextStatus) return { ...step, completed: true, date: new Date().toLocaleDateString() };
          return step;
        });
        return { ...o, status: nextStatus, timeline: nextTimeline };
      }
      return o;
    }));
    showToast(`Order ${ordId} status set to ${nextStatus}.`, 'success');
  };

  // Check admin authorization
  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <div className="p-4 bg-rose-500/10 text-rose-500 rounded-full w-fit mx-auto">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <h2 className="text-xl font-bold">Unauthorized Session</h2>
        <p className="text-sm text-slate-500">Only Administrator accounts can inspect store inventory tables, metrics, and orders.</p>
        <button onClick={() => navigate('/login')} className="px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-xl">
          Log In as Admin
        </button>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'components', label: 'Components', icon: Cpu },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'brands', label: 'Brands Partners', icon: Tag },
    { id: 'inventory', label: 'Inventory Specs', icon: Database },
    { id: 'orders', label: 'Manage Orders', icon: ShoppingCart },
    { id: 'statistics', label: 'Statistics', icon: BarChart3 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar navigation */}
      <aside className="w-full lg:w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 h-fit flex flex-col gap-5">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-150 dark:border-slate-700 text-primary font-extrabold text-sm tracking-wider">
          <Shield className="w-5 h-5 text-purple-500" />
          <span>ADMIN CONSOLE</span>
        </div>

        <div className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-left transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/15'
                    : 'text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main panel displays */}
      <main className="flex-1 min-w-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-8 shadow-sm">
        
        {/* --- DASHBOARD TAB --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-slide-in">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Admin Console Dashboard</h2>
              <p className="text-xs text-slate-450 mt-0.5">Quick summary metrics for today's orders & operations</p>
            </div>

            {/* Metrics grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Revenue', value: `$${ADMIN_STATS.totalSales.toLocaleString()}`, trend: ADMIN_STATS.salesGrowth, color: 'text-primary' },
                { title: 'Active Accounts', value: ADMIN_STATS.activeUsers, trend: ADMIN_STATS.userGrowth, color: 'text-purple-500' },
                { title: 'Completed Orders', value: ADMIN_STATS.totalOrders, trend: ADMIN_STATS.orderGrowth, color: 'text-emerald-500' },
                { title: 'Stock Fill Rate', value: ADMIN_STATS.inventoryStatus, trend: 'Optimal', color: 'text-amber-500' }
              ].map((card, i) => (
                <div key={i} className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-750 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-450 block">{card.title}</span>
                  <span className={`text-xl font-black block mt-2 ${card.color}`}>{card.value}</span>
                  <span className="text-[10px] text-slate-400 mt-1 block font-semibold">{card.trend}</span>
                </div>
              ))}
            </div>

            {/* Quick Chart overview */}
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-455 border-b border-slate-100 dark:border-slate-700 pb-2 flex items-center gap-1.5">
                <TrendingUp className="w-4.5 h-4.5 text-primary" /> Monthly Revenue Trend
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ADMIN_STATS.salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#64748B" fontSize={10} />
                    <YAxis stroke="#64748B" fontSize={10} />
                    <Tooltip contentStyle={{ background: '#1E293B', borderColor: '#334155', borderRadius: '12px', fontSize: '11px', color: '#fff' }} />
                    <Area type="monotone" dataKey="Sales" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* --- USERS TAB --- */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-slide-in">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Manage Customers</h2>
                <p className="text-xs text-slate-455 mt-0.5">Control registered accounts and clearance roles</p>
              </div>
              <button
                onClick={() => openUserModal()}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1"
              >
                <Plus className="w-4.5 h-4.5" /> Register Account
              </button>
            </div>

            <div className="border border-slate-150 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 dark:border-slate-700 bg-slate-50 dark:bg-slate-805/40 font-bold text-slate-450 uppercase">
                      <th className="px-6 py-4">User ID</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Joined Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 dark:divide-slate-700 font-semibold">
                    {usersList.map((usr) => (
                      <tr key={usr.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                        <td className="px-6 py-4 font-mono text-slate-500">{usr.id}</td>
                        <td className="px-6 py-4 text-slate-900 dark:text-slate-150">{usr.name}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-350">{usr.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border ${
                            usr.role === 'admin'
                              ? 'bg-purple-500/10 border-purple-500/20 text-purple-500'
                              : 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                          }`}>
                            {usr.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400">{usr.joined}</td>
                        <td className="px-6 py-4 text-right flex justify-end gap-1.5">
                          <button
                            onClick={() => openUserModal(usr)}
                            className="p-1.5 text-slate-400 hover:text-primary rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(usr.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- COMPONENTS TAB --- */}
        {activeTab === 'components' && (
          <div className="space-y-6 animate-slide-in">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Hardware catalog Components</h2>
                <p className="text-xs text-slate-455 mt-0.5">CRUD database operations for store components</p>
              </div>
              <button
                onClick={() => openComponentModal()}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1"
              >
                <Plus className="w-4.5 h-4.5" /> Add Component
              </button>
            </div>

            <div className="border border-slate-150 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 dark:border-slate-700 bg-slate-50 dark:bg-slate-805/40 font-bold text-slate-450 uppercase">
                      <th className="px-6 py-4">Component name</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Brand</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 dark:divide-slate-700 font-semibold">
                    {componentsList.slice(0, 10).map((comp) => (
                      <tr key={comp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                        <td className="px-6 py-4 text-slate-850 dark:text-slate-100 max-w-[200px] truncate">{comp.name}</td>
                        <td className="px-6 py-4 capitalize text-slate-500">{comp.category}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-350">{comp.brand}</td>
                        <td className="px-6 py-4 text-slate-800 dark:text-slate-205">${comp.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            comp.inStock ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                          }`}>
                            {comp.inStock ? 'In Stock' : 'Out'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-1.5">
                          <button
                            onClick={() => openComponentModal(comp)}
                            className="p-1.5 text-slate-400 hover:text-primary rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteComponent(comp.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- CATEGORIES TAB --- */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-slide-in">
            <h2 className="text-xl font-bold tracking-tight">Store Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoriesList.map((cat) => (
                <div key={cat.id} className="p-5 border border-slate-150 dark:border-slate-700 rounded-2xl flex gap-4 bg-slate-50/50 dark:bg-slate-900/10 items-start">
                  <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white capitalize">{cat.name}</h3>
                    <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- BRANDS TAB --- */}
        {activeTab === 'brands' && (
          <div className="space-y-6 animate-slide-in">
            <h2 className="text-xl font-bold tracking-tight">Brand Partnerships</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brandsList.map((brand) => (
                <div key={brand.id} className="p-4 border border-slate-150 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/10 text-center font-bold text-slate-450 dark:text-slate-350 select-none">
                  <span className="uppercase text-sm tracking-wider">{brand.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- INVENTORY TAB --- */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-slide-in">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Store Inventory Clearance</h2>
              <p className="text-xs text-slate-455 mt-0.5">Toggle stock status or check specs quantities</p>
            </div>

            <div className="border border-slate-150 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-805">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 dark:border-slate-700 bg-slate-50 dark:bg-slate-805/40 font-bold text-slate-450 uppercase">
                      <th className="px-6 py-4">Item Name</th>
                      <th className="px-6 py-4">Brand</th>
                      <th className="px-6 py-4">In Stock Status</th>
                      <th className="px-6 py-4 text-right">Toggle Availability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 dark:divide-slate-700 font-semibold">
                    {componentsList.slice(0, 10).map((comp) => (
                      <tr key={comp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                        <td className="px-6 py-4 text-slate-850 dark:text-slate-100 max-w-[250px] truncate">{comp.name}</td>
                        <td className="px-6 py-4 text-slate-500 uppercase">{comp.brand}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            comp.inStock ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                          }`}>
                            {comp.inStock ? 'Available' : 'Sold Out'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              setComponentsList(prev => prev.map(c => c.id === comp.id ? { ...c, inStock: !c.inStock } : c));
                              showToast(`Toggled stock for ${comp.brand} item.`, 'info');
                            }}
                            className={`px-3 py-1.5 text-[10px] font-bold rounded-lg ${
                              comp.inStock 
                                ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                                : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            }`}
                          >
                            {comp.inStock ? 'Set Sold Out' : 'Set Available'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-slide-in">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Manage Purchase Orders</h2>
              <p className="text-xs text-slate-455 mt-0.5">Inspect tracking timelines or adjust status indicators</p>
            </div>

            <div className="border border-slate-150 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-805">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 dark:border-slate-700 bg-slate-50 dark:bg-slate-805/40 font-bold text-slate-450 uppercase">
                      <th className="px-6 py-4">Order Code</th>
                      <th className="px-6 py-4">Grand Total</th>
                      <th className="px-6 py-4">Delivery Status</th>
                      <th className="px-6 py-4 text-right">Operation Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 dark:divide-slate-700 font-semibold">
                    {ordersList.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-slate-850 dark:text-white">{ord.id}</td>
                        <td className="px-6 py-4 text-slate-800 dark:text-slate-205 font-bold">${ord.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                              : 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <select
                            value={ord.status}
                            onChange={(e) => handleOrderStatusChange(ord.id, e.target.value)}
                            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 text-xs text-slate-700 dark:text-slate-300"
                          >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Processed & Packed">Processed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- STATISTICS TAB --- */}
        {activeTab === 'statistics' && (
          <div className="space-y-8 animate-slide-in">
            <h2 className="text-xl font-bold tracking-tight">Full Business Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Sales line graph */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-750 p-6 rounded-2xl space-y-4">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-455">Monthly Gross Sales</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ADMIN_STATS.salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                      <XAxis dataKey="name" stroke="#64748B" fontSize={10} />
                      <YAxis stroke="#64748B" fontSize={10} />
                      <Tooltip />
                      <Area type="monotone" dataKey="Sales" stroke="#8B5CF6" strokeWidth={2} fill="#8B5CF6" fillOpacity={0.15} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category pie chart */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-750 p-6 rounded-2xl space-y-4">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-455">Sales by Component Category</h3>
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ADMIN_STATS.categoryStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ADMIN_STATS.categoryStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Legend */}
                  <div className="flex flex-col gap-2 pr-6">
                    {ADMIN_STATS.categoryStats.map((entry, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                        <span className="text-slate-500">{entry.name} ({entry.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* CRUD dialog modals */}
      <Modal
        isOpen={crudModalOpen}
        onClose={() => setCrudModalOpen(false)}
        title={editingItem ? `Edit ${crudType.toUpperCase()}` : `Create ${crudType.toUpperCase()}`}
      >
        {crudType === 'component' && (
          <form onSubmit={handleSaveComponent} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-450 dark:text-slate-505 uppercase">Component Name</label>
              <input
                type="text"
                required
                value={compName}
                onChange={(e) => setCompName(e.target.value)}
                placeholder="e.g. NVIDIA RTX 5090 Super Founders"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-450 dark:text-slate-505 uppercase">Brand</label>
                <input
                  type="text"
                  required
                  value={compBrand}
                  onChange={(e) => setCompBrand(e.target.value)}
                  placeholder="e.g. ASUS, MSI, Corsair"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-455 dark:text-slate-505 uppercase">Price ($)</label>
                <input
                  type="number"
                  required
                  value={compPrice}
                  onChange={(e) => setCompPrice(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-455 dark:text-slate-505 uppercase">Category Slot</label>
                <select
                  value={compCategory}
                  onChange={(e) => setCompCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-700 dark:text-slate-300"
                >
                  <option value="cpu">CPU</option>
                  <option value="gpu">GPU</option>
                  <option value="motherboard">Motherboard</option>
                  <option value="ram">RAM</option>
                  <option value="storage">Storage</option>
                  <option value="psu">PSU</option>
                  <option value="cooler">Cooler</option>
                  <option value="case">Case</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-455 dark:text-slate-505 uppercase">Stock Status</label>
                <select
                  value={compStock ? 'in' : 'out'}
                  onChange={(e) => setCompStock(e.target.value === 'in')}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-700 dark:text-slate-300"
                >
                  <option value="in">Available (In Stock)</option>
                  <option value="out">Sold Out (Out of Stock)</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-md mt-4"
            >
              Save Component Records
            </button>
          </form>
        )}

        {crudType === 'user' && (
          <form onSubmit={handleSaveUser} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-450 dark:text-slate-505 uppercase">Account Name</label>
              <input
                type="text"
                required
                value={usrName}
                onChange={(e) => setUsrName(e.target.value)}
                placeholder="Sarah Connor"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-450 dark:text-slate-505 uppercase">Email Address</label>
              <input
                type="email"
                required
                value={usrEmail}
                onChange={(e) => setUsrEmail(e.target.value)}
                placeholder="sarah@example.com"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-455 dark:text-slate-555 uppercase">Clearance Role</label>
              <select
                value={usrRole}
                onChange={(e) => setUsrRole(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-700 dark:text-slate-300"
              >
                <option value="customer">Customer</option>
                <option value="admin">Administrator (Full Access)</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-md mt-4"
            >
              Save User Account Profile
            </button>
          </form>
        )}
      </Modal>

    </div>
  );
}
