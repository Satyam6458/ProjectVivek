import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logo2Img } from '../data/siteData';

export default function CustomerLoginPage() {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'
  const { login, signup, isAuthenticated, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, redirect
  if (isAuthenticated) {
    const destination = isAdmin ? '/admin' : '/account';
    return (
      <div className="section-wrapper" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '440px', width: '100%', background: '#fff', padding: '36px', borderRadius: '20px', border: '1px solid var(--line)', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>👋</div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: 'var(--brand-green)', margin: '0 0 8px' }}>
            Already Signed In
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>
            You are logged in as <strong>{user?.name}</strong> ({user?.email}).
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to={destination} className="header-cta-btn" style={{ padding: '10px 22px' }}>
              Go to {isAdmin ? 'Admin Dashboard' : 'My Account'} →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Signin form state
  const [signinForm, setSigninForm] = useState({
    email: '',
    password: '',
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSigninChange = (e) => {
    setSigninForm({ ...signinForm, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await login({
        email: signinForm.email,
        password: signinForm.password,
      });

      const redirectPath = location.state?.from?.pathname || '/account';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Unable to sign in. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!signupForm.name || !signupForm.email || !signupForm.phone || !signupForm.password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (signupForm.password.length < 5) {
      setErrorMsg('Password should be at least 5 characters.');
      return;
    }

    setLoading(true);

    try {
      await signup({
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone,
        password: signupForm.password,
        role: 'user',
      });

      setSuccessMsg('Account created successfully! Redirecting to your dashboard...');
      setTimeout(() => {
        navigate('/account', { replace: true });
      }, 1000);
    } catch (err) {
      setErrorMsg(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCustomer = () => {
    setSigninForm({
      email: 'harish98verma@gmail.com',
      password: 'root123',
    });
    setErrorMsg('');
  };

  return (
    <section className="section-wrapper section-sage-bg" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', padding: '60px 16px' }}>
      <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
        
        {/* Brand header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img
            src={logo2Img}
            alt="Shree Dhaan"
            style={{ width: '68px', height: '68px', margin: '0 auto 12px', objectFit: 'contain' }}
          />
          <span className="section-sub-title" style={{ display: 'inline-block', marginBottom: '4px' }}>
            Customer Portal
          </span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.9rem', color: 'var(--brand-green)', margin: '0 0 6px' }}>
            {activeTab === 'signin' ? 'Welcome Back' : 'Join Shree Dhaan'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
            {activeTab === 'signin'
              ? 'Sign in to access your inquiries, orders, and exclusive offers.'
              : 'Create your customer account for healthy Chhattisgarhi premixes.'}
          </p>
        </div>

        {/* Tab switchers */}
        <div style={{
          display: 'flex',
          background: 'rgba(17, 56, 12, 0.08)',
          borderRadius: '14px',
          padding: '4px',
          marginBottom: '20px',
        }}>
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'signin' ? '#ffffff' : 'transparent',
              color: activeTab === 'signin' ? 'var(--brand-green)' : 'var(--text-muted)',
              fontWeight: '700',
              fontSize: '14px',
              boxShadow: activeTab === 'signin' ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'signup' ? '#ffffff' : 'transparent',
              color: activeTab === 'signup' ? 'var(--brand-green)' : 'var(--text-muted)',
              fontWeight: '700',
              fontSize: '14px',
              boxShadow: activeTab === 'signup' ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Create Account
          </button>
        </div>

        {/* Auth Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px 28px',
          border: '1px solid var(--line)',
          boxShadow: '0 12px 36px rgba(17, 56, 12, 0.08)',
        }}>
          
          {/* Error Alert */}
          {errorMsg && (
            <div style={{
              background: '#fef2f2',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              lineHeight: '1.5',
              marginBottom: '20px',
              border: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMsg && (
            <div style={{
              background: '#f0fdf4',
              color: '#166534',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              lineHeight: '1.5',
              marginBottom: '20px',
              border: '1px solid #bbf7d0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span>✓</span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSigninSubmit}>
              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label className="form-label" style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: 'var(--brand-green)' }}>
                  Email Address or Phone *
                </label>
                <input
                  type="text"
                  name="email"
                  required
                  placeholder="e.g. harish98verma@gmail.com"
                  className="newsletter-input"
                  style={{ width: '100%', borderRadius: '10px', fontSize: '14px', padding: '12px 14px' }}
                  value={signinForm.email}
                  onChange={handleSigninChange}
                  autoComplete="username"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="form-label" style={{ fontSize: '13px', fontWeight: '700', margin: 0, color: 'var(--brand-green)' }}>
                    Password *
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="newsletter-input"
                  style={{ width: '100%', borderRadius: '10px', fontSize: '14px', padding: '12px 14px' }}
                  value={signinForm.password}
                  onChange={handleSigninChange}
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="header-cta-btn"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.75 : 1,
                }}
              >
                {loading ? 'AUTHENTICATING...' : 'SIGN IN →'}
              </button>

              {/* Demo quick fill button */}
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={fillDemoCustomer}
                  style={{
                    background: 'var(--brand-gold-light)',
                    border: '1px dashed var(--brand-gold)',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    color: 'var(--brand-gold-dark)',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  ⚡ Auto-fill Test Customer Account
                </button>
              </div>
            </form>
          )}

          {/* SIGN UP FORM */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignupSubmit}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: 'var(--brand-green)' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Harish Verma"
                  className="newsletter-input"
                  style={{ width: '100%', borderRadius: '10px', fontSize: '14px', padding: '12px 14px' }}
                  value={signupForm.name}
                  onChange={handleSignupChange}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: 'var(--brand-green)' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. harish@example.com"
                  className="newsletter-input"
                  style={{ width: '100%', borderRadius: '10px', fontSize: '14px', padding: '12px 14px' }}
                  value={signupForm.email}
                  onChange={handleSignupChange}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: 'var(--brand-green)' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. 9644473234"
                  className="newsletter-input"
                  style={{ width: '100%', borderRadius: '10px', fontSize: '14px', padding: '12px 14px' }}
                  value={signupForm.phone}
                  onChange={handleSignupChange}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '22px' }}>
                <label className="form-label" style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: 'var(--brand-green)' }}>
                  Create Password *
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Minimum 5 characters"
                  className="newsletter-input"
                  style={{ width: '100%', borderRadius: '10px', fontSize: '14px', padding: '12px 14px' }}
                  value={signupForm.password}
                  onChange={handleSignupChange}
                  autoComplete="new-password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="header-cta-btn"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  letterSpacing: '0.04em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.75 : 1,
                }}
              >
                {loading ? 'CREATING ACCOUNT...' : 'REGISTER ACCOUNT →'}
              </button>
            </form>
          )}

        </div>

        {/* Admin Portal Switcher */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.8)',
          border: '1px solid var(--line)',
          borderRadius: '14px',
          padding: '14px 18px',
        }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Are you an administrator or store manager?{' '}
          </span>
          <Link
            to="/admin/login"
            style={{
              fontSize: '13px',
              fontWeight: '800',
              color: 'var(--brand-green)',
              textDecoration: 'underline',
              display: 'inline-block',
              marginTop: '4px',
            }}
          >
            Access Admin Panel & Login →
          </Link>
        </div>

      </div>
    </section>
  );
}
