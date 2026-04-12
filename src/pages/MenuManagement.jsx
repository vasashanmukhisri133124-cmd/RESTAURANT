import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_CATEGORIES } from '../data/mockData';

function MenuItemCard({ item, onToggle }) {
  return (
    <div className="menu-card">
      <div className="menu-card-img">
        <span style={{ fontSize: '3.5rem', filter: item.available ? 'none' : 'grayscale(1) opacity(0.4)' }}>{item.emoji}</span>
      </div>
      <div className="menu-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div className="menu-card-title">{item.name}</div>
          <span className={item.available ? 'badge badge-success' : 'badge badge-danger'}>
            {item.available ? '● Active' : '● Off'}
          </span>
        </div>
        <div className="menu-card-cat">{item.category}</div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 10 }}>{item.description}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          {item.allergens.map(a => (
            <span key={a} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: 'var(--color-danger)', fontSize: '0.65rem', fontWeight: 600, padding: '2px 6px', borderRadius: 4 }}>{a}</span>
          ))}
        </div>
        {/* Metrics */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 12, padding: '8px 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-gold)' }}>{item.prepTime}m</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Prep Time</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>⭐ {item.rating}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Rating</div>
          </div>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{item.orders}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Orders</div>
          </div>
        </div>
        <div className="menu-card-footer">
          <div>
            <div className="menu-card-price">${item.price.toFixed(2)}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cost: ${item.cost.toFixed(2)} • Margin: {Math.round((1 - item.cost / item.price) * 100)}%</div>
          </div>
          <button
            className={item.available ? 'btn btn-danger btn-sm' : 'btn btn-success btn-sm'}
            onClick={() => onToggle(item.id)}
          >
            {item.available ? '🔴 Disable' : '🟢 Enable'}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddItemModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', category: 'Main Course', price: '', cost: '', emoji: '🍽️', description: '', prepTime: '', allergens: '' });

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    onAdd({
      ...form,
      price: parseFloat(form.price),
      cost: parseFloat(form.cost),
      prepTime: parseInt(form.prepTime),
      allergens: form.allergens ? form.allergens.split(',').map(a => a.trim()) : [],
      available: true, rating: 0, orders: 0,
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Add Menu Item</h2>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={submit}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Item Name *</label>
              <input name="name" className="form-control" value={form.name} onChange={handle} required placeholder="e.g. Grilled Salmon" />
            </div>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select name="category" className="form-control" value={form.category} onChange={handle}>
                {MENU_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Price ($) *</label>
              <input name="price" type="number" step="0.01" className="form-control" value={form.price} onChange={handle} required placeholder="0.00" />
            </div>
            <div className="form-group">
              <label className="form-label">Cost ($) *</label>
              <input name="cost" type="number" step="0.01" className="form-control" value={form.cost} onChange={handle} required placeholder="0.00" />
            </div>
            <div className="form-group">
              <label className="form-label">Emoji Icon</label>
              <input name="emoji" className="form-control" value={form.emoji} onChange={handle} placeholder="🍽️" />
            </div>
            <div className="form-group">
              <label className="form-label">Prep Time (min) *</label>
              <input name="prepTime" type="number" className="form-control" value={form.prepTime} onChange={handle} required placeholder="15" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-control" value={form.description} onChange={handle} rows={2} placeholder="Brief description of the dish..." style={{ resize: 'vertical' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Allergens (comma separated)</label>
            <input name="allergens" className="form-control" value={form.allergens} onChange={handle} placeholder="Gluten, Dairy, Egg" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add to Menu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MenuManagement() {
  const { menuItems, toggleMenuItemAvailability, addMenuItem } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filtered = menuItems.filter(item => {
    const catMatch = activeCategory === 'All' || item.category === activeCategory;
    const searchMatch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="page-content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Menu Management 🍽️</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{menuItems.length} items • {menuItems.filter(i => i.available).length} available</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          ✚ Add Item
        </button>
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div className="search-bar" style={{ flex: '1 1 260px' }}>
          <span style={{ fontSize: '1rem' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search menu items..." />
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {MENU_CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat} {cat !== 'All' && <span style={{ opacity: 0.7 }}>({menuItems.filter(i => i.category === cat).length})</span>}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {filtered.map(item => (
          <MenuItemCard key={item.id} item={item} onToggle={toggleMenuItemAvailability} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <span style={{ fontSize: '3rem' }}>🍽️</span>
          <p style={{ marginTop: 12 }}>No items found</p>
        </div>
      )}

      {showModal && <AddItemModal onClose={() => setShowModal(false)} onAdd={addMenuItem} />}
    </div>
  );
}
