import React, { useEffect, useState } from 'react';

/**
 * Helper to compute an iframe-embeddable Google Maps URL
 * Supports coordinates, place links, and full addresses.
 */
export function getGoogleMapsEmbedUrl(store) {
  if (!store) return '';
  const { locationlink, storename, fulladdress } = store;
  let query = '';

  if (locationlink) {
    // 1. Coordinates (@lat,lng)
    const coordsMatch = locationlink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordsMatch) {
      query = `${coordsMatch[1]},${coordsMatch[2]}`;
    } else {
      // 2. Place name in /place/Name+Here/
      const placeMatch = locationlink.match(/\/place\/([^/@?]+)/);
      if (placeMatch) {
        query = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
      } else {
        // 3. Query param ?q=...
        const qMatch = locationlink.match(/[?&]q=([^&]+)/);
        if (qMatch) {
          query = decodeURIComponent(qMatch[1].replace(/\+/g, ' '));
        }
      }
    }
  }

  // Fallback to store address and name if query couldn't be extracted from URL
  if (!query) {
    query = [storename, fulladdress].filter(Boolean).join(', ') || 'Bhilai, Chhattisgarh';
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

/**
 * Reusable Interactive Google Maps Modal
 */
export default function MapModal({ store, onClose }) {
  const [copied, setCopied] = useState(false);
  const [mapLoading, setMapLoading] = useState(true);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!store) return null;

  const embedUrl = getGoogleMapsEmbedUrl(store);
  const externalMapLink = store.locationlink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([store.storename, store.fulladdress].filter(Boolean).join(', '))}`;

  const handleCopyAddress = () => {
    const textToCopy = store.fulladdress || store.storename;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 25, 14, 0.72)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          border: '1px solid var(--line, rgba(17, 56, 12, 0.12))',
          boxSizing: 'border-box',
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '18px 22px',
          background: 'linear-gradient(135deg, #11380c 0%, #1e5a17 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '14px',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '18px' }}>🏪</span>
              <span style={{
                background: 'var(--brand-gold, #d99b24)',
                color: '#0d1f12',
                fontSize: '10px',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '12px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                Store Location Map
              </span>
            </div>

            <h3 style={{
              fontFamily: 'Fraunces, serif',
              fontSize: '1.35rem',
              color: '#ffffff',
              margin: '0 0 6px',
              lineHeight: 1.25,
            }}>
              {store.storename}
            </h3>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#d4e6d2',
              fontSize: '12.5px',
              lineHeight: '1.4',
            }}>
              <span>📍</span>
              <span>{store.fulladdress || 'Bhilai, Chhattisgarh'}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Map Modal"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#ffffff',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; }}
          >
            ✕
          </button>
        </div>

        {/* Modal Map Viewport Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '380px',
          background: '#f3f4f6',
          overflow: 'hidden',
        }}>
          {mapLoading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: '#f9fafb',
              color: 'var(--text-muted, #415546)',
              fontSize: '13px',
              zIndex: 1,
            }}>
              <span style={{ fontSize: '24px' }}>🗺️</span>
              <span>Loading Google Map coordinates...</span>
            </div>
          )}

          <iframe
            title={`Map location for ${store.storename}`}
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setMapLoading(false)}
          />
        </div>

        {/* Modal Footer Controls */}
        <div style={{
          padding: '14px 20px',
          background: '#ffffff',
          borderTop: '1px solid var(--line, rgba(17, 56, 12, 0.08))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', flex: 1 }}>
            {/* Direct Google Maps Navigation Link */}
            <a
              href={externalMapLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--brand-green, #11380c)',
                color: '#ffffff',
                padding: '9px 16px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(17, 56, 12, 0.2)',
              }}
            >
              <span>🧭</span> Get Driving Directions ↗
            </a>

            {/* Copy Address Button */}
            <button
              type="button"
              onClick={handleCopyAddress}
              style={{
                background: '#f3f4f6',
                border: '1px solid #e5e7eb',
                color: 'var(--text-primary, #0f2214)',
                padding: '9px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>📋</span> {copied ? 'Address Copied! ✓' : 'Copy Address'}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--line, rgba(17, 56, 12, 0.15))',
              color: 'var(--text-muted, #415546)',
              padding: '9px 18px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
