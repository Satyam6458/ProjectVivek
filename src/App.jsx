import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminProtectedRoute } from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import HowToCookPage from './pages/HowToCookPage';
import CertificatesPage from './pages/CertificatesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ShippingPage from './pages/ShippingPage';
import StoresPage from './pages/StoresPage';

// Customer Auth Pages
import CustomerLoginPage from './pages/CustomerLoginPage';
import CustomerAccountPage from './pages/CustomerAccountPage';

// Admin Portal Pages (Modular Page Architecture)
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverviewPage from './pages/admin/AdminOverviewPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminStoresPage from './pages/admin/AdminStoresPage';
import AdminInquiriesPage from './pages/admin/AdminInquiriesPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSystemPage from './pages/admin/AdminSystemPage';

// Store Layout Wrapper with Navbar & Footer
const StoreLayout = () => (
  <div className="page-wrapper">
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Store & Customer Routes with Store Layout */}
            <Route element={<StoreLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/recipes" element={<HowToCookPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/stores" element={<StoresPage />} />

              {/* Customer Authentication & Dashboard */}
              <Route path="/login" element={<CustomerLoginPage />} />
              <Route path="/signup" element={<CustomerLoginPage />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <CustomerAccountPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Admin Portal (Modular Layout & Dedicated Pages) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<AdminOverviewPage />} />
              <Route path="dashboard" element={<AdminOverviewPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="stores" element={<AdminStoresPage />} />
              <Route path="inquiries" element={<AdminInquiriesPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="system" element={<AdminSystemPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
