import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { revenueData, categoryRevenue, menuItems } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '10px 14px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontWeight: 700, fontSize: '0.875rem' }}>
            {p.name}: {typeof p.value === 'number' && p.name?.includes('revenue') ? `$${p.value.toLocaleString()}` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Reports() {
  const { orders, stats } = useApp();
  const topItems = [...menuItems].sort((a, b) => b.orders - a.orders).slice(0, 5);
  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = revenueData.reduce((s, d) => s + d.orders, 0);
  const avgCheck = totalRevenue / totalOrders;

  const completedOrders = orders.filter(o => o.status === 'delivered');
  const totalValue = completedOrders.reduce((s, o) => s + o.total, 0);

  return (
    <div className="page-content">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>Reports & Analytics 📊</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Business performance overview</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Weekly Revenue', value: `$${totalRevenue.toLocaleString()}`, trend: '+14.2%', color: 'var(--color-gold)', bg: 'var(--color-gold-glow)' },
          { label: 'Total Orders', value: totalOrders, trend: '+8.1%', color: 'var(--color-info)', bg: 'var(--color-info-bg)' },
          { label: 'Avg. Check Size', value: `$${avgCheck.toFixed(2)}`, trend: '+5.8%', color: 'var(--color-success)', bg: 'var(--color-success-bg)' },
          { label: 'Best Day Revenue', value: `$${Math.max(...revenueData.map(d => d.revenue)).toLocaleString()}`, trend: 'Saturday', color: 'var(--color-purple)', bg: 'var(--color-purple-bg)' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: kpi.bg, border: `1px solid ${kpi.color}30`, borderRadius: 'var(--radius-lg)', padding: '18px 20px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{kpi.label}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: kpi.color, marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-success)', fontWeight: 600 }}>▲ {kpi.trend}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header"><span className="card-title">Daily Revenue (This Week)</span></div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} barSize={28}>
                <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="#f59e0b" radius={[4, 4, 0, 0]} name="revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><span className="card-title">Orders per Day</span></div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', strokeWidth: 2 }} name="orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Top Menu Items */}
        <div className="card">
          <div className="card-header"><span className="card-title">Top Menu Items</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topItems.map((item, i) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? 'rgba(245,200,66,0.2)' : 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: i === 0 ? 'var(--color-gold)' : 'var(--text-muted)', fontSize: '0.8rem', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <div className="progress-bar" style={{ marginTop: 4 }}>
                    <div className="progress-fill" style={{ width: `${(item.orders / topItems[0].orders) * 100}%`, background: i === 0 ? 'var(--color-gold)' : 'var(--color-info)' }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--color-gold)', fontSize: '0.9rem' }}>{item.orders}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Revenue Breakdown */}
        <div className="card">
          <div className="card-header"><span className="card-title">Category Breakdown</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {categoryRevenue.map(cat => (
              <div key={cat.name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 600 }}>{cat.name}</span>
                  <span style={{ color: cat.color, fontWeight: 700 }}>{cat.value}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${cat.value}%`, background: cat.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Status Summary */}
      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-header"><span className="card-title">Recent Delivered Orders</span></div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Guest</th>
                <th>Table</th>
                <th>Type</th>
                <th>Items</th>
                <th>Total</th>
                <th>Waiter</th>
              </tr>
            </thead>
            <tbody>
              {completedOrders.map(order => (
                <tr key={order.id}>
                  <td><span style={{ fontFamily: 'monospace', color: 'var(--color-gold)', fontWeight: 700 }}>{order.id}</span></td>
                  <td>{order.guestName}</td>
                  <td>Table {order.tableNumber}</td>
                  <td><span className="badge badge-success">{order.type}</span></td>
                  <td>{order.items.length}</td>
                  <td><span style={{ fontWeight: 700, color: 'var(--color-gold)' }}>${order.total.toFixed(2)}</span></td>
                  <td>{order.waiter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
