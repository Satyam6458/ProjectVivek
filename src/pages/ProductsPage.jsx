import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/siteData';

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function ProductsPage() {
  const [selectedQuickProduct, setSelectedQuickProduct] = useState(null);
  const [activeModalImage, setActiveModalImage] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="section-wrapper section-sage-bg">
      <div className="section-header-center">
        <span className="section-sub-title">Shree Dhaan Products</span>
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
    </section>
  );
}
