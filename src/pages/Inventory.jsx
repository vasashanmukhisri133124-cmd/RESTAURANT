import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Inventory() {
  const { inventory, setInventory, addNotification } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState(null);

  const categories = ['all', ...new Set(inventory.map(i => i.category))];
  const filtered = inventory.filter(item => {
    const catOk = filter === 'all' || item.category === filter;
    const searchOk = item.name.toLowerCase().includes(search.toLowerCase());
    return catOk && searchOk;
  });

  const lowStock = inventory.filter(i => i.quantity <= i.minStock);
  const outOfStock = inventory.filter(i => i.quantity === 0);

  const getStockStatus = (item) => {
    if (item.quantity === 0) return { label: 'Out of Stock', color: 'var(--color-danger)', bg: 'var(--color-danger-bg)', pct: 0 };
    if (item.quantity <= item.minStock) return { label: 'Low Stock', color: 'var(--color-warning)', bg: 'var(--color-warning-bg)', pct: (item.quantity / item.maxStock) * 100 };
    return { label: 'In Stock', color: 'var(--color-success)', bg: 'var(--color-success-bg)', pct: (item.quantity / item.maxStock) * 100 };
  };

  const restock = (itemId) => {
    setInventory(prev => prev.map(i => {
      if (i.id === itemId) {
        addNotification(`${i.name} restocked to maximum!`, 'success');
        return { ...i, quantity: i.maxStock, lastRestocked: new Date().toISOString().split('T')[0] };
      }
      return i;
    }));
  };

  const updateQuantity = (itemId, qty) => {
    setInventory(prev => prev.map(i => i.id === itemId ? { ...i, quantity: Math.max(0, parseFloat(qty) || 0) } : i));
  };

  const categoryColors = { Protein: '#ef4444', Dairy: '#f59e0b', Seafood: '#3b82f6', Specialty: '#8b5cf6', Grain: '#10b981', Pastry: '#ec4899', Beverage: '#6366f1', Bakery: '#f97316' };

  return (
    <div className="page-content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Inventory 📦</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{inventory.length} items • {lowStock.length} low stock alerts</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {lowStock.length > 0 && (
            <button className="btn btn-danger btn-sm" style={{ pointerEvents: 'none' }}>
              ⚠️ {lowStock.length} Low Stock
            </button>
          )}
        </div>
      </div>

      {/* Alert Banner */}
      {lowStock.length > 0 && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 'var(--radius-lg)', padding: '14px 18px', marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: 'var(--color-danger)', marginBottom: 6 }}>⚠️ Low Stock Alert</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {lowStock.map(item => (
              <span key={item.id} style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)', padding: '3px 10px', borderRadius: 10, fontSize: '0.78rem', fontWeight: 600 }}>
                {item.name} ({item.quantity} {item.unit})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-bar" style={{ flex: '1 1 220px' }}>
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inventory..." />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setFilter(cat)} style={{ fontSize: '0.75rem' }}>
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Stock Level</th>
                <th>Status</th>
                <th>Cost/Unit</th>
                <th>Supplier</th>
                <th>Last Restocked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const stock = getStockStatus(item);
                const catColor = categoryColors[item.category] || 'var(--color-info)';
                return (
                  <tr key={item.id}>
                    <td>
                      <span style={{ fontWeight: 700 }}>{item.name}</span>
                    </td>
                    <td>
                      <span style={{ background: catColor + '20', color: catColor, padding: '3px 9px', borderRadius: 10, fontSize: '0.72rem', fontWeight: 700 }}>
                        {item.category}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={e => updateQuantity(item.id, e.target.value)}
                          style={{ width: 70, background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', borderRadius: 4, padding: '3px 7px', color: 'var(--text-primary)', fontSize: '0.875rem', fontFamily: 'var(--font-sans)' }}
                        />
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.unit}</span>
                      </div>
                    </td>
                    <td style={{ minWidth: 160 }}>
                      <div style={{ marginBottom: 3 }}>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{
                            width: `${stock.pct}%`,
                            background: stock.pct > 60 ? 'var(--color-success)' : stock.pct > 30 ? 'var(--color-warning)' : 'var(--color-danger)',
                          }} />
                        </div>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {item.quantity}/{item.maxStock} {item.unit} (min: {item.minStock})
                      </div>
                    </td>
                    <td>
                      <span style={{ background: stock.bg, color: stock.color, padding: '3px 9px', borderRadius: 10, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        {stock.label}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--color-gold)' }}>${item.cost.toFixed(2)}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{item.supplier}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.lastRestocked}</td>
                    <td>
                      <button className="btn btn-primary btn-sm" style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }} onClick={() => restock(item.id)}>
                        ↻ Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
          <span style={{ fontSize: '3rem' }}>📦</span>
          <p style={{ marginTop: 12 }}>No items found</p>
        </div>
      )}
    </div>
  );
}
