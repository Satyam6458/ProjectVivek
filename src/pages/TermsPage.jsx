import React from 'react';

export default function TermsPage() {
  return (
    <div className="section-wrapper" style={{ maxWidth: '900px' }}>
      <h1 className="section-main-title" style={{ marginBottom: '16px' }}>Terms of Service</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>Effective Date: October 2026</p>

      <div style={{ lineHeight: '1.8', color: '#444', fontSize: '15px' }}>
        <h3 style={{ color: 'var(--brand-green)', fontFamily: 'Fraunces, serif' }}>1. General Terms</h3>
        <p>By accessing the Shree Dhaan website operated by Raavi Enterprises, you agree to comply with our terms and guidelines for product inquiry and business partnerships.</p>

        <h3 style={{ color: 'var(--brand-green)', fontFamily: 'Fraunces, serif', marginTop: '24px' }}>2. Product Information</h3>
        <p>We ensure that all product descriptions, ingredients, weight specifications, and certifications listed on our platform are accurate and compliant with food safety regulations.</p>

        <h3 style={{ color: 'var(--brand-green)', fontFamily: 'Fraunces, serif', marginTop: '24px' }}>3. Distributorship & Orders</h3>
        <p>Distributorship applications and bulk purchase orders are subject to verification and commercial agreement between Raavi Enterprises and the buyer.</p>
      </div>
    </div>
  );
}
