import React, { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { logo2Img } from '../../data/siteData';
import './AdminDashboard.css';

// Page Title Mapping by Path
const ROUTE_TITLES = {
  '/admin': 'Dashboard Overview',
  '/admin/dashboard': 'Dashboard Overview',
  '/admin/products': 'Products Catalog',
  '/admin/stores': 'Retail Store Outlets',
  '/admin/inquiries': 'Customer Inquiries & Leads',
  '/admin/users': 'User & Access Control',
  '/admin/system': 'API Diagnostics & System Health',
};

// Grouped Sidebar Navigation Structure
const NAV_SECTIONS = [
  {
    title: 'MAIN OVERVIEW',
    items: [
      { to: '/admin', end: true, label: 'Dashboard Overview', icon: '📊' },
    ],
  },
  {
    title: 'COMMERCE & CATALOG',
    items: [
      { to: '/admin/products', label: 'Products Catalog', icon: '🌾' },
      { to: '/admin/stores', label: 'Retail Outlets', icon: '🏪' },
    ],
  },
  {
    title: 'CUSTOMERS & ACCESS',
    items: [
      { to: '/admin/inquiries', label: 'Customer Inquiries', icon: '📥' },
      { to: '/admin/users', label: 'Users & Admins', icon: '👥' },
    ],
  },
  {
    title: 'SYSTEM & TOOLS',
    items: [
      { to: '/admin/system', label: 'API Diagnostics', icon: '⚡' },
    ],
  },
  {
    title: 'EXTERNAL ACCESS',
    items: [
      { href: '/stores', label: 'Store Locator Map', icon: '🏬', isExternal: true },
      { href: '/', label: 'Public Website', icon: '🌐', isExternal: true },
    ],
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [healthInfo, setHealthInfo] = useState({
    status: 'Checking...',
    uptime: 0,
    loading: true,
  });

  // Global notification toast
  const [notification, setNotification] = useState(null);
  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchHealth = async () => {
    try {
      const data = await api.health.check();
      setHealthInfo({
        status: data.status || 'OK',
        uptime: data.uptime ? Math.round(data.uptime) : 0,
        loading: false,
      });
    } catch {
      setHealthInfo({ status: 'Offline / Syncing', uptime: 0, loading: false });
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Determine current page title from path
  const currentTitle = ROUTE_TITLES[location.pathname] || 'Dashboard';

  return (
    <div className="admin-shell">
      {/* Mobile Drawer Backdrop */}
      {isSidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 1. CLEAN LIGHT ADMIN SIDEBAR */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="admin-sidebar-header">
          <Link to="/admin" className="admin-sidebar-brand">
            <img src={logo2Img} alt="Shree Dhaan Logo" className="admin-sidebar-logo" />
            <div className="admin-sidebar-title-box">
              <div className="admin-sidebar-title-row">
                <span className="admin-sidebar-brand-name">Shree Dhaan</span>
                <span className="admin-sidebar-badge">ADMIN</span>
              </div>
              <span className="admin-sidebar-subtext">Control Panel</span>
            </div>
          </Link>

          <button
            type="button"
            className="admin-sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar menu"
          >
            ✕
          </button>
        </div>

        {/* Live System Health Strip */}
        <div className="admin-sidebar-status">
          <div className="admin-health-indicator">
            <span
              className="status-dot"
              style={{
                backgroundColor: healthInfo.status === 'OK' ? '#22c55e' : '#eab308',
                boxShadow: healthInfo.status === 'OK' ? '0 0 8px rgba(34, 197, 94, 0.6)' : 'none',
              }}
            />
            <span className="status-text">
              API {healthInfo.status === 'OK' ? 'Operational' : 'Connecting...'}
            </span>
          </div>
        </div>

        {/* Scalable Navigation Sections */}
        <nav className="admin-sidebar-nav">
          {NAV_SECTIONS.map((section, sIdx) => (
            <div key={sIdx} className="admin-nav-section">
              <div className="admin-nav-section-title">{section.title}</div>
              <div className="admin-nav-items">
                {section.items.map((item, iIdx) => {
                  if (item.isExternal) {
                    return (
                      <a
                        key={iIdx}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-sidebar-link external"
                      >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                        <span className="nav-ext-arrow">↗</span>
                      </a>
                    );
                  }
                  return (
                    <NavLink
                      key={iIdx}
                      to={item.to}
                      end={Boolean(item.end)}
                      className={({ isActive }) =>
                        `admin-sidebar-link ${isActive ? 'active' : ''}`
                      }
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-label">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer User Card */}
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <div className="admin-user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="admin-user-details">
              <span className="admin-user-name">{user?.name || 'Administrator'}</span>
              <span className="admin-user-role">{user?.role?.toUpperCase() || 'ADMIN'}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="admin-sidebar-signout-btn"
            title="Sign Out of Admin Portal"
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="admin-content-wrapper">
        {/* Modern Topbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-hamburger-btn"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <span />
              <span />
              <span />
            </button>

            <div className="admin-topbar-breadcrumbs">
              <span className="crumb-app">Admin Portal</span>
              <span className="crumb-sep">/</span>
              <span className="crumb-page">{currentTitle}</span>
            </div>
          </div>

          <div className="admin-topbar-right">
            <div className="admin-topbar-health">
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: healthInfo.status === 'OK' ? '#16a34a' : '#eab308',
                  boxShadow: healthInfo.status === 'OK' ? '0 0 6px #22c55e' : 'none',
                  display: 'inline-block',
                }}
              />
              <span>API {healthInfo.status === 'OK' ? 'Online' : 'Syncing'}</span>
            </div>

            <Link
              to="/"
              target="_blank"
              className="admin-topbar-website-btn"
              title="Open public website in new tab"
            >
              Live Site ↗
            </Link>

            <div className="admin-topbar-avatar" title={`Logged in as ${user?.name || 'Admin'}`}>
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Global Notification Toast */}
        {notification && (
          <div className={`admin-notification-toast ${notification.type}`}>
            <span>{notification.type === 'error' ? '⚠️' : '✓'}</span>
            <span>{notification.msg}</span>
          </div>
        )}

        {/* 3. PAGE CONTENT (INDIVIDUAL PAGES RENDER HERE VIA OUTLET) */}
        <main className="admin-main">
          <Outlet context={{ showNotification, healthInfo, fetchHealth }} />
        </main>
      </div>
    </div>
  );
}
