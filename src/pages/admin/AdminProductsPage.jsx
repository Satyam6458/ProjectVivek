import React, { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../services/api';
import PaginationBar from '../../components/PaginationBar';

export default function AdminProductsPage() {
  const { showNotification } = useOutletContext() || { showNotification: () => {} };

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsSearch, setProductsSearch] = useState('');
  const [productsPage, setProductsPage] = useState(1);
  const productsPageSize = 6;

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    product_name: '',
    available_weights: '250g, 500g',
    description: '',
    image_url: '',
    ingredients: 'New Rice Flour, Besan, Spices, Salt',
    publish: true,
    isactive: true,
    iscomingsoon: false,
  });
  const [productSubmitLoading, setProductSubmitLoading] = useState(false);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await api.products.getAll();
      if (res && res.data) {
        setProducts(Array.isArray(res.data) ? res.data : [res.data]);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Products fetch error:', err);
      showNotification('Failed to fetch products: ' + (err.message || 'Error'), 'error');
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      product_name: '',
      available_weights: '250g, 500g',
      description: '',
      image_url: '',
      ingredients: 'New Rice Flour, Besan, Spices, Salt',
      publish: true,
      isactive: true,
      iscomingsoon: false,
    });
    setShowProductModal(true);
  };

  const openEditProduct = (prod) => {
    setEditingProductId(prod._id);
    setProductForm({
      product_name: prod.product_name || '',
      available_weights: (prod.available_weights || []).join(', ') || '250g, 500g',
      description: prod.description || '',
      image_url: prod.image_url || '',
      ingredients: (prod.ingredients || []).join(', ') || '',
      publish: prod.publish ?? true,
      isactive: prod.isactive ?? true,
      iscomingsoon: prod.iscomingsoon ?? false,
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name || 'this product'}"?`)) return;
    try {
      await api.products.delete(id);
      showNotification('Product deleted successfully from database');
      fetchProducts();
    } catch (err) {
      showNotification('Product delete failed: ' + (err.message || 'Error'), 'error');
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.product_name.trim()) {
      showNotification('Product name is required', 'error');
      return;
    }
    setProductSubmitLoading(true);

    const payload = {
      product_name: productForm.product_name.trim(),
      description: productForm.description.trim(),
      image_url: productForm.image_url.trim(),
      available_weights: productForm.available_weights
        ? productForm.available_weights.split(',').map((w) => w.trim()).filter(Boolean)
        : ['250g', '500g'],
      ingredients: productForm.ingredients
        ? productForm.ingredients.split(',').map((i) => i.trim()).filter(Boolean)
        : [],
      publish: productForm.publish,
      isactive: productForm.isactive,
      iscomingsoon: productForm.iscomingsoon,
    };

    try {
      if (editingProductId) {
        await api.products.update(editingProductId, payload);
        showNotification('Product updated successfully!');
      } else {
        await api.products.add(payload);
        showNotification('New product added successfully!');
      }
      setShowProductModal(false);
      fetchProducts();
    } catch (err) {
      showNotification('Product operation failed: ' + (err.message || 'Error'), 'error');
    } finally {
      setProductSubmitLoading(false);
    }
  };

  // Filter & Pagination
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = productsSearch.toLowerCase();
      return !productsSearch || p.product_name?.toLowerCase().includes(q);
    });
  }, [products, productsSearch]);

  const paginatedProducts = useMemo(() => {
    const start = (productsPage - 1) * productsPageSize;
    return filteredProducts.slice(start, start + productsPageSize);
  }, [filteredProducts, productsPage]);

  return (
    <div>
      {/* Header */}
      <div className="admin-section-header">
        <div className="admin-section-title-wrap">
          <h1 className="admin-section-title">
            Product Catalog ({filteredProducts.length})
          </h1>
          <p className="admin-section-desc">
            Manage premix variants and packs in MongoDB <code>c_productdetails</code> collection.
          </p>
        </div>

        <div className="admin-section-actions">
          <button
            type="button"
            onClick={fetchProducts}
            style={{ background: '#ffffff', border: '1px solid var(--line)', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
          >
            🔄 Refresh
          </button>
          <button
            type="button"
            onClick={openAddProduct}
            className="header-cta-btn"
            style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '8px' }}
          >
            + Add New Product
          </button>
        </div>
      </div>

      {/* Products Search */}
      <div className="admin-filter-bar">
        <div className="admin-search-box" style={{ maxWidth: '100%' }}>
          <input
            type="text"
            placeholder="Search products by name..."
            value={productsSearch}
            onChange={(e) => { setProductsSearch(e.target.value); setProductsPage(1); }}
            className="admin-search-input"
          />
        </div>
      </div>

      {/* Products Grid */}
      {productsLoading ? (
        <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading product catalog...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '48px', textAlign: 'center', border: '1px solid var(--line)' }}>
          No products found. Click &ldquo;+ Add New Product&rdquo; above.
        </div>
      ) : (
        <div>
          <div className="admin-cards-grid">
            {paginatedProducts.map((prod) => (
              <div
                key={prod._id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{
                    height: '160px',
                    background: 'var(--bg-cream)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    borderBottom: '1px solid var(--line)',
                  }}>
                    {prod.image_url ? (
                      <img
                        src={prod.image_url}
                        alt={prod.product_name}
                        style={{ maxHeight: '140px', maxWidth: '85%', objectFit: 'contain' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      <span style={{ fontSize: '48px' }}>🌾</span>
                    )}
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: prod.publish ? '#dcfce7' : '#fee2e2',
                      color: prod.publish ? '#166534' : '#991b1b',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '800',
                    }}>
                      {prod.publish ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <div style={{ padding: '18px' }}>
                    <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.25rem', color: 'var(--brand-green)', margin: '0 0 6px' }}>
                      {prod.product_name}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 10px', lineHeight: '1.5' }}>
                      {prod.description || 'Authentic instant chilla mix.'}
                    </p>

                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      <strong>Weights:</strong> {(prod.available_weights || []).join(', ') || 'Standard pack'}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '12px 18px', borderTop: '1px solid var(--line)', background: '#fafbfa', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => openEditProduct(prod)}
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
                    onClick={() => handleDeleteProduct(prod._id, prod.product_name)}
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
            ))}
          </div>

          {/* Products Pagination */}
          <PaginationBar
            currentPage={productsPage}
            totalItems={filteredProducts.length}
            pageSize={productsPageSize}
            onPageChange={(p) => setProductsPage(p)}
          />
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {showProductModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', color: 'var(--brand-green)', margin: 0 }}>
                {editingProductId ? 'Edit Product Details' : 'Add New Chilla Product'}
              </h3>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProductSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  PRODUCT NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Desi Masala Chilla Mix"
                  value={productForm.product_name}
                  onChange={(e) => setProductForm({ ...productForm, product_name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  AVAILABLE WEIGHTS (COMMA-SEPARATED)
                </label>
                <input
                  type="text"
                  placeholder="250g, 500g, 1kg"
                  value={productForm.available_weights}
                  onChange={(e) => setProductForm({ ...productForm, available_weights: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  IMAGE URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/images/chilla-mix.png"
                  value={productForm.image_url}
                  onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  INGREDIENTS (COMMA-SEPARATED)
                </label>
                <input
                  type="text"
                  placeholder="New Rice Flour, Besan, Chilli Flakes, Jeera, Salt"
                  value={productForm.ingredients}
                  onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '5px', color: 'var(--brand-green)' }}>
                  DESCRIPTION
                </label>
                <textarea
                  rows="3"
                  placeholder="A high-impact variant with strong shelf presence..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '22px', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={productForm.publish}
                    onChange={(e) => setProductForm({ ...productForm, publish: e.target.checked })}
                  />
                  Publish in Store
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={productForm.iscomingsoon}
                    onChange={(e) => setProductForm({ ...productForm, iscomingsoon: e.target.checked })}
                  />
                  Coming Soon Badge
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  style={{ background: '#f3f4f6', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={productSubmitLoading}
                  className="header-cta-btn"
                  style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '8px' }}
                >
                  {productSubmitLoading ? 'Saving...' : editingProductId ? 'Update Product →' : 'Add Product →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
