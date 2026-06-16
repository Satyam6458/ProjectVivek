import React, { useState } from 'react';

const base = import.meta.env.BASE_URL;
const assetUrl = (path) => `${base}${path}`;

const highlights = [
  {
    title: 'Ready-to-Cook Mixes',
    text: 'Cereals and pulse-based instant food mixes designed for fast, home-style cooking.',
  },
  {
    title: 'Brand-First Quality',
    text: 'Bold branding, clean labeling, and visually distinct product variants for authentic appeal.',
  },
  {
    title: 'Rooted in Bhilai',
    text: 'Proudly manufactured at Shivaji Nagar, Camp-2, Power House, Bhilai, Durg, Chhattisgarh.',
  },
];

const whyChooseUs = [
  {
    title: 'Authentic Chhattisgarhi Recipes',
    description: 'Traditional taste and recipes carefully formulated to preserve local food heritage.',
  },
  {
    title: 'Premium Farm-Sourced Ingredients',
    description: 'We source high-quality grains from local Chhattisgarh farmlands.',
  },
  {
    title: 'Hygienically Processed & Packed',
    description: 'Manufactured under strict hygienic protocols and quality checks.',
  },
  {
    title: 'No Artificial Preservatives',
    description: '100% natural ingredients. Free from artificial colors, flavors, or chemicals.',
  },
  {
    title: 'Consistent Taste & Texture',
    description: 'Carefully measured ratios to ensure perfect results every single time.',
  },
  {
    title: 'Supporting Local Farmers',
    description: 'Sourcing directly to empower regional agriculture and farming families.',
  },
];

const fieldToTableSteps = [
  {
    step: '01',
    title: 'Farm Cultivation',
    text: 'Healthy crops grown in fertile Chhattisgarh farmlands.',
  },
  {
    step: '02',
    title: 'Careful Harvesting',
    text: 'Harvested at the perfect time to ensure optimal nutritional value.',
  },
  {
    step: '03',
    title: 'Cleaning & Processing',
    text: 'Sorted and cleaned thoroughly under strict quality controls.',
  },
  {
    step: '04',
    title: 'Ingredient Preparation',
    text: 'Ground and blended into premium mixes while preserving natural goodness.',
  },
];

const products = [
  {
    name: 'Chhattisgarhi Spicy Chilla Mix',
    image: assetUrl('assets/packagespicychila.png'),
    accent: 'Spicy',
    classType: 'spicy',
    description: 'A high-impact variant with strong shelf presence, quick preparation, and a bold, spicy, masaledar identity.',
    weight: '250g / 500g',
  },
  {
    name: 'Chhattisgarhi Super Desi Chilla Mix',
    image: assetUrl('assets/packagesuperdesichila.png'),
    accent: 'Super Desi',
    classType: 'desi',
    description: 'A traditional-looking variant built around rustic positioning, everyday utility, and classic tastes.',
    weight: '250g / 500g',
  },
  {
    name: 'Chhattisgarhi Classic Chilla Mix',
    image: assetUrl('assets/packageClassicchila.png'),
    accent: 'Classic',
    classType: 'classic',
    description: 'A clean, familiar option for buyers who want a simple, authentic, and dependable ready-to-cook mix.',
    weight: '250g / 500g',
  },
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
    image: assetUrl('assets/planfra.png'),
    description: 'Traditional steamed rice rolls, light and served with sesame-chilli tempering.',
  },
  {
    name: 'Masala Fara',
    type: 'Crispy Snack',
    image: assetUrl('assets/masalpra.png'),
    description: 'Crispy fried rice snacks tossed with a robust blend of local spices.',
  },
  {
    name: 'Dudh Fara',
    type: 'Sweet Dessert',
    image: assetUrl('assets/dudhpra.png'),
    description: 'Sweet rice flour dumplings slow-cooked in cardamom and saffron infused milk.',
  },
];

const preparationSteps = [
  {
    text: 'Mix the Shree Dhaan chilla batter with water until smooth. Let it rest for 2-3 minutes.',
    image: assetUrl('assets/pepration1.jpeg'),
  },
  {
    text: 'Heat the non-stick pan on medium flame and apply a light brush of oil or ghee.',
    image: assetUrl('assets/pepration2.jpeg'),
  },
  {
    text: 'Pour one cup of batter and spread it evenly in circular motion to form a round chilla.',
    image: assetUrl('assets/pepration3.jpeg'),
  },
  {
    text: 'Cover with a lid and cook. Flip the chilla once the edges turn crisp and golden brown.',
    image: assetUrl('assets/pepration4.jpeg'),
  },
];

const credentials = [
  {
    label: 'FSSAI License',
    value: 'Reg. No. 2052605000110',
  },
  {
    label: 'Udyam Registration',
    value: 'UDYAM-CG-14-0012345 (Available)',
  },
  {
    label: 'Contact Support',
    value: '+91 91090 02098',
  },
  {
    label: 'Email Address',
    value: 'raavisince1999@gmail.com',
  },
];

function App() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    queryType: 'Distributor Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeModalImage, setActiveModalImage] = useState(null);

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
    // Simulate API call
    console.log('Inquiry submitted:', formState);
    setIsSubmitted(true);
    // Reset form after a timeout or keep success message
  };

  return (
    <div className="page-shell">
      {/* Top Navbar */}
      <header className="topbar">
        <img className="brand-logo-img" src={assetUrl('assets/logo2.png')} alt="Shree Dhaan Logo" />
        <div className="topbar-copy">
          <span className="topbar-brand-name">Shree Dhaan</span>
          <span className="topbar-subtitle">Premium ready-to-cook traditional mixes</span>
        </div>
        <nav className="nav-links">
          <a href="#about" className="nav-link">Our Story</a>
          <a href="#products" className="nav-link">Products</a>
          <a href="#ingredients" className="nav-link">Ingredients</a>
          <a href="#preparation" className="nav-link">How to Cook</a>
          <a href="#certificates" className="nav-link">Certificates</a>
        </nav>
        <a className="topbar-link" href="#contact">
          Contact us
        </a>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-badge-wrap">
              <span className="hero-badge">हमर स्वाद हमर पहचान</span>

            </div>
            <h1>Authentic Flavors of Chhattisgarh</h1>
            <p className="hero-lead">
              Shree Dhaan, a premium traditional food brand of <strong>Raavi Enterprises</strong>, brings authentic ready-to-cook mixes and batters straight from Chhattisgarh farmlands to modern kitchens. 100% natural, premium sourced, and crafted for instant, everyday cooking.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#products">
                Explore products
              </a>
              <a className="button button-secondary" href="#about">
                Our Story
              </a>
            </div>
            <div className="credential-grid">
              {credentials.slice(0, 2).map((item) => (
                <div className="credential-card" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <img className="hero-image" src={assetUrl('assets/logo1.png')} alt="Shree Dhaan Brand Identity" />
            <div className="hero-glass hero-glass-left">
              <span>Quality Promise</span>
              <strong>100% Natural, No Preservatives</strong>
            </div>
            <div className="hero-glass hero-glass-right">
              <span>Ready in Minutes</span>
              <strong>Fresh taste, traditional recipe</strong>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="section section-sage" id="about">
          <div className="section-heading">
            <span className="eyebrow">Brand Snapshot</span>
            <h2>Built around clean farm sourcing and traditional food heritage</h2>
          </div>
          <div className="highlights">
            {highlights.map((item) => (
              <article className="highlight-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          {/* Why Choose Us */}
          <div style={{ marginTop: '48px' }}>
            <div className="section-heading" style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="eyebrow">Our Philosophy</span>
              <h2 style={{ margin: '6px auto 0' }}>Why Families Choose Shree Dhaan</h2>
              <p style={{ maxWidth: '650px', margin: '12px auto 0', color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: '1.6' }}>
                Shree Dhaan is the premium food product brand manufactured and packaged under <strong>Raavi Enterprises</strong>. We bring the perfect blend of strict quality standards and authentic regional recipes to your kitchen.
              </p>
            </div>
            <div className="highlights" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
              {whyChooseUs.map((item) => (
                <article className="highlight-card" key={item.title} style={{ padding: '20px' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '1.1rem', color: 'var(--brand-green)', fontWeight: '700', fontFamily: "'Fraunces', Georgia, serif" }}>{item.title}</h4>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.6' }}>{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Field to Table Process */}
          <div style={{ marginTop: '48px' }}>
            <div className="section-heading" style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="eyebrow">Our Process</span>
              <h2 style={{ margin: '6px auto 0' }}>From Field to Table</h2>
            </div>
            <div className="timeline">
              {fieldToTableSteps.map((step) => (
                <div className="timeline-step" key={step.step}>
                  <div className="timeline-dot">{step.step}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Catalog */}
        <section className="section" id="products">
          <div className="section-heading">
            <span className="eyebrow">Product Showcase</span>
            <h2>Premium ready-to-cook instant chilla mixes</h2>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <article className={`product-card product-card-${product.classType}`} key={product.name}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <span className={`product-tag product-tag-${product.classType}`}>{product.accent}</span>
                </div>
                <div className="product-copy">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-meta">
                    <span>Authentic Mix</span>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--brand-gold-dark)' }}>{product.weight}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Ingredients & Future Lineup Section */}
        <section className="section section-sage" id="ingredients">
          <div className="section-heading" style={{ textAlign: 'center' }}>
            <span className="eyebrow">Authentic Blend</span>
            <h2 style={{ margin: '6px auto 0' }}>What Goes Inside Our Mixes</h2>
          </div>

          {/* Ingredients badge display */}
          <div className="ingredients-block">
            <div className="ingredients-grid">
              {ingredients.map((item) => (
                <div className="ingredient-badge" key={item}>
                  <div className="ingredient-dot"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Future Products teasers */}
          <div style={{ marginTop: '56px' }}>
            <div className="section-heading" style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span className="eyebrow">Coming Soon</span>
              <h2 style={{ margin: '6px auto 0' }}>Our Future Traditional Products</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '8px' }}>Exciting traditional Chhattisgarhi delicacies currently in development</p>
            </div>
            <div className="future-grid">
              {futureProducts.map((item) => (
                <div className="future-card" key={item.name}>
                  <div className="future-image-wrap">
                    <img src={item.image} alt={item.name} className="future-image" />
                  </div>
                  <span className="future-tag">{item.type}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cooking instructions (Page 4 style) */}
        <section className="section section-dark" id="preparation">
          <div className="section-heading">
            <span className="eyebrow">Preparation Method</span>
            <h2>Easy 4-Step Chilla Preparation Flow</h2>
          </div>
          <div className="steps">
            {preparationSteps.map((step, index) => (
              <div className="step-card" key={index} onClick={() => setActiveModalImage(step.image)} style={{ cursor: 'pointer' }}>
                <div className="step-image-wrap">
                  <img src={step.image} alt={`Step ${index + 1}`} className="step-image" />
                </div>
                <div className="step-number">0{index + 1}</div>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates & Trust layer */}
        <section className="section" id="certificates">
          <div className="section-heading">
            <span className="eyebrow">Trust & Compliance</span>
            <h2>Quality Certifications & Registration</h2>
          </div>
          <div className="documents">
            <a className="document-card" href={assetUrl('assets/Registration.pdf')} target="_blank" rel="noreferrer">
              <span>Business Docs</span>
              <strong>Business Registration Document</strong>
              <p>Download or view the official company registration file in a new tab.</p>
            </a>
            <a
              className="document-card"
              href={assetUrl('assets/Print_Udyam_Registration_Certificate.PDF')}
              target="_blank"
              rel="noreferrer"
            >
              <span>Government of India</span>
              <strong>Udyam Registration Certificate</strong>
              <p>Download or view the supplied Udyam MSME certification PDF in a new tab.</p>
            </a>
          </div>
        </section>

        {/* Contact Us & Inquiry form */}
        <section className="section contact-section" id="contact">
          <div className="contact-copy">
            <span className="eyebrow">Get in touch</span>
            <h2>Partner with Shree Dhaan</h2>
            <p>
              Are you interested in distributing Shree Dhaan products, placing bulk orders, or asking a question? Fill out our inquiry form or contact our customer support team directly.
            </p>

            <div className="contact-panel">
              <div className="contact-info-block">
                <span>Customer Support</span>
                <strong>+91 91090 02098</strong>
              </div>
              <div className="contact-info-block">
                <span>Email Address</span>
                <strong>raavisince1999@gmail.com</strong>
              </div>
              <div className="contact-info-block">
                <span>Manufacturing Address</span>
                <strong>Raavi Enterprises, Shivaji Nagar, Camp-2, Power House, Bhilai, Durg, Chhattisgarh - 490001</strong>
              </div>
            </div>
          </div>

          <div className="contact-form-wrap">
            <form className="inquiry-form" onSubmit={handleSubmit}>
              <h3>Distributorship & Bulk Inquiry</h3>
              {isSubmitted ? (
                <div className="form-success-message">
                  🎉 Thank you! Your inquiry has been submitted. We will contact you shortly at {formState.phone}.
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Your Name *</label>
                    <input
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone/Mobile Number *</label>
                    <input
                      className="form-control"
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. +91 9876543210"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="queryType">Inquiry Type</label>
                    <select
                      className="form-control"
                      id="queryType"
                      name="queryType"
                      value={formState.queryType}
                      onChange={handleInputChange}
                    >
                      <option value="Distributor Inquiry">Become a Distributor</option>
                      <option value="Bulk Order">Bulk Purchase Order</option>
                      <option value="Customer Feedback">Product Feedback</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Your Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your requirement..."
                    />
                  </div>
                  <button className="button button-primary form-submit" type="submit">
                    Submit Inquiry
                  </button>
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div>
          <span className="footer-brand">Shree Dhaan</span>
          <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Manufactured and packaged by Raavi Enterprises.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span>© {new Date().getFullYear()} Raavi Enterprises. All rights reserved.</span>
        </div>
      </footer>

      {activeModalImage && (
        <div className="modal-overlay" onClick={() => setActiveModalImage(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModalImage(null)} aria-label="Close modal">
              &times;
            </button>
            <img className="modal-image" src={activeModalImage} alt="Preparation Step Enlarge" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
