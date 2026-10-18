import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function ContactPage() {
  const { user } = useAuth();

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    queryType: 'Distributor Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto-fill from authenticated user session if available
  useEffect(() => {
    if (user) {
      setFormState((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formState.name.trim() || !formState.phone.trim() || !formState.email.trim()) {
      setErrorMessage('Please fill in your Name, Phone Number, and Email.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Connect to live backend endpoint POST /api/inquiries/addinquirydetails
      await api.inquiries.submit({
        full_name: formState.name.trim(),
        email: formState.email.trim().toLowerCase(),
        phone_number: formState.phone.trim(),
        inquiry_type: formState.queryType,
        message: formState.message.trim(),
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-wrapper section-sage-bg">
      <div className="contact-layout-grid">
        <div>
          <span className="section-sub-title">Partner With Us</span>
          <h2 className="section-main-title" style={{ marginBottom: '16px' }}>
            Distributorship & Bulk Purchases
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '28px' }}>
            Are you interested in distributing Shree Dhaan products in your city or placing bulk orders? Fill out our simple inquiry form.
          </p>

          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid var(--line)' }}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--brand-gold-dark)' }}>
                Support Line
              </span>
              <strong style={{ display: 'block', fontSize: '16px', color: 'var(--brand-green)' }}>
                +91 91090 02098
              </strong>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--brand-gold-dark)' }}>
                Email Contact
              </span>
              <strong style={{ display: 'block', fontSize: '16px', color: 'var(--brand-green)' }}>
                raavisince1999@gmail.com
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--brand-gold-dark)' }}>
                Factory & Office
              </span>
              <strong style={{ display: 'block', fontSize: '15px', color: 'var(--brand-green)', marginTop: '2px' }}>
                Raavi Enterprises, Shivaji Nagar, Camp-2, Power House, Bhilai, Durg, Chhattisgarh - 490001
              </strong>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h3 className="form-card-title">Distributorship Inquiry Form</h3>

          {errorMessage && (
            <div style={{
              background: '#fef2f2',
              color: '#991b1b',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '16px',
              border: '1px solid #fecaca',
            }}>
              ⚠️ {errorMessage}
            </div>
          )}

          {isSubmitted ? (
            <div style={{ background: '#eaf4ea', color: 'var(--brand-green)', padding: '28px', borderRadius: '14px', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 8px', fontFamily: 'Fraunces, serif', fontSize: '1.4rem' }}>✓ Inquiry Received!</h4>
              <p style={{ margin: '0 0 16px', fontSize: '14px', lineHeight: '1.6' }}>
                Thank you, <strong>{formState.name}</strong>. Your inquiry has been stored securely in our system. Our team will contact you shortly on <strong>{formState.phone}</strong>.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormState({
                    name: user?.name || '',
                    phone: user?.phone || '',
                    email: user?.email || '',
                    queryType: 'Distributor Inquiry',
                    message: '',
                  });
                }}
                className="header-cta-btn"
                style={{ padding: '8px 18px', fontSize: '12px' }}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  className="newsletter-input"
                  style={{ borderRadius: '10px', width: '100%' }}
                  value={formState.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  className="newsletter-input"
                  style={{ borderRadius: '10px', width: '100%' }}
                  value={formState.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="newsletter-input"
                  style={{ borderRadius: '10px', width: '100%' }}
                  value={formState.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inquiry Type</label>
                <select
                  name="queryType"
                  className="newsletter-input"
                  style={{ borderRadius: '10px', width: '100%' }}
                  value={formState.queryType}
                  onChange={handleInputChange}
                >
                  <option value="Distributor Inquiry">Distributor Inquiry</option>
                  <option value="Bulk Purchase">Bulk Purchase Order</option>
                  <option value="Retail Outlet Stock">Retail Outlet Stock</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message / Details</label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Details about your city or order..."
                  className="newsletter-input"
                  style={{ borderRadius: '10px', width: '100%', minHeight: '80px', resize: 'vertical' }}
                  value={formState.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary-kiro"
                style={{ width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.75 : 1 }}
              >
                {isSubmitting ? 'TRANSMITTING INQUIRY...' : 'SUBMIT INQUIRY →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
