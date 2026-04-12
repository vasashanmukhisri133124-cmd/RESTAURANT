import { useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

// Pages
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';
import OrderManagement from './pages/OrderManagement';
import KitchenBoard from './pages/KitchenBoard';
import TableManagement from './pages/TableManagement';
import Reservations from './pages/Reservations';
import Inventory from './pages/Inventory';
import StaffManagement from './pages/StaffManagement';
import Reports from './pages/Reports';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '🏠', exact: true },
  { path: '/orders', label: 'Orders', icon: '📋', badgeKey: 'pendingOrders' },
  { path: '/kitchen', label: 'Kitchen Board', icon: '🍳', badgeKey: 'activeOrders' },
  { path: '/menu', label: 'Menu', icon: '🍽️' },
  { path: '/tables', label: 'Tables', icon: '🪑' },
  { path: '/reservations', label: 'Reservations', icon: '📅', badgeKey: 'totalReservations' },
  { path: '/inventory', label: 'Inventory', icon: '📦', badgeKey: 'lowStockItems' },
  { path: '/staff', label: 'Staff', icon: '👥' },
  { path: '/reports', label: 'Reports', icon: '📊' },
];

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Hotel Food Management Overview' },
  '/orders': { title: 'Order Management', subtitle: 'Track and manage all food orders' },
  '/kitchen': { title: 'Kitchen Board', subtitle: 'Real-time kitchen order queue' },
  '/menu': { title: 'Menu Management', subtitle: 'Manage your restaurant menu' },
  '/tables': { title: 'Table Management', subtitle: 'Monitor table status and assignments' },
  '/reservations': { title: 'Reservations', subtitle: 'Manage dining reservations' },
  '/inventory': { title: 'Inventory', subtitle: 'Track ingredient and supply levels' },
  '/staff': { title: 'Staff', subtitle: 'Team management and performance' },
  '/reports': { title: 'Reports', subtitle: 'Analytics and business performance' },
};

function NotificationToast({ notification }) {
  const icons = { success: '✅', info: 'ℹ️', warning: '⚠️', error: '❌' };
  const colors = {
    success: 'var(--color-success)',
    info: 'var(--color-info)',
    warning: 'var(--color-warning)',
    error: 'var(--color-danger)',
  };

  return (
    <div className="notification">
      <span style={{ fontSize: '1.2rem' }}>{icons[notification.type]}</span>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{notification.message}</p>
      </div>
    </div>
  );
}

function Layout() {
  const { stats, notifications, currentTime } = useApp();
  const location = useLocation();
  const currentPage = pageTitles[location.pathname] || { title: 'Hotel Food System', subtitle: '' };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  
  if (!user) {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🍴</div>
          <div className="sidebar-logo-text">
            <span className="sidebar-logo-title">Grand Luxe</span>
            <span className="sidebar-logo-subtitle">Food Management</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-label">Main</span>
          {navItems.slice(0, 3).map(item => {
            const badge = item.badgeKey ? stats[item.badgeKey] : null;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span>{item.label}</span>
                {badge > 0 && <span className="badge">{badge}</span>}
              </NavLink>
            );
          })}

          <span className="nav-section-label" style={{ marginTop: 8 }}>Restaurant</span>
          {navItems.slice(3, 6).map(item => {
            const badge = item.badgeKey ? stats[item.badgeKey] : null;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span>{item.label}</span>
                {badge > 0 && <span className="badge">{badge}</span>}
              </NavLink>
            );
          })}

          <span className="nav-section-label" style={{ marginTop: 8 }}>Management</span>
          {navItems.slice(6).map(item => {
            const badge = item.badgeKey ? stats[item.badgeKey] : null;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span>{item.label}</span>
                {badge > 0 && <span className="badge">{badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="avatar" style={{ width: 36, height: 36, fontSize: '0.8rem' }}>AM</div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user.role}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <span className="header-title">{currentPage.title}</span>
            <span className="header-subtitle">{currentPage.subtitle}</span>
          </div>
          <div className="header-right">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
              <span className="pulse pulse-success" style={{ width: 7, height: 7 }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
            <button className="header-btn" title="Notifications">
              🔔
              {stats.pendingOrders > 0 && <span className="dot" />}
            </button>
            <button className="header-btn" title="Logout" onClick={logout}>📤</button>
            <div className="avatar">{user.name.substring(0, 2).toUpperCase()}</div>
          </div>
        </header>

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/kitchen" element={<KitchenBoard />} />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/tables" element={<TableManagement />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>

      {/* Notifications Stack */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
        {notifications.map(n => (
          <NotificationToast key={n.id} notification={n} />
        ))}
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }} onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Layout />
      </AppProvider>
    </AuthProvider>
  );
}
