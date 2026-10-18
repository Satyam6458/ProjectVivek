import React from 'react';

/**
 * Reusable Responsive Pagination Bar for Admin Pages
 */
export default function PaginationBar({ currentPage, totalItems, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  if (totalItems <= pageSize) return null;

  return (
    <div className="admin-pagination-bar">
      <div>
        Showing <strong>{Math.min((currentPage - 1) * pageSize + 1, totalItems)}</strong> to{' '}
        <strong>{Math.min(currentPage * pageSize, totalItems)}</strong> of <strong>{totalItems}</strong> entries
      </div>
      <div className="admin-pagination-pages">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid var(--line, #e2ebd8)',
            background: currentPage === 1 ? '#f3f4f6' : '#ffffff',
            color: currentPage === 1 ? '#9ca3af' : 'var(--text-primary, #0f2214)',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '12px',
          }}
        >
          ← Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => idx + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
          .map((p, idx, arr) => (
            <React.Fragment key={p}>
              {idx > 0 && p - arr[idx - 1] > 1 && (
                <span style={{ padding: '0 4px', color: 'var(--text-muted, #415546)' }}>...</span>
              )}
              <button
                type="button"
                onClick={() => onPageChange(p)}
                style={{
                  minWidth: '32px',
                  height: '32px',
                  padding: '0 6px',
                  borderRadius: '8px',
                  border: p === currentPage ? '1px solid var(--brand-green, #11380c)' : '1px solid var(--line, #e2ebd8)',
                  background: p === currentPage ? 'var(--brand-green, #11380c)' : '#ffffff',
                  color: p === currentPage ? '#ffffff' : 'var(--text-primary, #0f2214)',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '12px',
                }}
              >
                {p}
              </button>
            </React.Fragment>
          ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid var(--line, #e2ebd8)',
            background: currentPage === totalPages ? '#f3f4f6' : '#ffffff',
            color: currentPage === totalPages ? '#9ca3af' : 'var(--text-primary, #0f2214)',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '12px',
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
