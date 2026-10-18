import React, { useState } from 'react';
import { preparationSteps, ingredients, futureProducts } from '../data/siteData';

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function HowToCookPage() {
  const [activeModalImage, setActiveModalImage] = useState(null);

  return (
    <div>
      {/* 8. Ingredients & Future Lineup */}
      <section className="section-wrapper section-sage-bg">
        <div className="section-header-center">
          <span className="section-sub-title">Product Expansion</span>
          <h2 className="section-main-title">Traditional Fara Product Range</h2>
        </div>

        <div className="future-products-grid">
          {futureProducts.map((item, idx) => (
            <div key={idx} className="future-product-card" style={{ padding: '24px', background: '#ffffff', borderRadius: '18px', border: '1px dashed var(--brand-gold)' }}>
              <div className="future-img-wrap" style={{ marginBottom: '14px' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }} />
              </div>
              <span className="product-chip" style={{ background: '#fff9e6', color: 'var(--brand-gold-dark)', border: '1px solid var(--brand-gold)' }}>
                {item.type}
              </span>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.3rem', color: 'var(--brand-green)', margin: '10px 0 6px' }}>
                {item.name}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="section-header-center" style={{ marginTop: '56px' }}>
          <span className="section-sub-title">Pure & Simple</span>
          <h2 className="section-main-title">Key Natural Ingredients</h2>
        </div>

        <div className="ingredient-tags-grid">
          {ingredients.map((ing, i) => (
            <span key={i} className="ingredient-tag-pill">
              <span className="ingredient-dot-gold"></span>
              {ing}
            </span>
          ))}
        </div>
      </section>

      {/* 9. 10-Minute Recipe Cooking Flow */}
      <section className="section-wrapper section-dark-bg" id="preparation">
        <div className="section-header-center">
          <span className="section-sub-title">10-MINUTE RECIPE</span>
          <h2 className="section-main-title">How To Prepare Shree Dhaan Chilla</h2>
        </div>

        <div className="recipe-steps-grid">
          {preparationSteps.map((step, idx) => (
            <div key={idx} className="recipe-step-card" onClick={() => setActiveModalImage(step.image)} title="Click to view full image">
              <div className="recipe-img-wrap">
                <img src={step.image} alt={`Step ${idx + 1}`} />
              </div>
              <div className="recipe-step-num">Step 0{idx + 1}</div>
              <p className="recipe-step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enlarged Step Modal */}
      {activeModalImage && (
        <div className="modal-overlay" onClick={() => setActiveModalImage(null)}>
          <div className="modal-content-card" style={{ maxWidth: '800px', background: 'transparent', boxShadow: 'none' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" style={{ background: '#fff' }} onClick={() => setActiveModalImage(null)}>
              <CloseIcon />
            </button>
            <img src={activeModalImage} alt="Recipe Step Enlarged" style={{ width: '100%', height: 'auto', borderRadius: '18px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      )}
    </div>
  );
}
