import React from 'react';

export default function CertificatesPage() {
  return (
    <section className="section-wrapper" id="certificates">
      <div className="section-header-center">
        <span className="section-sub-title">Trust & Compliance</span>
        <h2 className="section-main-title">Licensing & Government Registrations</h2>
      </div>

      <div className="certificates-grid">
        <div style={{ display: 'block', padding: '28px', background: '#fff', borderRadius: '18px', border: '1px solid var(--line)', boxShadow: 'var(--kiro-shadow)' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--brand-gold-dark)', textTransform: 'uppercase' }}>FSSAI Food License</span>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: 'var(--brand-green)', margin: '6px 0' }}>FSSAI Registration No.</h3>
          <div style={{ display: 'inline-block', background: '#f4f8f4', padding: '6px 14px', borderRadius: '8px', border: '1px solid #d0e4d0', margin: '8px 0 10px' }}>
            <strong style={{ fontSize: '1.15rem', color: 'var(--brand-green)', fontFamily: 'monospace', letterSpacing: '1px' }}>20526050000110</strong>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Registered under Food Safety and Standards Authority of India (FSS Act, 2006).</p>
        </div>

        <div style={{ display: 'block', padding: '28px', background: '#fff', borderRadius: '18px', border: '1px solid var(--line)', boxShadow: 'var(--kiro-shadow)' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--brand-gold-dark)', textTransform: 'uppercase' }}>Government MSME</span>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: 'var(--brand-green)', margin: '6px 0' }}>Udyam Registration No.</h3>
          <div style={{ display: 'inline-block', background: '#f4f8f4', padding: '6px 14px', borderRadius: '8px', border: '1px solid #d0e4d0', margin: '8px 0 10px' }}>
            <strong style={{ fontSize: '1.15rem', color: 'var(--brand-green)', fontFamily: 'monospace', letterSpacing: '1px' }}>UDYAM-CG-05-0074005</strong>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>Ministry of Micro, Small & Medium Enterprises (MSME), Government of India.</p>
        </div>
      </div>
    </section>
  );
}
