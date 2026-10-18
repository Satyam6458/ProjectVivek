import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import api from '../../services/api';

export default function AdminOverviewPage() {
  const navigate = useNavigate();
  const context = useOutletContext() || {};

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    usersCount: 0,
    customersCount: 0,
    adminsCount: 0,
    storesCount: 0,
    publishedStoresCount: 0,
    productsCount: 0,
    inquiriesCount: 0,
    pendingInquiriesCount: 0,
    resolvedInquiriesCount: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const loadOverviewData = async () => {
      setLoading(true);
      try {
        const [usersRes, storesRes, productsRes, inquiriesRes] = await Promise.allSettled([
          api.auth.getAllUsers(),
          api.stores.getAll(),
          api.products.getAll(),
          api.inquiries.getAll(),
        ]);

        if (!isMounted) return;

        const users = usersRes.status === 'fulfilled' && usersRes.value?.data ? (Array.isArray(usersRes.value.data) ? usersRes.value.data : [usersRes.value.data]) : [];
        const stores = storesRes.status === 'fulfilled' && storesRes.value?.data ? (Array.isArray(storesRes.value.data) ? storesRes.value.data : [storesRes.value.data]) : [];
        const products = productsRes.status === 'fulfilled' && productsRes.value?.data ? (Array.isArray(productsRes.value.data) ? productsRes.value.data : [productsRes.value.data]) : [];
        const inquiries = inquiriesRes.status === 'fulfilled' && inquiriesRes.value?.data ? (Array.isArray(inquiriesRes.value.data) ? inquiriesRes.value.data : [inquiriesRes.value.data]) : [];

        setStats({
          usersCount: users.length,
          customersCount: users.filter((u) => u.role === 'user').length,
          adminsCount: users.filter((u) => u.role === 'admin').length,
          storesCount: stores.length,
          publishedStoresCount: stores.filter((s) => s.publish).length,
          productsCount: products.length,
          inquiriesCount: inquiries.length,
          pendingInquiriesCount: inquiries.filter((i) => i.status === 'PENDING').length,
          resolvedInquiriesCount: inquiries.filter((i) => i.status === 'RESOLVED').length,
        });
      } catch (err) {
        console.error('Error loading overview data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadOverviewData();

    return () => { isMounted = false; };
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '22px' }}>
        <h1 className="admin-section-title">
          Operational Overview
        </h1>
        <p className="admin-section-desc">
          Real-time operational summary of customer accounts, retail stores, product catalog, and inquiries.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="admin-metrics-grid">
        {/* Users Card */}
        <div
          onClick={() => navigate('/admin/users')}
          className="admin-metric-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--brand-gold-dark)', textTransform: 'uppercase' }}>
              Total Users
            </span>
            <span style={{ fontSize: '20px' }}>👥</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--brand-green)', lineHeight: 1 }}>
            {loading ? '...' : stats.usersCount}
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '12px', fontSize: '11px', flexWrap: 'wrap' }}>
            <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
              {stats.customersCount} Customers
            </span>
            <span style={{ background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
              {stats.adminsCount} Admins
            </span>
          </div>
        </div>

        {/* Retail Stores Card */}
        <div
          onClick={() => navigate('/admin/stores')}
          className="admin-metric-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--brand-gold-dark)', textTransform: 'uppercase' }}>
              Retail Stores
            </span>
            <span style={{ fontSize: '20px' }}>🏬</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--brand-green)', lineHeight: 1 }}>
            {loading ? '...' : stats.storesCount}
          </div>
          <p style={{ margin: '12px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
            {stats.publishedStoresCount} Published on customer site
          </p>
        </div>

        {/* Products Card */}
        <div
          onClick={() => navigate('/admin/products')}
          className="admin-metric-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--brand-gold-dark)', textTransform: 'uppercase' }}>
              Catalog Products
            </span>
            <span style={{ fontSize: '20px' }}>🌾</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--brand-green)', lineHeight: 1 }}>
            {loading ? '...' : stats.productsCount}
          </div>
          <p style={{ margin: '12px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
            In MongoDB <code>c_productdetails</code>
          </p>
        </div>

        {/* Inquiries Card */}
        <div
          onClick={() => navigate('/admin/inquiries')}
          className="admin-metric-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--brand-gold-dark)', textTransform: 'uppercase' }}>
              Total Inquiries
            </span>
            <span style={{ fontSize: '20px' }}>📬</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--brand-green)', lineHeight: 1 }}>
            {loading ? '...' : stats.inquiriesCount}
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '12px', fontSize: '11px' }}>
            <span style={{ background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
              {stats.pendingInquiriesCount} Pending
            </span>
            <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
              {stats.resolvedInquiriesCount} Resolved
            </span>
          </div>
        </div>
      </div>

      {/* Quick Operations Shortcuts */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '26px',
        border: '1px solid var(--line)',
        marginBottom: '30px',
      }}>
        <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', color: 'var(--brand-green)', margin: '0 0 16px' }}>
          ⚡ Quick Section Shortcuts
        </h3>
        <div className="admin-quick-ops-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => navigate('/admin/stores')}
            className="header-cta-btn"
            style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '10px' }}
          >
            🏪 Manage Retail Stores ({stats.storesCount}) →
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            style={{
              background: 'var(--brand-sage)',
              border: '1px solid var(--brand-sage-dark)',
              color: 'var(--brand-green)',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            🌾 Manage Products ({stats.productsCount}) →
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/users')}
            style={{
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              color: '#374151',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            👥 Manage User Accounts ({stats.usersCount}) →
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/inquiries')}
            style={{
              background: 'var(--brand-gold-light)',
              border: '1px solid var(--brand-gold)',
              color: 'var(--brand-gold-dark)',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            📥 Manage Inquiries ({stats.inquiriesCount}) →
          </button>
        </div>
      </div>
    </div>
  );
}
