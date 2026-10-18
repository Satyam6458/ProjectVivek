import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import MapModal from '../components/MapModal';

export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMapStore, setSelectedMapStore] = useState(null);

  useEffect(() => {
    let isMounted = true;
    api.stores
      .getAll()
      .then((res) => {
        if (isMounted) {
          if (res && res.data && Array.isArray(res.data)) {
            // Filter to published and active stores for customers
            const activeStores = res.data.filter((s) => s.publish !== false && s.isactive !== false);
            setStores(activeStores.length > 0 ? activeStores : res.data);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch stores live, falling back to local list:', err);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const filteredStores = stores.filter((st) => {
    const q = searchTerm.toLowerCase();
    return (
      st.storename?.toLowerCase().includes(q) ||
      st.fulladdress?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ minHeight: '85vh', background: 'var(--bg-cream)' }}>
      {/* 1. Header Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #11380c 0%, #1f5e18 100%)',
        color: '#ffffff',
        padding: '60px 20px',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{
            display: 'inline-block',
            background: 'var(--brand-gold)',
            color: '#11380c',
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: '20px',
            marginBottom: '12px',
          }}>
            📍 Retail Network
          </span>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: '2.5rem', margin: '0 0 14px', lineHeight: 1.15 }}>
            Find Shree Dhaan in Stores
          </h1>
          <p style={{ fontSize: '15px', color: '#d8e8d5', lineHeight: '1.6', margin: '0 0 24px' }}>
            Looking to purchase ready-to-cook Chilla mixes today? Walk into your nearest partner supermarket, grocery mart, or retail outlet across Bhilai, Durg & Chhattisgarh.
          </p>

          {/* Search Box */}
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            display: 'flex',
            background: '#ffffff',
            borderRadius: '14px',
            padding: '6px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
          }}>
            <input
              type="text"
              placeholder="Search by store name, market, area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '10px 14px',
                fontSize: '14px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--kiro-font-family)',
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ background: 'none', border: 'none', padding: '0 10px', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Stores Grid Section */}
      <section className="section-wrapper" style={{ padding: '50px 20px' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.6rem', color: 'var(--brand-green)', margin: '0 0 4px' }}>
                Authorized Retail Partners ({filteredStores.length})
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Official stockists verified for fresh batches of Shree Dhaan Chilla Mixes.
              </span>
            </div>

            <Link
              to="/contact"
              className="header-cta-btn"
              style={{ padding: '9px 18px', fontSize: '12px', borderRadius: '10px' }}
            >
              Become a Retail Partner →
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <div style={{ width: '40px', height: '40px', border: '4px solid #e2ebd8', borderTopColor: 'var(--brand-green)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
              <p>Locating verified partner stores...</p>
            </div>
          ) : filteredStores.length === 0 ? (
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '48px 24px',
              textAlign: 'center',
              border: '1px solid var(--line)',
              maxWidth: '500px',
              margin: '0 auto',
            }}>
              <span style={{ fontSize: '42px', display: 'block', marginBottom: '12px' }}>🏬</span>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.3rem', color: 'var(--brand-green)', margin: '0 0 8px' }}>
                No Stores Found Matching &ldquo;{searchTerm}&rdquo;
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Try searching for &ldquo;Risali&rdquo;, &ldquo;Shamim&rdquo;, or &ldquo;Bhilai&rdquo;, or view all available outlets.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="header-cta-btn"
                style={{ padding: '8px 18px', fontSize: '12px' }}
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px',
            }}>
              {filteredStores.map((st) => (
                <div
                  key={st._id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    padding: '26px',
                    border: '1px solid var(--line)',
                    boxShadow: 'var(--kiro-shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--kiro-shadow-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--kiro-shadow)';
                  }}
                >
                  <div>
                    {/* Header badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{
                        background: 'var(--brand-sage)',
                        color: 'var(--brand-green)',
                        fontSize: '11px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        border: '1px solid var(--brand-sage-dark)',
                      }}>
                        ✓ Official Stockist
                      </span>
                      <span style={{ fontSize: '20px' }}>🏪</span>
                    </div>

                    <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.35rem', color: 'var(--brand-green)', margin: '0 0 10px', lineHeight: 1.25 }}>
                      {st.storename}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: '1.6', marginBottom: '18px' }}>
                      <span style={{ fontSize: '16px', color: 'var(--brand-gold-dark)' }}>📍</span>
                      <span>{st.fulladdress || 'Bhilai, Chhattisgarh'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px', display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedMapStore(st)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        background: 'var(--brand-green)',
                        color: '#ffffff',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '13px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(17, 56, 12, 0.15)',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span>🗺️</span> View on Google Maps
                    </button>

                    <a
                      href="tel:+919109002098"
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--line)',
                        background: 'var(--bg-cream)',
                        color: 'var(--brand-green)',
                        fontWeight: '700',
                        fontSize: '13px',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="Contact Support for stock verification"
                    >
                      📞
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. Partner Inquiry Callout */}
          <div style={{
            marginTop: '50px',
            background: 'linear-gradient(135deg, #fdfbf7 0%, var(--brand-sage) 100%)',
            borderRadius: '24px',
            padding: '36px',
            border: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--brand-gold-dark)' }}>
                Retailers & Supermarkets
              </span>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.5rem', color: 'var(--brand-green)', margin: '4px 0 6px' }}>
                Want to sell Shree Dhaan premixes in your store?
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
                Direct factory pricing, quick deliveries across Chhattisgarh, and promotional retail packaging.
              </p>
            </div>
            <Link
              to="/contact"
              className="header-cta-btn"
              style={{ padding: '12px 24px', fontSize: '13px', borderRadius: '12px' }}
            >
              Request Retail Supply →
            </Link>
          </div>

        </div>
      </section>

      {/* Interactive Google Maps Modal */}
      {selectedMapStore && (
        <MapModal
          store={selectedMapStore}
          onClose={() => setSelectedMapStore(null)}
        />
      )}
    </div>
  );
}
