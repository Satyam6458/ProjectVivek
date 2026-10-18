import React, { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../services/api';
import PaginationBar from '../../components/PaginationBar';
import MapModal from '../../components/MapModal';

export default function AdminStoresPage() {
  const { showNotification } = useOutletContext() || { showNotification: () => {} };

  const [stores, setStores] = useState([]);
  const [storesLoading, setStoresLoading] = useState(false);
  const [storesSearch, setStoresSearch] = useState('');
  const [storesFilter, setStoresFilter] = useState('ALL');
  const [storesPage, setStoresPage] = useState(1);
  const storesPageSize = 6;

  const [showStoreModal, setShowStoreModal] = useState(false);
  const [editingStoreId, setEditingStoreId] = useState(null);
  const [selectedMapStore, setSelectedMapStore] = useState(null);
  const [storeForm, setStoreForm] = useState({
    storename: '',
    fulladdress: '',
    locationlink: '',
    publish: true,
    isactive: true,
  });
  const [storeSubmitLoading, setStoreSubmitLoading] = useState(false);

  const fetchStores = async () => {
    setStoresLoading(true);
    try {
      const res = await api.stores.getAll();
      if (res && res.data) {
        setStores(Array.isArray(res.data) ? res.data : [res.data]);
      } else {
        setStores([]);
      }
    } catch (err) {
      console.error('Stores fetch error:', err);
      showNotification('Failed to fetch stores: ' + (err.message || 'Error'), 'error');
    } finally {
      setStoresLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const openAddStore = () => {
    setEditingStoreId(null);
    setStoreForm({
      storename: '',
      fulladdress: '',
      locationlink: '',
      publish: true,
      isactive: true,
    });
    setShowStoreModal(true);
  };

  const openEditStore = (store) => {
    setEditingStoreId(store._id);
    setStoreForm({
      storename: store.storename || '',
      fulladdress: store.fulladdress || '',
      locationlink: store.locationlink || '',
      publish: store.publish ?? true,
      isactive: store.isactive ?? true,
    });
    setShowStoreModal(true);
  };

  const handleDeleteStore = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name || 'this store'}"?`)) return;
    try {
      await api.stores.delete(id);
      showNotification('Store deleted successfully from database');
      fetchStores();
    } catch (err) {
      showNotification('Store delete failed: ' + (err.message || 'Error'), 'error');
    }
  };

  const handleStoreSubmit = async (e) => {
    e.preventDefault();
    if (!storeForm.storename.trim()) {
      showNotification('Store name is required', 'error');
      return;
    }
    setStoreSubmitLoading(true);
    try {
      if (editingStoreId) {
        await api.stores.update(editingStoreId, storeForm);
        showNotification('Store updated successfully!');
      } else {
        await api.stores.add(storeForm);
        showNotification('New store added successfully!');
      }
      setShowStoreModal(false);
      setStoreForm({
        storename: '',
        fulladdress: '',
        locationlink: '',
        publish: true,
        isactive: true,
      });
      fetchStores();
    } catch (err) {
      showNotification('Store operation failed: ' + (err.message || 'Error'), 'error');
    } finally {
      setStoreSubmitLoading(false);
    }
  };

  // Filter & Pagination
  const filteredStores = useMemo(() => {
    return stores.filter((s) => {
      const matchFilter =
        storesFilter === 'ALL' ||
        (storesFilter === 'PUBLISHED' && s.publish) ||
        (storesFilter === 'DRAFT' && !s.publish);
      const q = storesSearch.toLowerCase();
      const matchSearch =
        !storesSearch ||
        s.storename?.toLowerCase().includes(q) ||
        s.fulladdress?.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [stores, storesFilter, storesSearch]);

  const paginatedStores = useMemo(() => {
    const start = (storesPage - 1) * storesPageSize;
    return filteredStores.slice(start, start + storesPageSize);
  }, [filteredStores, storesPage]);

  return (
    <div>
      {/* Page Header */}
      <div className="admin-section-header">
        <div className="admin-section-title-wrap">
          <h1 className="admin-section-title">
            Retail Stores ({filteredStores.length})
          </h1>
          <p className="admin-section-desc">
            Manage partner retail supermarkets and outlets in <code>c_storedetails</code>. Published stores show on customer site.
          </p>
        </div>

        <div className="admin-section-actions">
          <button
            type="button"
            onClick={fetchStores}
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
          <button
            type="button"
            onClick={openAddStore}
            className="header-cta-btn"
            style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '8px' }}
          >
            + Add New Store
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-filter-pills-row">
          {[
            { id: 'ALL', label: `All Outlets (${stores.length})` },
            { id: 'PUBLISHED', label: 'Published' },
            { id: 'DRAFT', label: 'Draft' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { setStoresFilter(item.id); setStoresPage(1); }}
              className="admin-filter-pill-btn"
              style={{
                background: storesFilter === item.id ? 'var(--brand-green)' : '#f3f4f6',
                color: storesFilter === item.id ? '#ffffff' : 'var(--text-muted)',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="admin-search-box">
          <input
            type="text"
            placeholder="Search store name, address..."
            value={storesSearch}
            onChange={(e) => { setStoresSearch(e.target.value); setStoresPage(1); }}
            className="admin-search-input"
          />
        </div>
      </div>

      {/* Stores Cards Grid */}
      {storesLoading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading store outlets...
        </div>
      ) : filteredStores.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '48px', textAlign: 'center', border: '1px solid var(--line)' }}>
          No stores found. Click &ldquo;+ Add New Store&rdquo; above to register a partner supermarket.
        </div>
      ) : (
        <div>
          <div className="admin-cards-grid">
            {paginatedStores.map((st) => (
              <div
                key={st._id}
                className="admin-card-item"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{
                      background: st.publish ? '#dcfce7' : '#fee2e2',
                      color: st.publish ? '#166534' : '#991b1b',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                    }}>
                      {st.publish ? '✓ Published on Website' : 'Draft / Offline'}
                    </span>
                    <span style={{ fontSize: '20px' }}>🏬</span>
                  </div>

                  <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.35rem', color: 'var(--brand-green)', margin: '0 0 10px' }}>
                    {st.storename}
                  </h3>

                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '14px' }}>
                    <div>📍 <strong>Address:</strong> {st.fulladdress || 'Bhilai, Chhattisgarh'}</div>
                    {st.createdby && <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>Created by: {st.createdby}</div>}
                  </div>
                </div>

                {/* Store Actions */}
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  {st.locationlink || st.fulladdress ? (
                    <button
                      type="button"
                      onClick={() => setSelectedMapStore(st)}
                      style={{
                        background: '#f3f4f6',
                        color: 'var(--brand-green)',
                        border: '1px solid var(--line)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      🗺️ View Map
                    </button>
                  ) : (
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>No location</span>
                  )}

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => openEditStore(st)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid var(--line)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        color: 'var(--brand-green)',
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteStore(st._id, st.storename)}
                      style={{
                        background: '#fee2e2',
                        border: '1px solid #fecaca',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        color: '#991b1b',
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stores Pagination */}
          <PaginationBar
            currentPage={storesPage}
            totalItems={filteredStores.length}
            pageSize={storesPageSize}
            onPageChange={(p) => setStoresPage(p)}
          />
        </div>
      )}

      {/* Add / Edit Store Modal */}
      {showStoreModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: 'var(--brand-green)', margin: 0 }}>
                {editingStoreId ? 'Edit Store Details' : 'Add New Retail Store'}
              </h3>
              <button
                type="button"
                onClick={() => setShowStoreModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleStoreSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  STORE NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shamim Super Market 3"
                  value={storeForm.storename}
                  onChange={(e) => setStoreForm({ ...storeForm, storename: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  FULL ADDRESS *
                </label>
                <textarea
                  required
                  rows="2"
                  placeholder="e.g. Azad Market, Risali, Bhilai, Chhattisgarh 490006"
                  value={storeForm.fulladdress}
                  onChange={(e) => setStoreForm({ ...storeForm, fulladdress: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  GOOGLE MAPS URL
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={storeForm.locationlink}
                  onChange={(e) => setStoreForm({ ...storeForm, locationlink: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '22px', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={storeForm.publish}
                    onChange={(e) => setStoreForm({ ...storeForm, publish: e.target.checked })}
                  />
                  Publish on Website
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={storeForm.isactive}
                    onChange={(e) => setStoreForm({ ...storeForm, isactive: e.target.checked })}
                  />
                  Active Store
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setShowStoreModal(false)}
                  style={{ background: '#f3f4f6', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={storeSubmitLoading}
                  className="header-cta-btn"
                  style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '8px' }}
                >
                  {storeSubmitLoading ? 'Saving...' : editingStoreId ? 'Update Store →' : 'Add Store →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
