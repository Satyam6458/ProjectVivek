import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="section-wrapper" style={{ maxWidth: '900px' }}>
      <h1 className="section-main-title" style={{ marginBottom: '16px' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '32px' }}>Effective Date: October 2026</p>

      <div style={{ lineHeight: '1.8', color: '#444', fontSize: '15px' }}>
        <h3 style={{ color: 'var(--brand-green)', fontFamily: 'Fraunces, serif' }}>1. Data Collection</h3>
        <p>At Raavi Enterprises (Shree Dhaan), we respect your privacy. We collect personal information such as your name, phone number, and email address only when voluntarily submitted through our inquiry or subscription forms.</p>

        <h3 style={{ color: 'var(--brand-green)', fontFamily: 'Fraunces, serif', marginTop: '24px' }}>2. Use of Information</h3>
        <p>Your details are used exclusively to process your distributorship requests, respond to business inquiries, and provide updates regarding Shree Dhaan product offerings.</p>

        <h3 style={{ color: 'var(--brand-green)', fontFamily: 'Fraunces, serif', marginTop: '24px' }}>3. Data Protection</h3>
        <p>We do not sell, rent, or trade your personal data to third parties. All submitted details remain confidential within Raavi Enterprises management.</p>

        <h3 style={{ color: 'var(--brand-green)', fontFamily: 'Fraunces, serif', marginTop: '24px' }}>4. Contact Us</h3>
        <p>If you have any questions regarding our Privacy Policy, please contact us at <strong>raavisince1999@gmail.com</strong> or call <strong>+91 91090 02098</strong>.</p>
      </div>
    </div>
  );
}
