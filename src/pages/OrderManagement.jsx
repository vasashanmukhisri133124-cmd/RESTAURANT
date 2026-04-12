import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

const ORDER_STATUSES = ['all', 'pending', 'preparing', 'ready', 'delivered'];
const ORDER_TYPES = ['all', 'dine-in', 'room-service', 'banquet'];

const statusConfig = {
  pending: { label: 'Pending', color: 'var(--color-warning)', bg: 'var(--color-warning-bg)', icon: '⏳' },
  preparing: { label: 'Preparing', color: 'var(--color-info)', bg: 'var(--color-info-bg)', icon: '👨‍🍳' },
  ready: { label: 'Ready', color: 'var(--color-success)', bg: 'var(--color-success-bg)', icon: '✅' },
  delivered: { label: 'Delivered', color: 'var(--color-purple)', bg: 'var(--color-purple-bg)', icon: '🛎️' },
};

const priorityConfig = {
  normal: { label: 'Normal', color: 'var(--text-secondary)' },
  high: { label: 'High', color: 'var(--color-warning)' },
  urgent: { label: 'URGENT', color: 'var(--color-danger)' },
};

function OrderDetailModal({ order, onClose, onStatusUpdate }) {
  const [status, setStatus] = useState(order.status);
  const cfg = statusConfig[order.status];
  const mins = Math.floor((Date.now() - order.createdAt) / 60000);

  const nextStatus = { pending: 'preparing', preparing: 'ready', ready: 'delivered' };
  const next = nextStatus[status];

  const handleNext = () => {
    if (next) {
      onStatusUpdate(order.id, next);
      setStatus(next);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-lg">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Order {order.id}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 2 }}>
              {mins} minutes ago • {order.type.replace('-', ' ')} • Table {order.tableNumber}
            </p>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <div style={{ flex: 1, background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', padding: 14 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Guest</div>
            <div style={{ fontWeight: 700 }}>{order.guestName}</div>
            {order.roomNumber && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Room {order.roomNumber}</div>}
          </div>
          <div style={{ flex: 1, background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', padding: 14 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Waiter</div>
            <div style={{ fontWeight: 700 }}>{order.waiter}</div>
          </div>
          <div style={{ flex: 1, background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', padding: 14 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Priority</div>
            <div style={{ fontWeight: 700, color: priorityConfig[order.priority].color }}>{priorityConfig[order.priority].label}</div>
          </div>
          <div style={{ flex: 1, background: cfg.bg, borderRadius: 'var(--radius-md)', padding: 14, border: `1px solid ${cfg.color}30` }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Status</div>
            <div style={{ fontWeight: 700, color: cfg.color }}>{cfg.icon} {cfg.label}</div>
          </div>
        </div>

        {order.notes && (
          <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 'var(--radius-md)', padding: 12, marginBottom: 16 }}>
            <span style={{ fontWeight: 700, color: 'var(--color-warning)', marginRight: 8 }}>📝 Notes:</span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{order.notes}</span>
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, fontSize: '0.9rem' }}>Order Items</div>
          {order.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
                <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>×{item.qty}</span>
              </div>
              <span style={{ color: 'var(--color-gold)', fontWeight: 700, marginRight: 12 }}>${(item.price * item.qty).toFixed(2)}</span>
              <span style={{ ...statusConfig[item.status] && { background: statusConfig[item.status]?.bg, color: statusConfig[item.status]?.color }, padding: '2px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', padding: 14, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Tax (10%)</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-gold)', borderTop: '1px solid var(--color-border)', paddingTop: 8 }}>
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          {next && (
            <button className="btn btn-primary" onClick={handleNext}>
              {statusConfig[next].icon} Mark as {statusConfig[next].label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function NewOrderModal({ tables, menuItems, onClose, onAdd }) {
  const [form, setForm] = useState({ tableNumber: '', guestName: '', type: 'dine-in', waiter: '', priority: 'normal', notes: '', roomNumber: '' });
  const [selectedItems, setSelectedItems] = useState([]);

  const addItem = (item) => {
    setSelectedItems(prev => {
      const existing = prev.find(i => i.menuItemId === item.id);
      if (existing) return prev.map(i => i.menuItemId === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { menuItemId: item.id, name: item.name, qty: 1, price: item.price, status: 'pending' }];
    });
  };
  const removeItem = (id) => setSelectedItems(prev => prev.filter(i => i.menuItemId !== id));

  const subtotal = selectedItems.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const submit = (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) return alert('Please add at least one item');
    onAdd({ ...form, items: selectedItems, subtotal, tax, total });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-lg">
        <div className="modal-header">
          <h2 className="modal-title">New Order</h2>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={submit}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Table *</label>
              <select className="form-control" value={form.tableNumber} onChange={e => setForm(f => ({ ...f, tableNumber: e.target.value }))} required>
                <option value="">Select Table</option>
                {tables.filter(t => t.status === 'available').map(t => <option key={t.id} value={t.number}>Table {t.number} ({t.capacity} seats)</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Guest Name *</label>
              <input className="form-control" value={form.guestName} onChange={e => setForm(f => ({ ...f, guestName: e.target.value }))} required placeholder="Guest name" />
            </div>
            <div className="form-group">
              <label className="form-label">Order Type</label>
              <select className="form-control" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="dine-in">Dine-In</option>
                <option value="room-service">Room Service</option>
                <option value="banquet">Banquet</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-control" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Notes</label>
            <input className="form-control" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Special requests..." />
          </div>

          <div style={{ fontWeight: 700, marginBottom: 10, fontSize: '0.9rem' }}>Add Items</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14, maxHeight: 200, overflowY: 'auto', padding: 4 }}>
            {menuItems.filter(i => i.available).map(item => (
              <button key={item.id} type="button" className="btn btn-secondary btn-sm" onClick={() => addItem(item)} style={{ fontSize: '0.76rem' }}>
                {item.emoji} {item.name} (${item.price})
              </button>
            ))}
          </div>

          {selectedItems.length > 0 && (
            <div style={{ background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', padding: 14, marginBottom: 16 }}>
              {selectedItems.map(item => (
                <div key={item.menuItemId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: '0.875rem' }}>{item.name} ×{item.qty}</span>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>${(item.price * item.qty).toFixed(2)}</span>
                    <button type="button" onClick={() => removeItem(item.menuItemId)} style={{ color: 'var(--color-danger)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontWeight: 800, color: 'var(--color-gold)' }}>
                <span>Total: ${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Place Order</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OrderManagement() {
  const { orders, tables, menuItems, updateOrderStatus, addOrder } = useApp();
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = orders.filter(o => {
    const statusOk = activeStatus === 'all' || o.status === activeStatus;
    const typeOk = activeType === 'all' || o.type === activeType;
    const searchOk = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.guestName.toLowerCase().includes(search.toLowerCase());
    return statusOk && typeOk && searchOk;
  });

  return (
    <div className="page-content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Order Management 📋</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{orders.length} total orders • {orders.filter(o => o.status === 'pending').length} pending</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNewOrder(true)}>✚ New Order</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div className="search-bar" style={{ flex: '1 1 220px' }}>
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by order ID or guest..." />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ORDER_STATUSES.map(s => (
            <button key={s} className={`btn ${activeStatus === s ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setActiveStatus(s)}>
              {s === 'all' ? 'All' : statusConfig[s]?.icon + ' ' + statusConfig[s]?.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {ORDER_TYPES.map(t => (
            <button key={t} className={`btn ${activeType === t ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setActiveType(t)}>
              {t.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Table</th>
                <th>Guest</th>
                <th>Type</th>
                <th>Priority</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => {
                const cfg = statusConfig[order.status] || {};
                const pcfg = priorityConfig[order.priority] || {};
                const mins = Math.floor((Date.now() - order.createdAt) / 60000);
                return (
                  <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedOrder(order)}>
                    <td><span style={{ fontFamily: 'monospace', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.85rem' }}>{order.id}</span></td>
                    <td><span style={{ fontWeight: 700 }}>T-{order.tableNumber}</span></td>
                    <td style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.guestName}</td>
                    <td><span className="badge badge-info">{order.type}</span></td>
                    <td><span style={{ fontWeight: 700, color: pcfg.color, fontSize: '0.8rem' }}>{pcfg.label}</span></td>
                    <td>{order.items.length}</td>
                    <td><span style={{ fontWeight: 700, color: 'var(--color-gold)' }}>${order.total.toFixed(2)}</span></td>
                    <td>
                      <span style={{ background: cfg.bg, color: cfg.color, padding: '3px 9px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{mins}m ago</td>
                    <td onClick={e => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {order.status === 'pending' && <button className="btn btn-sm" style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)', border: '1px solid rgba(59,130,246,0.3)', fontSize: '0.72rem' }} onClick={() => updateOrderStatus(order.id, 'preparing')}>Start</button>}
                        {order.status === 'preparing' && <button className="btn btn-success btn-sm" style={{ fontSize: '0.72rem' }} onClick={() => updateOrderStatus(order.id, 'ready')}>Ready</button>}
                        {order.status === 'ready' && <button className="btn btn-sm" style={{ background: 'var(--color-purple-bg)', color: 'var(--color-purple)', border: '1px solid rgba(139,92,246,0.3)', fontSize: '0.72rem' }} onClick={() => updateOrderStatus(order.id, 'delivered')}>Deliver</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          <span style={{ fontSize: '3rem' }}>📋</span>
          <p style={{ marginTop: 12 }}>No orders found</p>
        </div>
      )}

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} onStatusUpdate={(id, s) => { updateOrderStatus(id, s); setSelectedOrder(o => ({ ...o, status: s })); }} />
      )}
      {showNewOrder && <NewOrderModal tables={tables} menuItems={menuItems} onClose={() => setShowNewOrder(false)} onAdd={addOrder} />}
    </div>
  );
}
