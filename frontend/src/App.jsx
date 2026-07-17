import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { PCBuilderProvider } from './context/PCBuilderContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/public/Home';
import Catalog from './pages/public/Catalog';
import Details from './pages/public/Details';
import Search from './pages/public/Search';
import Categories from './pages/public/Categories';
import Brands from './pages/public/Brands';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import WishlistPage from './pages/public/WishlistPage';
import Cart from './pages/public/Cart';
import Checkout from './pages/public/Checkout';
import OrderSuccess from './pages/public/OrderSuccess';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// PC Builder Pages
import PCBuilderDashboard from './pages/builder/PCBuilderDashboard';
import ComponentSelection from './pages/builder/ComponentSelection';
import BuildSummary from './pages/builder/BuildSummary';
import BuildDetails from './pages/builder/BuildDetails';

// Customer / Admin Dashboards
import DashboardOverview from './pages/customer/DashboardOverview';
import OrderDetail from './pages/customer/OrderDetail';
import AdminDashboard from './pages/admin/AdminDashboard';

// Error Pages
import NotFound from './pages/errors/NotFound';

// Let's use BrowserRouter. Or HashRouter to support static server page routing easily.
// HashRouter is extremely resilient to page reloads on static previews.
const Router = HashRouter;

function LayoutShell({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-250">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <PCBuilderProvider>
                <Router>
                  <LayoutShell>
                    <Routes>
                      {/* Public routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/catalog" element={<Catalog />} />
                      <Route path="/component/:id" element={<Details />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/brands" element={<Brands />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      
                      {/* Cart & Purchase */}
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-success" element={<OrderSuccess />} />
                      <Route path="/orders/:id" element={<OrderDetail />} />

                      {/* Auth UI */}
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />

                      {/* PC Builder dashboard */}
                      <Route path="/builder" element={<PCBuilderDashboard />} />
                      <Route path="/builder/select/:partType" element={<ComponentSelection />} />
                      <Route path="/builder/summary" element={<BuildSummary />} />
                      <Route path="/builder/details/:id" element={<BuildDetails />} />

                      {/* Dashboards */}
                      <Route path="/dashboard" element={<DashboardOverview />} />
                      <Route path="/admin" element={<AdminDashboard />} />

                      {/* Fallback */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </LayoutShell>
                </Router>
              </PCBuilderProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
