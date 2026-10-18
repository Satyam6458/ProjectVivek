import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function AdminSystemPage() {
  const { healthInfo, fetchHealth } = useOutletContext() || {
    healthInfo: { status: 'OK', uptime: 0, loading: false },
    fetchHealth: () => {},
  };

  return (
    <div>
      <div className="admin-section-header">
        <div className="admin-section-title-wrap">
          <h1 className="admin-section-title">
            System Diagnostics & Endpoints
          </h1>
          <p className="admin-section-desc">
            Live server status and registered API endpoints in <code>backend-vivek</code>.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid var(--line)' }}>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.2rem', color: 'var(--brand-green)', margin: '0 0 16px' }}>
            Live API Diagnostics
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Base API URL:</span>
              <strong style={{ fontFamily: 'monospace', wordBreak: 'break-all', fontSize: '12px' }}>https://backend-vivek.vercel.app/api</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Health Check:</span>
              <span style={{ color: healthInfo?.status === 'OK' ? '#166534' : '#eab308', fontWeight: '800' }}>
                ● {healthInfo?.status || 'Unknown'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Server Uptime:</span>
              <strong>{healthInfo?.uptime || 0} seconds</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchHealth}
            style={{
              marginTop: '20px',
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--brand-green)',
              background: 'var(--brand-sage)',
              color: 'var(--brand-green)',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            ⚡ Ping Health Endpoint Now
          </button>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid var(--line)' }}>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.2rem', color: 'var(--brand-green)', margin: '0 0 16px' }}>
            Registered Backend Routes
          </h3>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', lineHeight: '1.9', color: 'var(--text-muted)' }}>
            <li><code>GET /stores/getstoredetails</code> - Public stores</li>
            <li><code>POST /stores/addstoredetails</code> - Add store (Admin)</li>
            <li><code>PUT /stores/updatestoredetails/:id</code> - Update (Admin)</li>
            <li><code>DELETE /stores/deletestoredetails/:id</code> - Delete (Admin)</li>
            <li><code>GET /products/getproductdetails</code> - Catalog</li>
            <li><code>POST /products/addproductdetails</code> - Add product</li>
            <li><code>PUT /products/updateproductdetails/:id</code> - Update</li>
            <li><code>DELETE /products/deleteproductdetails/:id</code> - Delete</li>
            <li><code>GET /inquiry/getinquirydetails</code> - Inquiries</li>
            <li><code>PUT /inquiry/updateinquirystatus/:id</code> - Update Status</li>
            <li><code>GET /auth/getuserdetails</code> - Users & Admins</li>
            <li><code>POST /auth/createadmin</code> - Create Admin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
