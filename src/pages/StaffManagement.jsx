import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function StaffManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get('/api/auth/users', config);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
        setLoading(false);
      }
    };

    if (user && user.role === 'admin') {
      fetchUsers();
    } else {
      setError('You are not authorized to view the admin dashboard.');
      setLoading(false);
    }
  }, [user]);

  const roleCfg = {
    'admin': { emoji: '👑', color: '#ec4899', label: 'Administrator' },
    'staff': { emoji: '👨‍🍳', color: '#10b981', label: 'Staff Member' },
    'guest': { emoji: '👤', color: '#3b82f6', label: 'Hotel Guest' },
  };

  const totalAdmins = users.filter((u) => u.role === 'admin').length;
  const totalStaff = users.filter((u) => u.role === 'staff').length;
  const totalGuests = users.filter((u) => u.role === 'guest').length;

  if (loading) return <div className="page-content"><h2>Loading users...</h2></div>;

  if (error) {
    return (
      <div className="page-content">
        <div style={{ background: 'var(--color-danger)', color: 'white', padding: '20px', borderRadius: '10px' }}>
          <h2>Access Denied</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>User & Staff Management 👥</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{users.length} registered accounts in the database</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        <div style={{ background: 'var(--color-info-bg)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 'var(--radius-lg)', padding: '18px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#3b82f6' }}>{totalGuests}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>👤 Registered Guests</div>
        </div>
        <div style={{ background: 'var(--color-success-bg)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-lg)', padding: '18px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--color-success)' }}>{totalStaff}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>👨‍🍳 Active Staff</div>
        </div>
        <div style={{ background: 'var(--color-warning-bg)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 'var(--radius-lg)', padding: '18px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ec4899' }}>{totalAdmins}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>👑 Administrators</div>
        </div>
      </div>

      {/* Database Staff/User Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {users.map((dbUser) => {
          const r = roleCfg[dbUser.role] || roleCfg['guest'];
          return (
            <div key={dbUser._id} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 20, transition: 'all 0.2s', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                {/* Avatar */}
                <div style={{
                  width: 52, height: 52, borderRadius: '12px',
                  background: `${r.color}15`, border: `1px solid ${r.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                  flexShrink: 0,
                  boxShadow: `0 4px 10px ${r.color}10`
                }}>
                  {r.emoji}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 700, marginBottom: 2, fontSize: '1.1rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{dbUser.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis' }}>✉️ {dbUser.email}</div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ background: `${r.color}20`, color: r.color, fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {r.label}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>System ID</div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{dbUser._id.substring(0, 10)}...</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>Joined Details</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {new Date(dbUser.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
