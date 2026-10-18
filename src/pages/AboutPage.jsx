import React from 'react';
import { whyChooseUs, comparisonData } from '../data/siteData';

export default function AboutPage() {
  return (
    <div>
      {/* 5. About & Heritage Section */}
      <section className="section-wrapper">
        <div className="about-layout-grid">
          <div>
            <span className="section-sub-title">Authentic Chhattisgarhi Kitchen</span>
            <h2 className="section-main-title">Crafting Traditional Taste with Modern Hygiene</h2>
            <p className="about-lead-text">
              At Raavi Enterprises, we bring authentic Chhattisgarhi food heritage directly from Bhilai farmlands into your kitchen.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px' }}>
              Chilla and Fara are beloved regional staples. By combining high-grade rice flours and pulse bases with precise spice formulation, we ensure fast, clean, and nutritious home cooking without any artificial additive or maida fillers.
            </p>
            <div className="about-stat-row">
              <div className="stat-box">
                <span className="stat-num">100%</span>
                <span className="stat-label">Farm Sourced</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">0%</span>
                <span className="stat-label">Maida / Fillers</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">Bhilai</span>
                <span className="stat-label">Manufacturing Unit</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--brand-sage)', padding: '36px', borderRadius: '24px', border: '1px solid var(--line)' }}>
            <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', color: 'var(--brand-green)', marginBottom: '16px' }}>
              The Raavi Enterprises Promise
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ padding: '12px 0', borderBottom: '1px dashed var(--line)', fontSize: '15px', color: '#444' }}>
                🌾 <strong>Sourced from Local Farmers:</strong> Directly supporting Chhattisgarh regional growers.
              </li>
              <li style={{ padding: '12px 0', borderBottom: '1px dashed var(--line)', fontSize: '15px', color: '#444' }}>
                🥣 <strong>Authentic Spice Ratios:</strong> Traditional kitchen recipe formulas.
              </li>
              <li style={{ padding: '12px 0', fontSize: '15px', color: '#444' }}>
                🛡️ <strong>Certified Facility:</strong> Hygienically processed in FSSAI registered unit.
              </li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="section-header-center" style={{ marginTop: '60px' }}>
          <span className="section-sub-title">Core Principles</span>
          <h2 className="section-main-title">Why Choose Shree Dhaan?</h2>
        </div>
        <div className="why-us-grid">
          {whyChooseUs.map((w, idx) => (
            <div key={idx} className="why-us-card">
              <h3 className="why-us-title">{w.title}</h3>
              <p className="why-us-desc">{w.description}</p>
            </div>
          ))}
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
    </div>
  );
}
