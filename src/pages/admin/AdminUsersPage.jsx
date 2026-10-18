import React, { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../services/api';
import PaginationBar from '../../components/PaginationBar';

export default function AdminUsersPage() {
  const { showNotification } = useOutletContext() || { showNotification: () => {} };

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersFilter, setUsersFilter] = useState('ALL');
  const [usersSearch, setUsersSearch] = useState('');
  const [usersPage, setUsersPage] = useState(1);
  const usersPageSize = 6;

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [adminSubmitLoading, setAdminSubmitLoading] = useState(false);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await api.auth.getAllUsers();
      if (res && res.data) {
        setUsers(Array.isArray(res.data) ? res.data : [res.data]);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error('Users fetch error:', err);
      showNotification('Failed to fetch users: ' + (err.message || 'Error'), 'error');
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!adminForm.name.trim() || !adminForm.email.trim() || !adminForm.password) {
      showNotification('Please fill in all required admin fields.', 'error');
      return;
    }

    setAdminSubmitLoading(true);
    try {
      const res = await api.auth.createAdmin({
        name: adminForm.name.trim(),
        email: adminForm.email.trim().toLowerCase(),
        phone: adminForm.phone.trim(),
        password: adminForm.password,
      });

      showNotification(res.message || 'New Administrator registered successfully!');
      setShowAdminModal(false);
      setAdminForm({ name: '', email: '', phone: '', password: '' });
      fetchUsers();
    } catch (err) {
      showNotification('Admin registration failed: ' + (err.message || 'Error'), 'error');
    } finally {
      setAdminSubmitLoading(false);
    }
  };

  // Counts
  const customersCount = users.filter((u) => u.role === 'user').length;
  const adminsCount = users.filter((u) => u.role === 'admin').length;

  // Filter & Pagination
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchFilter = usersFilter === 'ALL' || u.role === usersFilter;
      const q = usersSearch.toLowerCase();
      const matchSearch =
        !usersSearch ||
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [users, usersFilter, usersSearch]);

  const paginatedUsers = useMemo(() => {
    const start = (usersPage - 1) * usersPageSize;
    return filteredUsers.slice(start, start + usersPageSize);
  }, [filteredUsers, usersPage]);

  return (
    <div>
      {/* Header */}
      <div className="admin-section-header">
        <div className="admin-section-title-wrap">
          <h1 className="admin-section-title">
            Registered Users ({filteredUsers.length})
          </h1>
          <p className="admin-section-desc">
            Overview of all customer registrations and administrators in <code>c_clientdetails</code>.
          </p>
        </div>

        <div className="admin-section-actions">
          <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', whiteSpace: 'nowrap' }}>
            👤 Customers: {customersCount}
          </span>
          <span style={{ background: '#fef3c7', color: '#92400e', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '800', whiteSpace: 'nowrap' }}>
            👑 Admins: {adminsCount}
          </span>
          <button
            type="button"
            onClick={() => setShowAdminModal(true)}
            className="header-cta-btn"
            style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '8px', whiteSpace: 'nowrap' }}
          >
            + Create New Admin
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-filter-pills-row">
          {[
            { id: 'ALL', label: `All Users (${users.length})` },
            { id: 'user', label: `Customers (${customersCount})` },
            { id: 'admin', label: `Admins (${adminsCount})` },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => { setUsersFilter(item.id); setUsersPage(1); }}
              className="admin-filter-pill-btn"
              style={{
                background: usersFilter === item.id ? 'var(--brand-green)' : '#f3f4f6',
                color: usersFilter === item.id ? '#ffffff' : 'var(--text-muted)',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="admin-search-box">
          <input
            type="text"
            placeholder="Search user name, email, phone..."
            value={usersSearch}
            onChange={(e) => { setUsersSearch(e.target.value); setUsersPage(1); }}
            className="admin-search-input"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-table-card">
        <div className="admin-table-swipe-hint">
          👈 Swipe horizontally to view user details and direct actions 👉
        </div>

        {usersLoading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading registered users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No users found matching your search.
          </div>
        ) : (
          <div className="admin-table-responsive-wrapper">
            <table className="admin-table-responsive">
              <thead>
                <tr>
                  <th>User / Client</th>
                  <th>Role</th>
                  <th>Phone Number</th>
                  <th>Registered Date</th>
                  <th>Direct Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((u) => {
                  const dateStr = u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';
                  const cleanPhone = (u.phone || '').replace(/[^0-9]/g, '');

                  return (
                    <tr key={u._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: u.role === 'admin' ? 'var(--brand-gold)' : 'var(--brand-sage)',
                            color: u.role === 'admin' ? '#0d1f12' : 'var(--brand-green)',
                            fontWeight: '800',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}>
                            {u.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          <div>
                            <strong style={{ display: 'block', color: 'var(--brand-green)', fontSize: '13.5px' }}>{u.name}</strong>
                            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{u.email}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span style={{
                          background: u.role === 'admin' ? 'var(--brand-gold-light)' : 'var(--brand-sage)',
                          color: u.role === 'admin' ? 'var(--brand-gold-dark)' : 'var(--brand-green)',
                          border: u.role === 'admin' ? '1px solid var(--brand-gold)' : '1px solid var(--brand-sage-dark)',
                          padding: '3px 10px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}>
                          {u.role === 'admin' ? '👑 Admin' : '✓ Customer'}
                        </span>
                      </td>

                      <td style={{ color: 'var(--text-primary)', fontWeight: '600', whiteSpace: 'nowrap' }}>
                        {u.phone || 'N/A'}
                      </td>

                      <td style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                        {dateStr}
                      </td>

                      <td>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/91${cleanPhone.slice(-10)}?text=Hello%20${encodeURIComponent(u.name)}%2C%20from%20Shree%20Dhaan.`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                background: '#f0fdf4',
                                border: '1px solid #86efac',
                                color: '#166534',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: '700',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              💬 WhatsApp
                            </a>
                          )}
                          <a
                            href={`mailto:${u.email}`}
                            style={{
                              background: '#f3f4f6',
                              border: '1px solid #e5e7eb',
                              color: '#374151',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '700',
                              textDecoration: 'none',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            ✉️ Email
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Users Pagination */}
        <PaginationBar
          currentPage={usersPage}
          totalItems={filteredUsers.length}
          pageSize={usersPageSize}
          onPageChange={(p) => setUsersPage(p)}
        />
      </div>

      {/* Create Admin Modal */}
      {showAdminModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>👑</span>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: 'var(--brand-green)', margin: 0 }}>
                  Create Administrator
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: '1.5' }}>
              Register a new verified administrator for Raavi Enterprises with full clearance to manage stores, products, and inquiries.
            </p>

            <form onSubmit={handleCreateAdmin}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  ADMIN FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vivek Singha"
                  value={adminForm.name}
                  onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  WORK EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="admin@raavienterprises.com"
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  PHONE NUMBER *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="9109002098"
                  value={adminForm.phone}
                  onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  SECURITY PASSWORD *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  style={{ background: '#f3f4f6', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adminSubmitLoading}
                  className="header-cta-btn"
                  style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '8px' }}
                >
                  {adminSubmitLoading ? 'Creating Admin...' : 'Register Administrator →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
