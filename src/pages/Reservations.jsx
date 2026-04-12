import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Reservations() {
  const { reservations, addReservation, tables } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ guestName: '', partySize: 2, date: '', time: '', tableNumber: '', roomNumber: '', occasion: '', specialRequests: '' });

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    addReservation(form);
    setShowModal(false);
    setForm({ guestName: '', partySize: 2, date: '', time: '', tableNumber: '', roomNumber: '', occasion: '', specialRequests: '' });
  };

  const filtered = filter === 'all' ? reservations : reservations.filter(r => r.status === filter);

  const statusCfg = {
    confirmed: { color: 'var(--color-success)', bg: 'var(--color-success-bg)', label: 'Confirmed' },
    pending: { color: 'var(--color-warning)', bg: 'var(--color-warning-bg)', label: 'Pending' },
    cancelled: { color: 'var(--color-danger)', bg: 'var(--color-danger-bg)', label: 'Cancelled' },
  };

  const occasionIcons = { Birthday: '🎂', Anniversary: '💍', Business: '💼', Corporate: '🏢', Honeymoon: '💑' };

  return (
    <div className="page-content">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Reservations 📅</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{reservations.filter(r => r.status === 'confirmed').length} confirmed • {reservations.filter(r => r.status === 'pending').length} pending</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>✚ New Reservation</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ background: 'var(--color-success-bg)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-lg)', padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-success)' }}>{reservations.filter(r => r.status === 'confirmed').length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confirmed</div>
        </div>
        <div style={{ background: 'var(--color-warning-bg)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 'var(--radius-lg)', padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-warning)' }}>{reservations.reduce((s, r) => s + parseInt(r.partySize), 0)}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Guests</div>
        </div>
        <div style={{ background: 'var(--color-info-bg)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 'var(--radius-lg)', padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-info)' }}>
            {[...new Set(reservations.map(r => r.date))].length}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Days Booked</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['all', 'confirmed', 'pending', 'cancelled'].map(f => (
          <button key={f} className={`btn ${filter === f ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Reservation List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(res => {
          const s = statusCfg[res.status];
          return (
            <div key={res.id} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 20, transition: 'all 0.2s' }}>
              {/* Occasion Icon */}
              <div style={{ width: 50, height: 50, borderRadius: 'var(--radius-md)', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                {occasionIcons[res.occasion] || '🍴'}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{res.guestName}</span>
                  <span style={{ background: s.bg, color: s.color, fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 10, textTransform: 'uppercase' }}>{s.label}</span>
                  {res.occasion && <span style={{ background: 'var(--color-gold-glow)', color: 'var(--color-gold)', fontSize: '0.65rem', fontWeight: 600, padding: '2px 8px', borderRadius: 10 }}>{res.occasion}</span>}
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: '0.82rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                  <span>📅 {res.date} at {res.time}</span>
                  <span>👥 Party of {res.partySize}</span>
                  {res.tableNumber && <span>🪑 Table {res.tableNumber}</span>}
                  {res.roomNumber && <span>🏨 Room {res.roomNumber}</span>}
                </div>
                {res.specialRequests && (
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-warning)', marginTop: 4 }}>
                    📝 {res.specialRequests}
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>ID #{res.id}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.72rem' }}>Edit</button>
                  <button className="btn btn-danger btn-sm" style={{ fontSize: '0.72rem' }}>Cancel</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
          <span style={{ fontSize: '3rem' }}>📅</span>
          <p style={{ marginTop: 12 }}>No reservations found</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">New Reservation</h2>
              <button className="btn btn-secondary btn-icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={submit}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Guest Name *</label>
                  <input name="guestName" className="form-control" value={form.guestName} onChange={handle} required placeholder="Full name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Party Size *</label>
                  <input name="partySize" type="number" min="1" className="form-control" value={form.partySize} onChange={handle} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input name="date" type="date" className="form-control" value={form.date} onChange={handle} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Time *</label>
                  <input name="time" type="time" className="form-control" value={form.time} onChange={handle} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Table Number</label>
                  <select name="tableNumber" className="form-control" value={form.tableNumber} onChange={handle}>
                    <option value="">Select Table</option>
                    {tables.filter(t => t.status === 'available').map(t => <option key={t.id} value={t.number}>Table {t.number} ({t.capacity} seats)</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Room Number</label>
                  <input name="roomNumber" className="form-control" value={form.roomNumber} onChange={handle} placeholder="For hotel guests" />
                </div>
                <div className="form-group">
                  <label className="form-label">Occasion</label>
                  <select name="occasion" className="form-control" value={form.occasion} onChange={handle}>
                    <option value="">None</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Business</option>
                    <option>Corporate</option>
                    <option>Honeymoon</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Special Requests</label>
                <textarea name="specialRequests" className="form-control" value={form.specialRequests} onChange={handle} rows={2} placeholder="Any special requests..." style={{ resize: 'vertical' }} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Reservation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
