import { useState } from 'react';
import { useApp } from '../context/AppContext';

const sectionColors = { Indoor: 'var(--color-info)', Terrace: 'var(--color-success)', Banquet: 'var(--color-purple)', Private: 'var(--color-gold)' };

const statusStyles = {
  available: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.4)', color: 'var(--color-success)', label: 'Available', icon: '🟢' },
  occupied: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.4)', color: 'var(--color-danger)', label: 'Occupied', icon: '🔴' },
  reserved: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.4)', color: 'var(--color-warning)', label: 'Reserved', icon: '🟡' },
  cleaning: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.4)', color: 'var(--color-info)', label: 'Cleaning', icon: '🔵' },
};

function TableCard({ table, onStatusChange, orders }) {
  const s = statusStyles[table.status];
  const linked = orders.find(o => o.id === table.currentOrder);

  return (
    <div style={{
      background: s.bg,
      border: `2px solid ${s.border}`,
      borderRadius: 'var(--radius-lg)',
      padding: 16,
      transition: 'all 0.2s',
      cursor: 'default',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: s.color }}>Table {table.number}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{table.section} • {table.capacity} seats</div>
        </div>
        <span style={{ background: s.bg, color: s.color, fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 12, border: `1px solid ${s.border}`, textTransform: 'uppercase' }}>
          {s.icon} {s.label}
        </span>
      </div>

      {table.waiter && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: sectionColors[table.section] + '30', border: `1px solid ${sectionColors[table.section]}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, color: sectionColors[table.section] }}>
            {table.waiter.charAt(0)}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{table.waiter}</span>
        </div>
      )}

      {linked && (
        <div style={{ background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-sm)', padding: '8px 10px', marginBottom: 10 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 2 }}>Current Order</div>
          <div style={{ fontFamily: 'monospace', color: 'var(--color-gold)', fontWeight: 700, fontSize: '0.82rem' }}>{linked.id}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{linked.items.length} items • ${linked.total.toFixed(2)}</div>
        </div>
      )}

      {table.reservationTime && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--color-warning)', marginBottom: 10 }}>
          <span>📅</span> Reserved at {table.reservationTime}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {table.status !== 'available' && (
          <button className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: '0.72rem' }} onClick={() => onStatusChange(table.id, 'available')}>
            Free Up
          </button>
        )}
        {table.status === 'available' && (
          <button className="btn btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: '0.72rem', background: 'rgba(239,68,68,0.1)', color: 'var(--color-danger)', border: '1px solid rgba(239,68,68,0.3)' }} onClick={() => onStatusChange(table.id, 'occupied')}>
            Mark Occupied
          </button>
        )}
        {table.status !== 'cleaning' && table.status !== 'available' && (
          <button className="btn btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: '0.72rem', background: 'var(--color-info-bg)', color: 'var(--color-info)', border: '1px solid rgba(59,130,246,0.3)' }} onClick={() => onStatusChange(table.id, 'cleaning')}>
            Cleaning
          </button>
        )}
      </div>
    </div>
  );
}

export default function TableManagement() {
  const { tables, orders, updateTableStatus } = useApp();
  const [activeSection, setActiveSection] = useState('All');

  const sections = ['All', ...new Set(tables.map(t => t.section))];
  const filtered = activeSection === 'All' ? tables : tables.filter(t => t.section === activeSection);

  const stats = {
    available: tables.filter(t => t.status === 'available').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
    cleaning: tables.filter(t => t.status === 'cleaning').length,
  };

  return (
    <div className="page-content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Table Management 🪑</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{tables.length} tables across {sections.length - 1} sections</p>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {Object.entries(stats).map(([status, count]) => {
          const s = statusStyles[status];
          return (
            <div key={status} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 'var(--radius-lg)', padding: '14px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color }}>{count}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {sections.map(sec => (
          <button key={sec} className={`btn ${activeSection === sec ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setActiveSection(sec)}>
            {sec !== 'All' && <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: sectionColors[sec], marginRight: 4 }} />}
            {sec}
          </button>
        ))}
      </div>

      {/* Tables Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {filtered.map(table => (
          <TableCard key={table.id} table={table} onStatusChange={updateTableStatus} orders={orders} />
        ))}
      </div>

      {/* Legend */}
      <div style={{ marginTop: 24, display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status Legend:</span>
        {Object.entries(statusStyles).map(([key, s]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>{s.icon}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
