import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function CustomerAccountPage() {
  const { user, logout, isAdmin, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    refreshUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Active Member';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section className="section-wrapper section-sage-bg" style={{ minHeight: '80vh', padding: '50px 16px' }}>
      <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Admin notice banner if admin accesses customer dashboard */}
        {isAdmin && (
          <div style={{
            background: 'linear-gradient(90deg, #11380c 0%, #205c19 100%)',
            color: '#fff',
            borderRadius: '16px',
            padding: '16px 24px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            boxShadow: '0 8px 24px rgba(17, 56, 12, 0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <div>
                <strong style={{ display: 'block', fontSize: '15px' }}>Administrator Account Detected</strong>
                <span style={{ fontSize: '13px', opacity: 0.85 }}>You have full administrative privileges to manage inquiries and products.</span>
              </div>
            </div>
            <Link
              to="/admin"
              style={{
                background: 'var(--brand-gold)',
                color: '#11380c',
                padding: '8px 18px',
                borderRadius: '8px',
                fontWeight: '800',
                fontSize: '13px',
              }}
            >
              Open Admin Panel →
            </Link>
          </div>
        )}

        {/* Profile Header */}
        <div style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '36px',
          border: '1px solid var(--line)',
          boxShadow: 'var(--kiro-shadow)',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brand-green) 0%, var(--brand-green-light) 100%)',
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(17, 56, 12, 0.15)',
              border: '3px solid #e2ebd8',
            }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.8rem', color: 'var(--brand-green)', margin: 0 }}>
                  {user?.name || 'Customer'}
                </h1>
                <span style={{
                  background: user?.role === 'admin' ? 'var(--brand-gold-light)' : 'var(--brand-sage)',
                  color: user?.role === 'admin' ? 'var(--brand-gold-dark)' : 'var(--brand-green)',
                  fontSize: '11px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  border: user?.role === 'admin' ? '1px solid var(--brand-gold)' : '1px solid var(--brand-sage-dark)',
                }}>
                  {user?.role === 'admin' ? '👑 Admin' : '✓ Customer'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
                {user?.email} • Member since {formatDate(user?.createdAt)}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleLogout}
              style={{
                background: '#fff',
                border: '1px solid #ef4444',
                color: '#ef4444',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#ef4444'; }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* Card 1: Account Information */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid var(--line)',
          }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', color: 'var(--brand-green)', margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>👤</span> Account Details
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--brand-gold-dark)', display: 'block' }}>
                  Full Name
                </span>
                <span style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>
                  {user?.name}
                </span>
              </div>

              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--brand-gold-dark)', display: 'block' }}>
                  Registered Email
                </span>
                <span style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>
                  {user?.email}
                </span>
              </div>

              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--brand-gold-dark)', display: 'block' }}>
                  Phone Number
                </span>
                <span style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>
                  {user?.phone || 'Not provided'}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--brand-gold-dark)', display: 'block' }}>
                  Account ID
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  {user?._id || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Quick Actions & Inquiries */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', color: 'var(--brand-green)', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🌱</span> Quick Actions
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                Order authentic Chhattisgarhi mixes, submit distributorship inquiries, or contact our customer support team directly.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to="/products"
                className="header-cta-btn"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', borderRadius: '10px', fontSize: '13px' }}
              >
                Browse Chilla Mixes Catalog →
              </Link>

              <Link
                to="/contact"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--brand-green)',
                  color: 'var(--brand-green)',
                  fontWeight: '700',
                  fontSize: '13px',
                  display: 'block',
                  background: 'var(--brand-sage)',
                }}
              >
                Submit Distributorship Inquiry
              </Link>

              <a
                href="https://wa.me/919109002098?text=Hello%20Shree%20Dhaan%20Team%2C%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid #22c55e',
                  color: '#15803d',
                  fontWeight: '700',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#f0fdf4',
                }}
              >
                <span>💬</span> Connect on WhatsApp Support
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
