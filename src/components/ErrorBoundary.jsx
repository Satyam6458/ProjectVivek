import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a170e',
          color: '#ffffff',
          padding: '24px',
          fontFamily: 'sans-serif',
        }}>
          <div style={{
            background: '#ffffff',
            color: '#111827',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '540px',
            width: '100%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            textAlign: 'center',
          }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>⚠️</span>
            <h2 style={{ fontSize: '1.4rem', color: '#11380c', margin: '0 0 10px' }}>
              Dashboard View Encountered an Issue
            </h2>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 18px', lineHeight: '1.6' }}>
              An unexpected error occurred while loading this view:
            </p>
            <div style={{
              background: '#fef2f2',
              color: '#991b1b',
              padding: '12px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontFamily: 'monospace',
              textAlign: 'left',
              overflowX: 'auto',
              marginBottom: '22px',
              border: '1px solid #fecaca',
            }}>
              {this.state.error?.message || 'Unknown error'}
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  background: '#11380c',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                🔄 Refresh Page
              </button>
              <button
                type="button"
                onClick={() => { window.location.href = '/'; }}
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
