import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo1Img, highlights, whyChooseUs, trustFeatures, products, comparisonData, preparationSteps } from '../data/siteData';

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function HomePage() {
  const [selectedQuickProduct, setSelectedQuickProduct] = useState(null);
  const [activeModalImage, setActiveModalImage] = useState(null);
  const navigate = useNavigate();

  return (
    <div>
      {/* 3. Hero Section */}
      <section className="hero-wrapper">
        <div className="hero-container">
          <div>
            <h1 className="hero-heading">Instant Traditional Chilla Mix in 5 Minutes</h1>
            <p className="hero-description">
              Buy <strong>Shree Dhaan Chilla Mixes</strong> online — 100% natural, farm-sourced rice and pulse mixes crafted with traditional Chhattisgarhi heritage. Three clean ingredients, zero maida, no preservatives. FSSAI Certified.
            </p>

            <div className="hero-cta-group">
              <Link to="/products" className="btn-primary-kiro">
                EXPLORE PRODUCTS →
              </Link>
              <Link to="/contact" className="btn-secondary-kiro">
                DISTRIBUTOR INQUIRY
              </Link>
            </div>

            <div className="hero-features-list">
              <div className="hero-feature-item">✓ 100% Farm Grains</div>
              <div className="hero-feature-item">✓ Zero Maida</div>
              <div className="hero-feature-item">✓ FSSAI Registered</div>
            </div>
          </div>

          <div className="hero-visual-card">
            <img src={logo1Img} alt="Shree Dhaan Packaging" className="hero-main-img" />
            <div className="floating-badge floating-badge-1">
              <span className="floating-badge-title">Quality Standard</span>
              <span className="floating-badge-val">100% Natural & Pure</span>
            </div>
            <div className="floating-badge floating-badge-2">
              <span className="floating-badge-title">Fast Prep</span>
              <span className="floating-badge-val">Ready in 5 Mins</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefit Trust Strip */}
      <section className="benefit-strip">
        <div className="benefit-container">
          {trustFeatures.map((b, i) => (
            <div className="benefit-box" key={i}>
              <div className="benefit-icon">{b.icon}</div>
              <div>
                <h4 className="benefit-title">{b.title}</h4>
                <p className="benefit-desc">{b.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Brand Heritage & Why Choose Us Section */}
      <section className="section-wrapper section-sage-bg">
        <div className="section-header-center">
          <span className="section-sub-title">Brand Heritage</span>
          <h2 className="section-main-title">Rooted in Farm Sourcing & Food Culture</h2>
        </div>

        <div className="highlights-grid">
          {highlights.map((h, i) => (
            <div key={i} style={{ background: '#ffffff', padding: '28px', borderRadius: '18px', border: '1px solid var(--line)', boxShadow: 'var(--kiro-shadow)' }}>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', color: 'var(--brand-green)', margin: '0 0 10px' }}>{h.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>{h.text}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div style={{ marginTop: '60px' }}>
          <div className="section-header-center">
            <span className="section-sub-title">Our Philosophy</span>
            <h2 className="section-main-title">Why Families Choose Shree Dhaan</h2>
          </div>
          <div className="why-us-grid">
            {whyChooseUs.map((w, idx) => (
              <div key={idx} style={{ background: '#ffffff', padding: '28px', borderRadius: '18px', border: '1px solid var(--line)', boxShadow: 'var(--kiro-shadow)' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', color: 'var(--brand-green)', margin: '0 0 10px' }}>{w.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product Showcase Section */}
      <section className="section-wrapper">
        <div className="section-header-center">
          <span className="section-sub-title">Our Best Sellers</span>
          <h2 className="section-main-title">Chhattisgarhi Chilla Mix Range</h2>
        </div>
        <div className="products-grid-container">
          {products.map((item) => (
            <div key={item.id} className="kiro-product-card">
              <div className="product-img-box" onClick={() => setActiveModalImage(item.image)} style={{ cursor: 'pointer' }} title="Click to view large">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="product-content-box">
                <h3 className="product-card-title">{item.name}</h3>
                <p className="product-card-desc">{item.description}</p>
                <div className="product-highlights-list">
                  {item.bullets.map((bullet, idx) => (
                    <span key={idx} className="product-chip">✓ {bullet}</span>
                  ))}
                </div>
                <div className="product-card-footer">
                  <span className="product-weight-text">Net Wt: {item.weight}</span>
                  <button
                    className="btn-card-action"
                    onClick={() => setSelectedQuickProduct(item)}
                  >
                    QUICK VIEW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link to="/products" className="btn-primary-kiro">
            VIEW ALL PRODUCTS & VARIANTS →
          </Link>
        </div>
      </section>

      {/* 7. Comparison Table */}
      <section className="section-wrapper section-sage-bg">
        <div className="section-header-center">
          <span className="section-sub-title">Honest Comparison</span>
          <h2 className="section-main-title">Shree Dhaan vs Regular Market Mixes</h2>
        </div>

        <div className="comparison-container">
          <div className="comparison-scroll-wrapper">
            <table className="kiro-comparison-table">
              <thead>
                <tr>
                  <th>Key Attributes</th>
                  <th className="col-shree-dhaan">Shree Dhaan Premixes</th>
                  <th>Standard Market Mixes</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.feature}</strong></td>
                    <td className="col-shree-dhaan">✓ {row.shreeDhaan}</td>
                    <td>✕ {row.market}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. 10-Minute Recipe Cooking Flow */}
      <section className="section-wrapper section-dark-bg">
        <div className="section-header-center">
          <span className="section-sub-title">10-MINUTE RECIPE</span>
          <h2 className="section-main-title">How To Prepare Shree Dhaan Chilla</h2>
        </div>
        <div className="recipe-steps-grid">
          {preparationSteps.map((step, idx) => (
            <div key={idx} className="recipe-step-card" onClick={() => setActiveModalImage(step.image)} style={{ cursor: 'pointer' }}>
              <div className="recipe-img-wrap">
                <img src={step.image} alt={`Step ${idx + 1}`} />
              </div>
              <div className="recipe-step-num">Step 0{idx + 1}</div>
              <p className="recipe-step-text">{step.text}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/recipes" className="btn-secondary-kiro">
            SEE FULL COOKING GUIDE →
          </Link>
        </div>
      </section>

      {/* Modals */}
      {selectedQuickProduct && (
        <div className="modal-overlay" onClick={() => setSelectedQuickProduct(null)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedQuickProduct(null)}>
              <CloseIcon />
            </button>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
              <img src={selectedQuickProduct.image} alt={selectedQuickProduct.name} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
              <div>
                <h3 style={{ margin: '0 0 4px', fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: 'var(--brand-green)' }}>{selectedQuickProduct.name}</h3>
                <span style={{ fontSize: '13px', color: 'var(--brand-gold-dark)', fontWeight: '700' }}>Weight: {selectedQuickProduct.weight}</span>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.65', marginBottom: '20px' }}>{selectedQuickProduct.description}</p>
            <div style={{ background: 'var(--brand-sage)', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--brand-green)', fontWeight: '800' }}>Ingredients:</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedQuickProduct.ingredientsList.map((ing, i) => (
                  <span key={i} style={{ background: '#fff', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '700', color: 'var(--brand-green)' }}>
                    ✓ {ing}
                  </span>
                ))}
              </div>
            </div>
            <button
              className="btn-primary-kiro"
              onClick={() => {
                setSelectedQuickProduct(null);
                navigate('/contact');
              }}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              INQUIRE FOR BULK ORDER →
            </button>
          </div>
        </div>
      )}

      {activeModalImage && (
        <div className="modal-overlay" onClick={() => setActiveModalImage(null)}>
          <div className="modal-content-card" style={{ maxWidth: '800px', background: 'transparent', boxShadow: 'none' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" style={{ background: '#fff' }} onClick={() => setActiveModalImage(null)}>
              <CloseIcon />
            </button>
            <img src={activeModalImage} alt="Enlarged View" style={{ width: '100%', height: 'auto', borderRadius: '18px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      )}
    </div>
  );
}
