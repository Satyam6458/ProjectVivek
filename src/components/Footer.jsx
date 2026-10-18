import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logo2Img } from '../data/siteData';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <>
      {/* 12. Newsletter Subscription Bar */}
      <section className="newsletter-wrapper">
        <div className="newsletter-container">
          <div className="newsletter-copy">
            <h3>Stay Updated With Authentic Flavors</h3>
            <p>Subscribe to receive product news, traditional recipes, and partnership opportunities.</p>
          </div>
          <form className="newsletter-form-box" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-newsletter">
              SUBSCRIBE
            </button>
          </form>
        </div>
        {newsletterSuccess && (
          <p style={{ textAlign: 'center', color: 'var(--brand-green)', fontWeight: '700', marginTop: '12px', fontSize: '14px' }}>
            ✓ Thank you for subscribing to Shree Dhaan updates!
          </p>
        )}
      </section>

      {/* 13. Multi-Column Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-col-brand">
            <img src={logo2Img} alt="Shree Dhaan Logo" className="footer-logo" />
            <p>
              Shree Dhaan by <strong>Raavi Enterprises</strong> brings 100% natural, farm-sourced ready-to-cook mixes straight from Chhattisgarh farmlands to modern homes.
            </p>
            <div className="footer-social-links">
              <a href="#facebook" className="social-icon-btn" title="Facebook">f</a>
              <a href="https://www.instagram.com/shree__dhaan?igsi=MTc4Mzlzd2Z1c3BoYw==" target="_blank" rel="noreferrer" className="social-icon-btn" title="Instagram @shree__dhaan">📷</a>
              <a href="#youtube" className="social-icon-btn" title="YouTube">▶</a>
              <a href="https://wa.me/919109002098" target="_blank" rel="noreferrer" className="social-icon-btn" title="WhatsApp">💬</a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-menu-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Chilla Mixes</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/recipes">How to Cook</Link></li>
              <li><Link to="/certificates">Certificates</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/stores">Store Outlets</Link></li>
              <li><Link to="/login">Customer Portal</Link></li>
              <li><Link to="/admin/login" style={{ color: 'var(--brand-gold-dark)', fontWeight: '600' }}>🛡️ Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">REGISTRATION & POLICIES</h4>
            <ul className="footer-menu-list">
              <li style={{ color: 'var(--text-muted)', fontSize: '13px' }}><strong style={{ color: 'var(--brand-green)' }}>FSSAI Reg No:</strong> 20526050000110</li>
              <li style={{ color: 'var(--text-muted)', fontSize: '13px' }}><strong style={{ color: 'var(--brand-green)' }}>Udyam MSME:</strong> UDYAM-CG-05-0074005</li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">CONTACT LOCATION</h4>
            <div className="footer-contact-item">
              <strong>Support Phone:</strong>
              +91 91090 02098
            </div>
            <div className="footer-contact-item">
              <strong>Email Address:</strong>
              raavisince1999@gmail.com
            </div>
            <div className="footer-contact-item">
              <strong>Factory & Office:</strong>
              Raavi Enterprises, Shivaji Nagar, Camp-2, Power House, Bhilai, Durg, Chhattisgarh - 490001
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} Raavi Enterprises (Shree Dhaan). All rights reserved.
          </div>
          <div className="payment-badges">
            <span className="payment-badge-pill">UPI</span>
            <span className="payment-badge-pill">PAYTM</span>
            <span className="payment-badge-pill">VISA</span>
            <span className="payment-badge-pill">MASTERCARD</span>
            <span className="payment-badge-pill">FSSAI REG. 20526050000110</span>
          </div>
        </div>
      </footer>
    </>
  );
}
