import React, { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../services/api';
import PaginationBar from '../../components/PaginationBar';

export default function AdminInquiriesPage() {
  const { showNotification } = useOutletContext() || { showNotification: () => {} };

  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquiriesFilter, setInquiriesFilter] = useState('ALL');
  const [inquiriesSearch, setInquiriesSearch] = useState('');
  const [inquiriesPage, setInquiriesPage] = useState(1);
  const inquiriesPageSize = 6;

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const res = await api.inquiries.getAll({ status: inquiriesFilter, search: inquiriesSearch });
      if (res && res.data) {
        setInquiries(Array.isArray(res.data) ? res.data : [res.data]);
      } else {
        setInquiries([]);
      }
    } catch (err) {
      console.error('Inquiries fetch error:', err);
      showNotification('Failed to fetch inquiries: ' + (err.message || 'Error'), 'error');
    } finally {
      setInquiriesLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [inquiriesFilter]);

  const handleUpdateInquiryStatus = async (id, newStatus, notes) => {
    setStatusUpdateLoading(true);
    try {
      await api.inquiries.updateStatus(id, newStatus, notes);
      showNotification(`Inquiry status updated to ${newStatus}`);
      setSelectedInquiry(null);
      fetchInquiries();
    } catch (err) {
      showNotification('Status update failed: ' + (err.message || 'Error'), 'error');
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await api.inquiries.delete(id);
      showNotification('Inquiry deleted successfully');
      fetchInquiries();
    } catch (err) {
      showNotification('Delete inquiry failed: ' + (err.message || 'Error'), 'error');
    }
  };

  // Filter & Pagination
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchFilter = inquiriesFilter === 'ALL' || inq.status === inquiriesFilter;
      const q = inquiriesSearch.toLowerCase();
      const matchSearch =
        !inquiriesSearch ||
        inq.full_name?.toLowerCase().includes(q) ||
        inq.email?.toLowerCase().includes(q) ||
        inq.phone_number?.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [inquiries, inquiriesFilter, inquiriesSearch]);

  const paginatedInquiries = useMemo(() => {
    const start = (inquiriesPage - 1) * inquiriesPageSize;
    return filteredInquiries.slice(start, start + inquiriesPageSize);
  }, [filteredInquiries, inquiriesPage]);

  return (
    <div>
      {/* Header */}
      <div className="admin-section-header">
        <div className="admin-section-title-wrap">
          <h1 className="admin-section-title">
            Inquiries Management ({filteredInquiries.length})
          </h1>
          <p className="admin-section-desc">
            Customer inquiries and bulk order leads stored in MongoDB <code>c_inquridetails</code>.
          </p>
        </div>

        <div className="admin-section-actions">
          <button
            type="button"
            onClick={fetchInquiries}
            style={{
              background: '#ffffff',
              border: '1px solid var(--line)',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-filter-pills-row">
          {['ALL', 'PENDING', 'INVESTIGATING', 'PROCESSING', 'RESOLVED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => { setInquiriesFilter(st); setInquiriesPage(1); }}
              className="admin-filter-pill-btn"
              style={{
                background: inquiriesFilter === st ? 'var(--brand-green)' : '#f3f4f6',
                color: inquiriesFilter === st ? '#ffffff' : 'var(--text-muted)',
              }}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="admin-search-box">
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={inquiriesSearch}
            onChange={(e) => { setInquiriesSearch(e.target.value); setInquiriesPage(1); }}
            className="admin-search-input"
          />
        </div>
      </div>

      {/* Inquiries Grid */}
      {inquiriesLoading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading inquiries from database...
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '48px', textAlign: 'center', border: '1px solid var(--line)' }}>
          No customer inquiries matching filter.
        </div>
      ) : (
        <div>
          <div className="admin-cards-grid">
            {paginatedInquiries.map((inq) => {
              const createdDate = inq.created_at || inq.createdAt;
              const formattedDate = createdDate ? new Date(createdDate).toLocaleString('en-IN') : 'N/A';
              const cleanPhone = (inq.phone_number || '').replace(/[^0-9]/g, '');

              return (
                <div
                  key={inq._id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '22px',
                    border: '1px solid var(--line)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{
                        background:
                          inq.status === 'RESOLVED' ? '#dcfce7' :
                            inq.status === 'PROCESSING' ? '#e0f2fe' :
                              inq.status === 'INVESTIGATING' ? '#ede9fe' : '#fef3c7',
                        color:
                          inq.status === 'RESOLVED' ? '#166534' :
                            inq.status === 'PROCESSING' ? '#0369a1' :
                              inq.status === 'INVESTIGATING' ? '#6d28d9' : '#92400e',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontWeight: '800',
                        fontSize: '11px',
                      }}>
                        ● {inq.status}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {formattedDate}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', color: 'var(--brand-green)', margin: '0 0 4px' }}>
                      {inq.full_name}
                    </h3>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      <div>✉️ {inq.email}</div>
                      <div>📞 {inq.phone_number}</div>
                    </div>

                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      background: 'var(--brand-sage)',
                      color: 'var(--brand-green)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      display: 'inline-block',
                      marginBottom: '10px',
                    }}>
                      {inq.inquiry_type}
                    </span>

                    <div style={{
                      background: 'var(--bg-cream)',
                      borderRadius: '10px',
                      padding: '12px',
                      fontSize: '13px',
                      color: '#27382b',
                      lineHeight: '1.5',
                      marginBottom: '14px',
                      maxHeight: '90px',
                      overflowY: 'auto',
                    }}>
                      {inq.message || 'No additional message provided.'}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {cleanPhone && (
                        <a
                          href={`https://wa.me/91${cleanPhone.slice(-10)}?text=Hello%20${encodeURIComponent(inq.full_name)}%2C%20regarding%20your%20Shree%20Dhaan%20inquiry.`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            background: '#f0fdf4',
                            border: '1px solid #86efac',
                            color: '#166534',
                            padding: '5px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            textDecoration: 'none',
                          }}
                        >
                          💬 WhatsApp
                        </a>
                      )}
                      <a
                        href={`tel:${inq.phone_number}`}
                        style={{
                          background: '#f3f4f6',
                          border: '1px solid #e5e7eb',
                          color: '#374151',
                          padding: '5px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700',
                          textDecoration: 'none',
                        }}
                      >
                        📞 Call
                      </a>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedInquiry(inq)}
                        style={{
                          background: 'var(--brand-green)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        Status
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteInquiry(inq._id)}
                        style={{
                          background: '#fee2e2',
                          border: '1px solid #fecaca',
                          color: '#991b1b',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <PaginationBar
            currentPage={inquiriesPage}
            totalItems={filteredInquiries.length}
            pageSize={inquiriesPageSize}
            onPageChange={(p) => setInquiriesPage(p)}
          />
        </div>
      )}

      {/* Inquiry Status Update Modal */}
      {selectedInquiry && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: 'var(--brand-green)', margin: 0 }}>
                Update Inquiry Status
              </h3>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Updating inquiry for <strong>{selectedInquiry.full_name}</strong> ({selectedInquiry.email})
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: 'var(--brand-green)' }}>
                SELECT NEW STATUS *
              </label>
              <select
                id="modalStatusSelect"
                defaultValue={selectedInquiry.status || 'PENDING'}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', boxSizing: 'border-box' }}
              >
                <option value="PENDING">PENDING</option>
                <option value="INVESTIGATING">INVESTIGATING</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '6px', color: 'var(--brand-green)' }}>
                RESOLUTION NOTES (OPTIONAL)
              </label>
              <textarea
                id="modalStatusNotes"
                rows="3"
                placeholder="e.g. Spoke with client, confirmed bulk supply delivery."
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                style={{ background: '#f3f4f6', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={statusUpdateLoading}
                onClick={() => {
                  const status = document.getElementById('modalStatusSelect').value;
                  const notes = document.getElementById('modalStatusNotes').value;
                  handleUpdateInquiryStatus(selectedInquiry._id, status, notes);
                }}
                className="header-cta-btn"
                style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '8px' }}
              >
                {statusUpdateLoading ? 'Updating...' : 'Save Status →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
