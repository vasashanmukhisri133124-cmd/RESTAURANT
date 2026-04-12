import { useState } from 'react';
import { useApp } from '../context/AppContext';

const statusConfig = {
  pending: { label: 'Pending', color: 'var(--color-warning)', bg: 'var(--color-warning-bg)', icon: '⏳' },
  preparing: { label: 'In Progress', color: 'var(--color-info)', bg: 'var(--color-info-bg)', icon: '🔥' },
  ready: { label: 'Ready', color: 'var(--color-success)', bg: 'var(--color-success-bg)', icon: '✅' },
};

function KitchenTicket({ order, onStatusUpdate }) {
  const cfg = statusConfig[order.status] || statusConfig.pending;
  const mins = Math.floor((Date.now() - order.createdAt) / 60000);
  const isUrgent = mins > 20 || order.priority === 'urgent';

  const nextStatus = { pending: 'preparing', preparing: 'ready' };

  return (
    <div className="kitchen-ticket" style={{
      borderTopColor: isUrgent ? 'var(--color-danger)' : cfg.color,
      animation: 'slideIn 0.3s ease',
    }}>
      {/* Ticket Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 2 }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--color-gold)', fontSize: '0.9rem' }}>{order.id}</span>
            {isUrgent && <span style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)', fontSize: '0.6rem', fontWeight: 800, padding: '1px 6px', borderRadius: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>URGENT</span>}
          </div>
          <div style={{ fontWeight: 700, marginBottom: 2 }}>Table {order.tableNumber}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.guestName}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            background: cfg.bg,
            color: cfg.color,
            padding: '4px 10px',
            borderRadius: 20,
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}>
            {cfg.icon} {cfg.label}
          </div>
          <div style={{ fontSize: '0.8rem', color: isUrgent ? 'var(--color-danger)' : 'var(--text-muted)', fontWeight: isUrgent ? 700 : 400 }}>
            ⏱ {mins}m
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 10, marginBottom: 12 }}>
        {order.items.map((item, i) => {
          const itemCfg = statusConfig[item.status] || statusConfig.pending;
          return (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center', background: 'var(--color-bg-primary)', borderRadius: 4, padding: '1px 5px', fontSize: '0.8rem' }}>×{item.qty}</span>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.name}</span>
              </div>
              <span style={{ background: itemCfg.bg, color: itemCfg.color, fontSize: '0.65rem', fontWeight: 700, padding: '2px 7px', borderRadius: 8, textTransform: 'uppercase' }}>
                {item.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Notes */}
      {order.notes && (
        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 6, padding: '6px 10px', marginBottom: 10 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-warning)', fontWeight: 600 }}>📝 {order.notes}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 8 }}>
        {order.status === 'pending' && (
          <button
            className="btn btn-primary w-full btn-sm"
            onClick={() => onStatusUpdate(order.id, 'preparing')}
          >
            🔥 Start Preparing
          </button>
        )}
        {order.status === 'preparing' && (
          <button
            className="btn btn-success w-full btn-sm"
            onClick={() => onStatusUpdate(order.id, 'ready')}
          >
            ✅ Mark Ready
          </button>
        )}
        {order.status === 'ready' && (
          <div className="btn btn-secondary w-full btn-sm" style={{ pointerEvents: 'none', justifyContent: 'center', opacity: 0.7 }}>
            ✅ Awaiting Pickup
          </div>
        )}
      </div>
    </div>
  );
}

export default function KitchenBoard() {
  const { orders, updateOrderStatus } = useApp();
  const [activeFilter, setActiveFilter] = useState('active');

  const kitchenOrders = orders.filter(o => ['pending', 'preparing', 'ready'].includes(o.status));

  const pendingOrders = kitchenOrders.filter(o => o.status === 'pending');
  const preparingOrders = kitchenOrders.filter(o => o.status === 'preparing');
  const readyOrders = kitchenOrders.filter(o => o.status === 'ready');

  const displayOrders = activeFilter === 'active'
    ? kitchenOrders
    : kitchenOrders.filter(o => o.status === activeFilter);

  return (
    <div className="page-content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Kitchen Board 🍳</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Real-time order queue for kitchen staff</p>
        </div>
        <span className="live-badge">
          <span className="pulse pulse-danger" />
          Live Updates
        </span>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
        <div style={{ background: 'var(--color-warning-bg)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setActiveFilter('pending')}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-warning)' }}>{pendingOrders.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⏳ Pending</div>
        </div>
        <div style={{ background: 'var(--color-info-bg)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setActiveFilter('preparing')}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-info)' }}>{preparingOrders.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>🔥 In Progress</div>
        </div>
        <div style={{ background: 'var(--color-success-bg)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setActiveFilter('ready')}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-success)' }}>{readyOrders.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>✅ Ready</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[
          { key: 'active', label: 'All Active' },
          { key: 'pending', label: '⏳ Pending' },
          { key: 'preparing', label: '🔥 In Progress' },
          { key: 'ready', label: '✅ Ready' },
        ].map(f => (
          <button key={f.key} className={`btn ${activeFilter === f.key ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setActiveFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Kitchen grid */}
      {displayOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
          <span style={{ fontSize: '4rem' }}>🎉</span>
          <h2 style={{ marginTop: 16, color: 'var(--color-success)' }}>All caught up!</h2>
          <p style={{ marginTop: 6 }}>No orders in this queue</p>
        </div>
      ) : (
        <div className="kitchen-grid">
          {displayOrders.map(order => (
            <KitchenTicket key={order.id} order={order} onStatusUpdate={updateOrderStatus} />
          ))}
        </div>
      )}
    </div>
  );
}
