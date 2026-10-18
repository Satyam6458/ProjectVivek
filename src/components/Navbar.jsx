import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logo2Img } from '../data/siteData';
import { useAuth } from '../context/AuthContext';

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    setAccountDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="top-notification-bar">
        <div className="container">
          <div className="announcement-text">
            <span className="announcement-pill">FREE SHIPPING</span>
            <span>🌱 <strong>SHREE DHAAN</strong> Chhattisgarhi Premixes • 100% Natural</span>
          </div>
          <div className="announcement-links">
            <a href="https://www.instagram.com/shree__dhaan?igsi=MTc4Mzlzd2Z1c3BoYw==" target="_blank" rel="noreferrer" className="announcement-link">
              📷 Instagram: @shree__dhaan
            </a>
            <a href="tel:+919109002098" className="announcement-link">
              <PhoneIcon /> Support: +91 91090 02098
            </a>
            <a href="mailto:raavisince1999@gmail.com" className="announcement-link">
              <MailIcon /> raavisince1999@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <header className="header-main-area">
        <div className="header-container">
          <Link to="/" className="logo-wrap">
            <img src={logo2Img} alt="Shree Dhaan Logo" />
            <div className="logo-text-box">
              <span className="logo-brand-title">Shree Dhaan</span>
              <span className="logo-brand-subtitle">by Raavi Enterprises</span>
            </div>
          </Link>

          <nav className="main-navigation">
            <ul className="main-menu-list">
              <li><NavLink to="/" className={({ isActive }) => (isActive ? 'main-menu-link active' : 'main-menu-link')}>HOME</NavLink></li>
              <li><NavLink to="/products" className={({ isActive }) => (isActive ? 'main-menu-link active' : 'main-menu-link')}>CHILLA MIXES</NavLink></li>
              <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'main-menu-link active' : 'main-menu-link')}>OUR STORY</NavLink></li>
              <li><NavLink to="/recipes" className={({ isActive }) => (isActive ? 'main-menu-link active' : 'main-menu-link')}>HOW TO COOK</NavLink></li>
              <li><NavLink to="/certificates" className={({ isActive }) => (isActive ? 'main-menu-link active' : 'main-menu-link')}>CERTIFICATES</NavLink></li>
              <li><NavLink to="/stores" className={({ isActive }) => (isActive ? 'main-menu-link active' : 'main-menu-link')}>STORES</NavLink></li>
              <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'main-menu-link active' : 'main-menu-link')}>CONTACT</NavLink></li>
            </ul>
          </nav>

          <div className="header-right-actions">
            <button className="header-action-btn" title="Search Products" onClick={() => navigate('/products')}>
              <SearchIcon />
            </button>

            {/* Account Icon with Interactive Dropdown */}
            <div className="nav-account-wrapper" ref={dropdownRef}>
              <button
                className={`nav-account-btn ${isAuthenticated ? 'logged-in' : ''} ${accountDropdownOpen ? 'active' : ''}`}
                title={isAuthenticated ? `Logged in as ${user?.name}` : 'Account'}
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                aria-expanded={accountDropdownOpen}
              >
                {isAuthenticated ? (
                  <span>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                ) : (
                  <UserIcon />
                )}
                {isAdmin && <span className="nav-account-admin-badge" />}
              </button>

              {/* Dropdown Menu */}
              {accountDropdownOpen && (
                <div className="nav-account-dropdown">
                  {isAuthenticated ? (
                    <div>
                      {/* User Info Header */}
                      <div className="nav-dropdown-user-header">
                        <div className="nav-dropdown-avatar">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="nav-dropdown-meta">
                          <h4 className="nav-dropdown-name">{user?.name}</h4>
                          <span className="nav-dropdown-email">{user?.email}</span>
                          <span className={`nav-dropdown-role-pill ${user?.role === 'admin' ? 'admin' : 'user'}`}>
                            {user?.role === 'admin' ? '👑 Admin' : '✓ Customer'}
                          </span>
                        </div>
                      </div>

                      {/* Dropdown Links List */}
                      <ul className="nav-dropdown-menu-list">
                        <li>
                          <Link
                            to="/account"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="nav-dropdown-link"
                          >
                            <span className="dropdown-icon">👤</span>
                            <span>My Account Profile</span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/contact"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="nav-dropdown-link"
                          >
                            <span className="dropdown-icon">🌱</span>
                            <span>Distributor Inquiry</span>
                          </Link>
                        </li>

                        {isAdmin && (
                          <li>
                            <Link
                              to="/admin"
                              onClick={() => setAccountDropdownOpen(false)}
                              className="nav-dropdown-link admin-link"
                            >
                              <span className="dropdown-icon">🛡️</span>
                              <span>Open Admin Panel</span>
                            </Link>
                          </li>
                        )}

                        <li>
                          <button
                            onClick={handleSignOut}
                            className="nav-dropdown-link danger-signout"
                          >
                            <span className="dropdown-icon">🚪</span>
                            <span>Sign Out</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="nav-dropdown-guest-box">
                      <h4 className="nav-dropdown-guest-title">Customer Portal</h4>
                      <p className="nav-dropdown-guest-sub">
                        Sign in to track orders, inquiries & regional distributorship.
                      </p>

                      <Link
                        to="/login"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="nav-dropdown-primary-btn"
                      >
                        Sign In to Account →
                      </Link>

                      <Link
                        to="/login"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="nav-dropdown-secondary-link"
                      >
                        Create a New Account
                      </Link>

                      <Link
                        to="/admin/login"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="nav-dropdown-admin-link"
                      >
                        <span>🛡️</span> Admin Portal Login
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button className="header-action-btn" title="Wishlist" onClick={() => navigate('/products')}>
              <HeartIcon />
            </button>
            <button className="header-action-btn cart-btn-mobile" title="Inquiry Cart" onClick={() => navigate('/contact')}>
              <CartIcon />
              <span className="cart-count-badge">0</span>
            </button>
            <Link to="/contact" className="header-cta-btn">
              INQUIRE NOW →
            </Link>
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(true)} aria-label="Open mobile menu">
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer & Overlay */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-drawer ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="logo-text-box">
            <span className="logo-brand-title">Shree Dhaan</span>
            <span className="logo-brand-subtitle">Raavi Enterprises</span>
          </div>
          <button className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <div className="mobile-menu-links">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>HOME</NavLink>
          <NavLink to="/products" onClick={() => setMobileMenuOpen(false)}>CHILLA MIXES</NavLink>
          <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>OUR STORY</NavLink>
          <NavLink to="/recipes" onClick={() => setMobileMenuOpen(false)}>HOW TO COOK</NavLink>
          <NavLink to="/certificates" onClick={() => setMobileMenuOpen(false)}>CERTIFICATES</NavLink>
          <NavLink to="/stores" onClick={() => setMobileMenuOpen(false)}>RETAIL STORES</NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>CONTACT & INQUIRY</NavLink>
          
          {/* Auth links in mobile drawer */}
          <div style={{ borderTop: '1px solid var(--line)', marginTop: '12px', paddingTop: '12px' }}>
            {isAuthenticated ? (
              <>
                <NavLink to="/account" onClick={() => setMobileMenuOpen(false)}>
                  👤 MY ACCOUNT ({user?.name})
                </NavLink>
                {isAdmin && (
                  <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--brand-gold-dark)', fontWeight: '800' }}>
                    🛡️ ADMIN DASHBOARD
                  </NavLink>
                )}
                <button
                  onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    fontWeight: '700',
                    fontSize: '14px',
                    padding: '10px 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  🚪 SIGN OUT
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
                  👤 CUSTOMER SIGN IN
                </NavLink>
                <NavLink to="/admin/login" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--brand-gold-dark)' }}>
                  🛡️ ADMIN PORTAL LOGIN
                </NavLink>
              </>
            )}
          </div>
        </div>
        <Link to="/contact" className="header-cta-btn mobile-drawer-cta" onClick={() => setMobileMenuOpen(false)}>
          INQUIRE NOW →
        </Link>
        <div className="mobile-drawer-footer">
          <p style={{ margin: 0 }}>📞 +91 91090 02098</p>
          <p style={{ margin: '4px 0 0' }}>✉️ raavisince1999@gmail.com</p>
        </div>
      </div>
    </>
  );
}
