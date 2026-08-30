import React, { useState } from 'react';

// Direct ES Module Imports for 100% Guaranteed Asset Bundling & Zero 404s
import logo2Img from './assets/logo2.png';
import logo1Img from './assets/logo1.png';
import spicyChillaImg from './assets/packagespicychila.png';
import superDesiChillaImg from './assets/packagesuperdesichila.png';
import classicChillaImg from './assets/packageClassicchila.png';
import planFraImg from './assets/planfra.png';
import masalaPraImg from './assets/masalpra.png';
import dudhPraImg from './assets/dudhpra.png';
import pepration1Img from './assets/pepration1.jpeg';
import pepration2Img from './assets/pepration2.jpeg';
import pepration3Img from './assets/pepration3.jpeg';
import pepration4Img from './assets/pepration4.jpeg';
import registrationPdf from './assets/Registration.pdf?url';
import udyamPdf from './assets/Print_Udyam_Registration_Certificate.PDF?url';

// SVG Icons for clean, crisp rendering
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const highlights = [
  {
    title: 'Ready-to-Cook Mixes',
    text: 'Cereals and pulse-based instant food mixes designed for fast, home-style cooking in under 10 minutes.',
  },
  {
    title: 'Brand-First Quality',
    text: 'Bold branding, clean labeling, and visually distinct product variants for authentic culinary appeal.',
  },
  {
    title: 'Rooted in Bhilai',
    text: 'Proudly manufactured at Shivaji Nagar, Camp-2, Power House, Bhilai, Durg, Chhattisgarh.',
  },
];

const whyChooseUs = [
  {
    title: 'Authentic Chhattisgarhi Recipes',
    description: 'Traditional taste and heritage recipes formulated to preserve true regional food identity.',
  },
  {
    title: 'Premium Farm-Sourced Ingredients',
    description: 'We source high-quality grains directly from local Chhattisgarh farmlands.',
  },
  {
    title: 'Hygienically Processed & Packed',
    description: 'Manufactured under strict hygienic protocols and multi-stage quality checks.',
  },
  {
    title: 'No Artificial Preservatives',
    description: '100% natural ingredients. Free from artificial colors, chemical flavors, or additives.',
  },
  {
    title: 'Consistent Taste & Texture',
    description: 'Carefully measured ratios to ensure perfect, crispy results every single time.',
  },
  {
    title: 'Supporting Local Farmers',
    description: 'Sourcing directly to empower regional agriculture and local farming families.',
  },
];

const trustFeatures = [
  {
    icon: '🌾',
    title: '100% Grain Mix',
    subtitle: 'Pure rice & pulse flours',
  },
  {
    icon: '⚡',
    title: 'Cook in 10 Mins',
    subtitle: 'Quick & effortless meal',
  },
  {
    icon: '🚫',
    title: 'Zero Maida',
    subtitle: 'No preservatives added',
  },
  {
    icon: '🏆',
    title: 'FSSAI Certified',
    subtitle: 'Strict quality control',
  },
];

const products = [
  {
    id: 'spicy',
    name: 'Chhattisgarhi Spicy Chilla Mix',
    image: spicyChillaImg,
    accent: 'Spicy',
    rating: '4.9',
    reviews: '142 reviews',
    description: 'A high-impact variant with strong shelf presence, quick preparation, and a bold, spicy, masaledar identity.',
    weight: '250g / 500g',
    bullets: ['Bold Masala Flavor', '10-Min Instant Cook', 'High Protein & Fiber'],
    ingredientsList: ['New Rice Flour', 'Besan (Gram Flour)', 'Chilli Flakes', 'Jeera Powder', 'Garlic Powder', 'Coriander', 'Salt'],
  },
  {
    id: 'desi',
    name: 'Chhattisgarhi Super Desi Chilla Mix',
    image: superDesiChillaImg,
    accent: 'Super Desi',
    rating: '5.0',
    reviews: '215 reviews',
    description: 'A traditional-looking variant built around rustic positioning, everyday utility, and classic tastes.',
    weight: '250g / 500g',
    bullets: ['Rustic Regional Flavor', 'Perfect Crispiness', '100% Natural Ingredients'],
    ingredientsList: ['New Rice Flour', 'Besan', 'Coriander Leaves', 'Jeera', 'Traditional Spices', 'Salt'],
  },
  {
    id: 'classic',
    name: 'Chhattisgarhi Classic Chilla Mix',
    image: classicChillaImg,
    accent: 'Classic',
    rating: '4.8',
    reviews: '98 reviews',
    description: 'A clean, familiar option for buyers who want a simple, authentic, and dependable ready-to-cook mix.',
    weight: '250g / 500g',
    bullets: ['Mild & Authentic', 'Family Favorite', 'No Preservatives'],
    ingredientsList: ['New Rice Flour', 'Besan', 'Mild Spices', 'Coriander', 'Rock Salt'],
  },
];

const comparisonData = [
  { feature: 'Primary Base', shreeDhaan: '100% Natural Grains & Pulses', market: 'Often blended with Maida or starch' },
  { feature: 'Artificial Preservatives', shreeDhaan: '0% Preservatives & Colors', market: 'Contains chemical stabilizers' },
  { feature: 'Recipe Origin', shreeDhaan: 'Authentic Chhattisgarhi Heritage', market: 'Generic commercial mix' },
  { feature: 'Preparation Time', shreeDhaan: 'Ready in 10 Minutes', market: '15-20 minutes with added steps' },
  { feature: 'Farm Traceability', shreeDhaan: 'Direct Chhattisgarh Farmlands', market: 'Mass commercial sourcing' },
];

const ingredients = [
  'New Rice Flour',
  'Besan (Gram Flour)',
  'Coriander Leaves',
  'Chilli Flakes',
  'Jeera Powder',
  'Garlic Powder',
  'Salt',
];

const futureProducts = [
  {
    name: 'Plain Fara',
    type: 'Steamed Snack',
    image: planFraImg,
    description: 'Traditional steamed rice rolls, light and served with sesame-chilli tempering.',
  },
  {
    name: 'Masala Fara',
    type: 'Crispy Snack',
    image: masalaPraImg,
    description: 'Crispy fried rice snacks tossed with a robust blend of local spices.',
  },
  {
    name: 'Dudh Fara',
    type: 'Sweet Dessert',
    image: dudhPraImg,
    description: 'Sweet rice flour dumplings slow-cooked in cardamom and saffron infused milk.',
  },
];

const preparationSteps = [
  {
    text: 'Mix the Shree Dhaan chilla batter with water until smooth. Let it rest for 2-3 minutes.',
    image: pepration1Img,
  },
  {
    text: 'Heat the non-stick pan on medium flame and apply a light brush of oil or ghee.',
    image: pepration2Img,
  },
  {
    text: 'Pour one cup of batter and spread it evenly in circular motion to form a round chilla.',
    image: pepration3Img,
  },
  {
    text: 'Cover with a lid and cook. Flip the chilla once the edges turn crisp and golden brown.',
    image: pepration4Img,
  },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState(null);
  const [selectedQuickProduct, setSelectedQuickProduct] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    queryType: 'Distributor Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) {
      alert('Please fill in your Name and Phone Number.');
      return;
    }
    console.log('Inquiry submitted:', formState);
    setIsSubmitted(true);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <div className="page-wrapper">
      {/* 1. Top Announcement Bar */}
      <div className="top-notification-bar">
        <div className="container">
          <div className="announcement-text">
            <span className="announcement-pill">FREE SHIPPING</span>
            <span>🌱 <strong>SHREE DHAAN</strong> Chhattisgarhi Premixes • 100% Natural</span>
          </div>
          <div className="announcement-links">
            <a href="tel:+919109002098" className="announcement-link">
              <PhoneIcon /> Support: +91 91090 02098
            </a>
            <a href="mailto:raavisince1999@gmail.com" className="announcement-link">
              <MailIcon /> raavisince1999@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <header className="header-main-area">
        <div className="header-container">
          <a href="#" className="logo-wrap">
            <img src={logo2Img} alt="Shree Dhaan Logo" />
            <div className="logo-text-box">
              <span className="logo-brand-title">Shree Dhaan</span>
              <span className="logo-brand-subtitle">by Raavi Enterprises</span>
            </div>
          </a>

          <nav className="main-navigation">
            <ul className="main-menu-list">
              <li><a href="#products" className="main-menu-link">CHILLA MIXES</a></li>
              <li><a href="#about" className="main-menu-link">OUR STORY</a></li>
              <li><a href="#comparison" className="main-menu-link">WHY US</a></li>
              <li><a href="#ingredients" className="main-menu-link">INGREDIENTS</a></li>
              <li><a href="#preparation" className="main-menu-link">HOW TO COOK</a></li>
              <li><a href="#certificates" className="main-menu-link">CERTIFICATES</a></li>
              <li><a href="#contact" className="main-menu-link">CONTACT</a></li>
            </ul>
          </nav>

          <div className="header-right-actions">
            <button className="header-action-btn" title="Search Products" onClick={() => {
              const el = document.getElementById('products');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              <SearchIcon />
            </button>
            <button className="header-action-btn" title="Account" onClick={() => alert('Customer portal.')}>
              <UserIcon />
            </button>
            <button className="header-action-btn" title="Wishlist" onClick={() => alert('Products added to wishlist.')}>
              <HeartIcon />
            </button>
            <button className="header-action-btn cart-btn-mobile" title="Inquiry Cart" onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              <CartIcon />
              <span className="cart-count-badge">0</span>
            </button>
            <a href="#contact" className="header-cta-btn">
              INQUIRE NOW →
            </a>
            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(true)} aria-label="Open mobile menu">
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer & Overlay */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <div className={`mobile-drawer ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="logo-text-box">
            <span className="logo-brand-title">Shree Dhaan</span>
            <span className="logo-brand-subtitle">Raavi Enterprises</span>
          </div>
          <button className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <div className="mobile-menu-links">
          <a href="#products" onClick={() => setMobileMenuOpen(false)}>CHILLA MIXES</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>OUR STORY</a>
          <a href="#comparison" onClick={() => setMobileMenuOpen(false)}>WHY CHOOSE US</a>
          <a href="#ingredients" onClick={() => setMobileMenuOpen(false)}>INGREDIENTS</a>
          <a href="#preparation" onClick={() => setMobileMenuOpen(false)}>HOW TO COOK</a>
          <a href="#certificates" onClick={() => setMobileMenuOpen(false)}>CERTIFICATES</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>CONTACT & INQUIRY</a>
        </div>
        <a href="#contact" className="header-cta-btn mobile-drawer-cta" onClick={() => setMobileMenuOpen(false)}>
          INQUIRE NOW →
        </a>
        <div className="mobile-drawer-footer">
          <p style={{ margin: 0 }}>📞 +91 91090 02098</p>
          <p style={{ margin: '4px 0 0' }}>✉️ raavisince1999@gmail.com</p>
        </div>
      </div>

      <main>
        {/* 3. Hero Section */}
        <section className="hero-wrapper">
          <div className="hero-container">
            <div>

              <h1 className="hero-heading">Instant Traditional Chilla Mix in 10 Minutes</h1>
              <p className="hero-description">
                Buy <strong>Shree Dhaan Chilla Mixes</strong> online — 100% natural, farm-sourced rice and pulse mixes crafted with traditional Chhattisgarhi heritage. Three clean ingredients, zero maida, no preservatives. FSSAI Certified.
              </p>
              <div className="hero-cta-group">
                <a href="#products" className="btn-primary-kiro">
                  SHOP CHILLA MIXES →
                </a>
                <a href="#contact" className="btn-secondary-kiro">
                  DISTRIBUTORSHIP
                </a>
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
                <span className="floating-badge-val">Ready in 10 Mins</span>
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

        {/* 5. About & Heritage Section */}
        <section className="section-wrapper section-sage-bg" id="about">
          <div className="section-header-center">
            <span className="section-sub-title">Brand Heritage</span>
            <h2 className="section-main-title">Rooted in Farm Sourcing & Food Culture</h2>
          </div>

          <div className="highlights-grid">
            {highlights.map((h, i) => (
              <div key={i} style={{ background: '#ffffff', padding: '28px', borderRadius: '18px', border: '1px solid var(--line)', boxShadow: 'var(--kiro-shadow)' }}>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', color: 'var(--brand-green)', margin: '0 0 10px' }}>{h.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{h.text}</p>
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
              {whyChooseUs.map((w, i) => (
                <div key={i} style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid var(--line)' }}>
                  <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.1rem', color: 'var(--brand-green)', margin: '0 0 8px' }}>{w.title}</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>{w.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Product Showcase Section */}
        <section className="section-wrapper" id="products">
          <div className="section-header-center">
            <span className="section-sub-title">Product Showcase</span>
            <h2 className="section-main-title">Instant Ready-to-Cook Chilla Range</h2>
          </div>

          <div className="products-grid-container">
            {products.map((p) => (
              <div className="kiro-product-card" key={p.id}>
                <div className="product-img-box">
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="product-content-box">
                  <h3 className="product-card-title">{p.name}</h3>
                  <p className="product-card-desc">{p.description}</p>
                  <div className="product-highlights-list">
                    {p.bullets.map((b, i) => (
                      <span key={i} className="product-chip">✓ {b}</span>
                    ))}
                  </div>
                  <div className="product-card-footer">
                    <span className="product-weight-text">Net Weight: {p.weight}</span>
                    <button className="btn-card-action" onClick={() => setSelectedQuickProduct(p)}>
                      QUICK VIEW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Comparison Table */}
        <section className="section-wrapper section-sage-bg" id="comparison">
          <div className="section-header-center">
            <span className="section-sub-title">Quality Standard</span>
            <h2 className="section-main-title">Shree Dhaan vs Market Premixes</h2>
          </div>

          <div className="comparison-container">
            <div className="comparison-scroll-wrapper">
              <table className="kiro-comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="col-shree-dhaan">Shree Dhaan Mixes</th>
                    <th>Standard Market Premixes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((c, i) => (
                    <tr key={i}>
                      <td><strong>{c.feature}</strong></td>
                      <td className="col-shree-dhaan">✓ {c.shreeDhaan}</td>
                      <td>✕ {c.market}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 8. Ingredients & Future Lineup */}
        <section className="section-wrapper" id="ingredients">
          <div className="section-header-center">
            <span className="section-sub-title">100% Natural Recipe</span>
            <h2 className="section-main-title">What Goes Inside Our Mixes</h2>
          </div>

          <div className="ingredient-tags-grid">
            {ingredients.map((ing, i) => (
              <div className="ingredient-tag-pill" key={i}>
                <div className="ingredient-dot-gold"></div>
                {ing}
              </div>
            ))}
          </div>

          {/* Future Products */}
          <div style={{ marginTop: '60px' }}>
            <div className="section-header-center">
              <span className="section-sub-title">Coming Soon</span>
              <h2 className="section-main-title">Future Traditional Lineup</h2>
            </div>

            <div className="future-products-grid">
              {futureProducts.map((f, i) => (
                <div key={i} style={{ background: 'var(--brand-gold-light)', border: '1px dashed var(--brand-gold)', borderRadius: '18px', padding: '20px' }}>
                  <div style={{ height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px', background: '#fff' }}>
                    <img src={f.image} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '800', background: '#fff', color: 'var(--brand-gold-dark)', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase' }}>{f.type}</span>
                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.2rem', color: 'var(--brand-green)', margin: '10px 0 6px' }}>{f.name}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. 10-Minute Recipe Cooking Flow */}
        <section className="section-wrapper section-dark-bg" id="preparation">
          <div className="section-header-center">
            <span className="section-sub-title">10-Minute Recipe</span>
            <h2 className="section-main-title">How To Prepare Shree Dhaan Chilla</h2>
          </div>

          <div className="recipe-steps-grid">
            {preparationSteps.map((step, idx) => (
              <div className="recipe-step-card" key={idx} onClick={() => setActiveModalImage(step.image)}>
                <div className="recipe-img-wrap">
                  <img src={step.image} alt={`Step ${idx + 1}`} />
                </div>
                <div className="recipe-step-num">Step 0{idx + 1}</div>
                <p className="recipe-step-text">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Compliance & Certificates */}
        <section className="section-wrapper" id="certificates">
          <div className="section-header-center">
            <span className="section-sub-title">Trust & Compliance</span>
            <h2 className="section-main-title">Certifications & Business Registration</h2>
          </div>

          <div className="certificates-grid">
            <a href={registrationPdf} target="_blank" rel="noreferrer" style={{ display: 'block', padding: '28px', background: '#fff', borderRadius: '18px', border: '1px solid var(--line)', boxShadow: 'var(--kiro-shadow)' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--brand-gold-dark)', textTransform: 'uppercase' }}>Official Document</span>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: 'var(--brand-green)', margin: '6px 0' }}>Business Registration PDF</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>View or download company registration documents in a new browser tab.</p>
            </a>
            <a href={udyamPdf} target="_blank" rel="noreferrer" style={{ display: 'block', padding: '28px', background: '#fff', borderRadius: '18px', border: '1px solid var(--line)', boxShadow: 'var(--kiro-shadow)' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--brand-gold-dark)', textTransform: 'uppercase' }}>Government MSME</span>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: 'var(--brand-green)', margin: '6px 0' }}>Udyam Certificate PDF</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>View official Government of India Udyam MSME certification file.</p>
            </a>
          </div>
        </section>

        {/* 11. Contact & Inquiry Section */}
        <section className="section-wrapper section-sage-bg" id="contact">
          <div className="contact-layout-grid">
            <div>
              <span className="section-sub-title">Partner With Us</span>
              <h2 className="section-main-title" style={{ marginBottom: '16px' }}>Distributorship & Bulk Purchases</h2>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '28px' }}>
                Are you interested in distributing Shree Dhaan products in your city or placing bulk orders? Fill out our simple inquiry form.
              </p>

              <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid var(--line)' }}>
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--brand-gold-dark)' }}>Support Line</span>
                  <strong style={{ display: 'block', fontSize: '16px', color: 'var(--brand-green)' }}>+91 91090 02098</strong>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--brand-gold-dark)' }}>Email Contact</span>
                  <strong style={{ display: 'block', fontSize: '16px', color: 'var(--brand-green)' }}>raavisince1999@gmail.com</strong>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--brand-gold-dark)' }}>Manufacturing Address</span>
                  <strong style={{ display: 'block', fontSize: '14px', color: 'var(--brand-green)', lineHeight: '1.4' }}>Raavi Enterprises, Shivaji Nagar, Camp-2, Power House, Bhilai, Durg, Chhattisgarh - 490001</strong>
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '32px', borderRadius: '18px', border: '1px solid var(--line)', boxShadow: 'var(--kiro-shadow)' }}>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: 'var(--brand-green)', margin: '0 0 18px' }}>Send Inquiry Message</h3>
              {isSubmitted ? (
                <div style={{ padding: '20px', background: 'var(--brand-sage)', borderRadius: '12px', border: '1px solid var(--brand-sage-dark)', color: 'var(--brand-green)', fontWeight: '700', textAlignment: 'center' }}>
                  🎉 Thank you! Your inquiry has been sent. We will get back to you shortly at {formState.phone}.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Full Name *</label>
                    <input className="newsletter-input" style={{ borderRadius: '10px', width: '100%' }} type="text" name="name" value={formState.name} onChange={handleInputChange} required placeholder="Enter name" />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Phone Number *</label>
                    <input className="newsletter-input" style={{ borderRadius: '10px', width: '100%' }} type="tel" name="phone" value={formState.phone} onChange={handleInputChange} required placeholder="+91 9876543210" />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Inquiry Type</label>
                    <select className="newsletter-input" style={{ borderRadius: '10px', width: '100%' }} name="queryType" value={formState.queryType} onChange={handleInputChange}>
                      <option value="Distributor Inquiry">Become a Regional Distributor</option>
                      <option value="Bulk Order">Bulk Purchase Order</option>
                      <option value="Customer Feedback">Product Feedback</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Message / Requirements</label>
                    <textarea className="newsletter-input" style={{ borderRadius: '10px', width: '100%', minHeight: '80px', resize: 'vertical' }} name="message" value={formState.message} onChange={handleInputChange} placeholder="Details about your city or order..." />
                  </div>
                  <button type="submit" className="btn-primary-kiro" style={{ width: '100%', justifyContent: 'center' }}>
                    SUBMIT INQUIRY →
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

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
              <a href="#instagram" className="social-icon-btn" title="Instagram">📷</a>
              <a href="#youtube" className="social-icon-btn" title="YouTube">▶</a>
              <a href="#whatsapp" className="social-icon-btn" title="WhatsApp">💬</a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-menu-list">
              <li><a href="#products">Chilla Mixes</a></li>
              <li><a href="#about">Our Story</a></li>
              <li><a href="#comparison">Why Choose Us</a></li>
              <li><a href="#ingredients">Ingredients</a></li>
              <li><a href="#preparation">How to Cook</a></li>
              <li><a href="#certificates">Certificates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">POLICIES & DOCS</h4>
            <ul className="footer-menu-list">
              <li><a href={registrationPdf} target="_blank" rel="noreferrer">Business Registration</a></li>
              <li><a href={udyamPdf} target="_blank" rel="noreferrer">Udyam MSME Certificate</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#shipping">Shipping & Returns</a></li>
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
            <span className="payment-badge-pill">FSSAI REG. 2052605000110</span>
          </div>
        </div>
      </footer>

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
            <a href="#contact" className="btn-primary-kiro" onClick={() => setSelectedQuickProduct(null)} style={{ width: '100%', justifyContent: 'center' }}>
              INQUIRE FOR BULK ORDER →
            </a>
          </div>
        </div>
      )}

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

export default App;
