import React from 'react';

export default function ShippingPage() {
  return (
    <div className="section-wrapper" style={{ maxWidth: '900px' }}>
      <h1 className="section-main-title" style={{ marginBottom: '16px' }}>Shipping & Returns</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>Effective Date: October 2026</p>

      <div style={{ lineHeight: '1.8', color: '#444', fontSize: '15px' }}>
        <h3 style={{ color: 'var(--brand-green)', fontFamily: 'Fraunces, serif' }}>1. Order Dispatch & Delivery</h3>
        <p>Bulk distributor orders and sample packages are dispatched directly from our facility in Bhilai, Chhattisgarh via verified transport partners within 2-4 business days.</p>

        <h3 style={{ color: 'var(--brand-green)', fontFamily: 'Fraunces, serif', marginTop: '24px' }}>2. Packaging Safety</h3>
        <p>All premixes are sealed in moisture-proof, food-grade pouch packaging to ensure maximum freshness during transit.</p>

        <h3 style={{ color: 'var(--brand-green)', fontFamily: 'Fraunces, serif', marginTop: '24px' }}>3. Quality Guarantee & Returns</h3>
        <p>If you receive damaged goods during transit, please contact our support team at <strong>+91 91090 02098</strong> within 48 hours for replacement assistance.</p>
      </div>
    </div>
  );
}
