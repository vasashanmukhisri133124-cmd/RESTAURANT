import { useApp } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { revenueData, categoryRevenue } from '../data/mockData';
import { format } from 'date-fns';

const statusConfig = {
  pending: { label: 'Pending', color: 'var(--color-warning)', bg: 'var(--color-warning-bg)' },
  preparing: { label: 'Preparing', color: 'var(--color-info)', bg: 'var(--color-info-bg)' },
  ready: { label: 'Ready', color: 'var(--color-success)', bg: 'var(--color-success-bg)' },
  delivered: { label: 'Delivered', color: 'var(--color-purple)', bg: 'var(--color-purple-bg)' },
};

function StatCard({ icon, label, value, sub, iconBg, iconColor, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: iconBg }}>
        <span style={{ color: iconColor, fontSize: '1.3rem' }}>{icon}</span>
      </div>
      <div className="stat-info">
        <div className="stat-value" style={{ color: iconColor }}>{value}</div>
        <div className="stat-label">{label}</div>
        {trend && <div className="stat-change" style={{ color: trend > 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
          {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}% vs yesterday
        </div>}
        {sub && <div className="stat-change text-muted">{sub}</div>}
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '10px 14px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: 4 }}>{label}</p>
        <p style={{ color: 'var(--color-gold)', fontWeight: 700 }}>${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { stats, orders, tables, currentTime } = useApp();

  const recentOrders = orders.slice(0, 5);
  const occupancyPct = Math.round((stats.tablesOccupied / stats.tablesTotal) * 100);

  return (
    <div className="page-content">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1200 0%, #2d1f00 50%, #1a0d00 100%)',
        border: '1px solid rgba(245,200,66,0.2)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        marginBottom: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(245,200,66,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span className="live-badge">
              <span className="pulse pulse-danger" />
              Live
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              {format(currentTime, 'EEEE, MMMM d yyyy — HH:mm:ss')}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--color-gold)', marginBottom: 4 }}>
            Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}, Chef! 👨‍🍳
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {stats.activeOrders} active orders • {stats.tablesOccupied} of {stats.tablesTotal} tables occupied
          </p>
        </div>
        <div style={{ display: 'flex', gap: 16, flexShrink: 0 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-gold)' }}>
              ${stats.todayRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Today's Revenue</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard icon="📋" label="Active Orders" value={stats.activeOrders} trend={12} iconBg="var(--color-warning-bg)" iconColor="var(--color-warning)" />
        <StatCard icon="⏳" label="Pending" value={stats.pendingOrders} sub="Awaiting kitchen" iconBg="rgba(239,68,68,0.1)" iconColor="var(--color-danger)" />
        <StatCard icon="✅" label="Ready to Serve" value={stats.readyOrders} sub="Awaiting delivery" iconBg="var(--color-success-bg)" iconColor="var(--color-success)" />
        <StatCard icon="🪑" label="Table Occupancy" value={`${occupancyPct}%`} sub={`${stats.tablesOccupied}/${stats.tablesTotal} tables`} iconBg="var(--color-info-bg)" iconColor="var(--color-info)" />
        <StatCard icon="📅" label="Reservations" value={stats.totalReservations} trend={8} iconBg="var(--color-purple-bg)" iconColor="var(--color-purple)" />
        <StatCard icon="⚠️" label="Low Stock" value={stats.lowStockItems} sub="Items need restocking" iconBg="rgba(239,68,68,0.1)" iconColor="var(--color-danger)" />
      </div>

      {/* Charts Row */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Weekly Revenue</span>
            <span style={{ color: 'var(--color-success)', fontSize: '0.8rem', fontWeight: 600 }}>▲ 14.2% this week</span>
          </div>
          <div className="chart-container" style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Revenue by Category</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <PieChart width={160} height={160}>
              <Pie data={categoryRevenue} cx={75} cy={75} innerRadius={45} outerRadius={72} dataKey="value" paddingAngle={3}>
                {categoryRevenue.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {categoryRevenue.map(cat => (
                <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', flex: 1 }}>{cat.name}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Orders</span>
          <span className="live-badge"><span className="pulse pulse-danger" />Live</span>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Table</th>
                <th>Guest</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => {
                const cfg = statusConfig[order.status] || {};
                const mins = Math.floor((Date.now() - order.createdAt) / 60000);
                return (
                  <tr key={order.id}>
                    <td><span style={{ fontFamily: 'monospace', color: 'var(--color-gold)', fontWeight: 700 }}>{order.id}</span></td>
                    <td><span style={{ fontWeight: 600 }}>Table {order.tableNumber}</span></td>
                    <td>{order.guestName}</td>
                    <td>{order.items.length} items</td>
                    <td><span style={{ fontWeight: 700, color: 'var(--color-gold)' }}>${order.total.toFixed(2)}</span></td>
                    <td>
                      <span style={{ background: cfg.bg, color: cfg.color, padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        {cfg.label}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{mins}m ago</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Overview */}
      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-header">
          <span className="card-title">Table Status Overview</span>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { color: 'var(--color-success)', label: 'Available' },
              { color: 'var(--color-danger)', label: 'Occupied' },
              { color: 'var(--color-warning)', label: 'Reserved' },
              { color: 'var(--color-info)', label: 'Cleaning' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {tables.map(table => {
            const colors = { available: 'var(--color-success)', occupied: 'var(--color-danger)', reserved: 'var(--color-warning)', cleaning: 'var(--color-info)' };
            const bgs = { available: 'rgba(16,185,129,0.1)', occupied: 'rgba(239,68,68,0.1)', reserved: 'rgba(245,158,11,0.1)', cleaning: 'rgba(59,130,246,0.1)' };
            return (
              <div key={table.id} style={{
                background: bgs[table.status], border: `1px solid ${colors[table.status]}40`, borderRadius: 'var(--radius-md)',
                padding: '10px 14px', minWidth: 90, textAlign: 'center', cursor: 'default'
              }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: colors[table.status] }}>T{table.number}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{table.capacity} seats</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 600, color: colors[table.status], textTransform: 'uppercase', marginTop: 2 }}>{table.status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
