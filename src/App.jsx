const highlights = [
  {
    title: 'Ready-to-cook products',
    text: 'Cereals and pulse-based instant food mixes and batters designed for fast, home-style cooking.',
  },
  {
    title: 'Brand-first packaging',
    text: 'Bold packaging language, clean labeling, and visually distinct product variants for shelf appeal.',
  },
  {
    title: 'Based in Bhilai',
    text: 'Shivaji Nagar, Camp-2, Power House, Bhilai, Durg, Chhattisgarh - 490001.',
  },
];

const base = import.meta.env.BASE_URL;
const assetUrl = (path) => `${base}${path}`;

const products = [
  {
    name: 'Instant Chhattisgarhi Spicy Chilla Mix',
    image: assetUrl('assets/spicy-chilla.jpeg'),
    accent: 'Spicy',
    description:
      'A high-impact variant with strong shelf presence, quick preparation, and a bold, masaledar identity.',
  },
  {
    name: 'Instant Chhattisgarhi Super Desi Chilla Mix',
    image: assetUrl('assets/super-desi-chilla.jpeg'),
    accent: 'Super Desi',
    description:
      'A traditional-looking variant built around rustic positioning and everyday utility.',
  },
  {
    name: 'Instant Chhattisgarhi Classic Chilla Mix',
    image: assetUrl('assets/classic-chilla.jpeg'),
    accent: 'Classic',
    description:
      'A clean, familiar option for buyers who want a simple and dependable ready-to-cook mix.',
  },
  {
    name: 'Packaging Format',
    image: assetUrl('assets/chilla-packaging-4.jpeg'),
    accent: 'Premium Pack',
    description:
      'A fourth pack view for showcasing the product family and keeping the website visually rich.',
  },
];

const processSteps = [
  'Mix the batter with water until smooth.',
  'Heat the pan on medium flame and apply oil.',
  'Pour one cup of batter and spread evenly.',
  'Cover and cook, then flip after setting.',
  'Serve hot with chutney or your preferred sides.',
];

const credentials = [
  {
    label: 'FSSAI',
    value: 'Reg. No. 2052605000110',
  },
  {
    label: 'Udyam',
    value: 'Registration certificate available',
  },
  {
    label: 'Contact',
    value: '+91 9109002098',
  },
  {
    label: 'Email',
    value: 'raavisince1999@gmail.com',
  },
];

function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-mark">RE</div>
        <div className="topbar-copy">
          <span className="eyebrow">Raavi Enterprises</span>
          <span className="topbar-subtitle">Ready-to-cook mixes and batters from Chhattisgarh</span>
        </div>
        <a className="topbar-link" href="#contact">
          Contact us
        </a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-badge">Since 1999</div>
            <h1>Raavi Enterprises</h1>
            <p className="hero-lead">
              Manufacturing and packaging ready-to-cook cereals and pulse-based instant food mixes,
              with a strong focus on chilla mixes built for quick, tasty, everyday cooking.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#products">
                Explore products
              </a>
              <a className="button button-secondary" href="#certificates">
                View certificates
              </a>
            </div>
            <div className="credential-grid">
              {credentials.map((item) => (
                <div className="credential-card" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <img className="hero-image" src={assetUrl('assets/front.jpeg')} alt="Raavi Enterprises identity card" />
            <div className="hero-glass hero-glass-left">
              <span>Manufacturing focus</span>
              <strong>Ready-to-cook cereals and pulse-based mixes</strong>
            </div>
            <div className="hero-glass hero-glass-right">
              <span>Product family</span>
              <strong>Spicy, Super Desi, Classic</strong>
            </div>
          </div>
        </section>

        <section className="section section-lime">
          <div className="section-heading">
            <span className="eyebrow">Brand snapshot</span>
            <h2>Built around a clean manufacturing story and bold food packaging visuals</h2>
          </div>
          <div className="highlights">
            {highlights.map((item) => (
              <article className="highlight-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="products">
          <div className="section-heading">
            <span className="eyebrow">Product showcase</span>
            <h2>Instant chilla mixes presented like a premium catalog</h2>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <span className="product-tag">{product.accent}</span>
                </div>
                <div className="product-copy">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-dark">
          <div className="section-heading">
            <span className="eyebrow">Preparation method</span>
            <h2>Fast cooking flow, inspired by the packaging instructions</h2>
          </div>
          <div className="steps">
            {processSteps.map((step, index) => (
              <div className="step-card" key={step}>
                <div className="step-number">0{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="certificates">
          <div className="section-heading">
            <span className="eyebrow">Certificates and documents</span>
            <h2>Keep the trust layer visible on the website</h2>
          </div>
          <div className="documents">
            <a className="document-card" href={assetUrl('assets/Registration.pdf')} target="_blank" rel="noreferrer">
              <span>Registration</span>
              <strong>Business registration document</strong>
              <p>Open the supplied PDF in a new tab.</p>
            </a>
            <a
              className="document-card"
              href={assetUrl('assets/Print_Udyam_Registration_Certificate.PDF')}
              target="_blank"
              rel="noreferrer"
            >
              <span>Udyam</span>
              <strong>Udyam registration certificate</strong>
              <p>Open the supplied certificate PDF in a new tab.</p>
            </a>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-copy">
            <span className="eyebrow">Contact</span>
            <h2>Raavi Enterprises, Bhilai</h2>
            <p>
              Shivaji Nagar, Camp-2, Power House, Bhilai, Durg, Chhattisgarh, Pin 490001.
            </p>
            <div className="contact-actions">
              <a className="button button-primary" href="tel:+919109002098">
                Call now
              </a>
              <a className="button button-secondary" href="mailto:raavisince1999@gmail.com">
                Email us
              </a>
            </div>
          </div>
          <div className="contact-panel">
            <div>
              <span>Mobile</span>
              <strong>+91 9109002098</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>raavisince1999@gmail.com</strong>
            </div>
            <div>
              <span>Address</span>
              <strong>Shivaji Nagar, Camp-2, Power House, Bhilai</strong>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Raavi Enterprises</span>
        <span>Ready-to-cook food mixes and batters</span>
      </footer>
    </div>
  );
}

export default App;
