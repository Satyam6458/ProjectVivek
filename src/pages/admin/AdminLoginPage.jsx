import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function AdminLoginPage() {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [healthStatus, setHealthStatus] = useState({ loading: true, ok: false, uptime: null });

  // Form states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check backend health on mount
  useEffect(() => {
    let isMounted = true;
    api.health.check()
      .then((res) => {
        if (isMounted) {
          setHealthStatus({
            loading: false,
            ok: res.status === 'OK' || res.status === 'ok' || Boolean(res.uptime),
            uptime: res.uptime ? Math.round(res.uptime) : null,
          });
        }
      })
      .catch(() => {
        if (isMounted) setHealthStatus({ loading: false, ok: false, uptime: null });
      });
    return () => { isMounted = false; };
  }, []);

  // If already authenticated as admin, go straight to /admin
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // expectedRole = 'admin' enforces admin role validation
      await login(
        { email: loginData.email, password: loginData.password },
        'admin'
      );

      const redirectPath = location.state?.from?.pathname || '/admin';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Admin authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #14331d 0%, #0a170e 100%)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 16px',
      fontFamily: 'var(--kiro-font-family)',
      boxSizing: 'border-box',
    }}>

      {/* Top Bar with Return Link & Live Health Status */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px',
      }}>
        <Link
          to="/"
          style={{
            color: '#a3bfa8',
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          ← Return to Shree Dhaan Store
        </Link>

        {/* Live Server Health Indicator */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px',
          padding: '6px 14px',
          fontSize: '12px',
          letterSpacing: '0.02em',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: healthStatus.ok ? '#22c55e' : '#f59e0b',
            boxShadow: healthStatus.ok ? '0 0 8px #22c55e' : 'none',
          }} />
          <span style={{ color: '#e2ebd8' }}>
            {healthStatus.loading
              ? 'Checking API...'
              : healthStatus.ok
              ? `API Online (Uptime: ${healthStatus.uptime}s)`
              : 'API Connecting...'}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: '440px', width: '100%', margin: 'auto 0' }}>
        
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 14px',
            borderRadius: '16px',
            background: 'rgba(217, 155, 36, 0.12)',
            border: '1px solid rgba(217, 155, 36, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
          }}>
            🛡️
          </div>

          <span style={{
            color: 'var(--brand-gold)',
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}>
            Restricted Executive Portal
          </span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2rem', margin: '6px 0 8px', color: '#ffffff' }}>
            Admin Control Center
          </h1>
          <p style={{ color: '#8ea894', fontSize: '13px', margin: 0 }}>
            Sign in with verified administrator credentials to access management controls.
          </p>
        </div>

        {/* Card Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          borderRadius: '20px',
          padding: '36px 30px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
        }}>

          {/* Error Banner */}
          {errorMsg && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              padding: '12px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              lineHeight: '1.5',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
            }}>
              <span style={{ fontSize: '16px' }}>🚫</span>
              <div>{errorMsg}</div>
            </div>
          )}

          {/* Secure Admin Login Form */}
          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbdaba', marginBottom: '6px', letterSpacing: '0.04em' }}>
                ADMIN EMAIL OR PHONE *
              </label>
              <input
                type="text"
                required
                placeholder="admin@raavienterprises.com"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '10px',
                  color: '#ffffff',
                  padding: '12px 14px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                autoComplete="username"
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#cbdaba', marginBottom: '6px', letterSpacing: '0.04em' }}>
                ADMIN PASSWORD *
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '10px',
                  color: '#ffffff',
                  padding: '12px 14px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #d99b24 0%, #b57c15 100%)',
                color: '#0d1a10',
                border: 'none',
                padding: '14px',
                borderRadius: '10px',
                fontWeight: '800',
                fontSize: '14px',
                letterSpacing: '0.06em',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.75 : 1,
                boxShadow: '0 8px 24px rgba(217, 155, 36, 0.3)',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'VERIFYING CREDENTIALS...' : 'SIGN IN TO ADMIN PANEL →'}
            </button>
          </form>

        </div>

        {/* Customer Portal Link */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <span style={{ fontSize: '13px', color: '#8ea894' }}>Are you a customer? </span>
          <Link
            to="/login"
            style={{
              color: '#d99b24',
              fontSize: '13px',
              fontWeight: '700',
              textDecoration: 'none',
            }}
          >
            Go to Customer Login →
          </Link>
        </div>

      </div>
    </div>
  );
}
