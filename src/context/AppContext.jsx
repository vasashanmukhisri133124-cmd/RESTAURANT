import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { menuItems as initialMenu, tables as initialTables, orders as initialOrders, staff as initialStaff, inventory as initialInventory, reservations as initialReservations } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [menuItems, setMenuItems] = useState(initialMenu);
  const [tables, setTables] = useState(initialTables);
  const [orders, setOrders] = useState(initialOrders);
  const [staff] = useState(initialStaff);
  const [inventory, setInventory] = useState(initialInventory);
  const [reservations, setReservations] = useState(initialReservations);
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time order updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev.map(order => {
        if (order.status === 'pending' && Math.random() > 0.85) {
          addNotification(`Order ${order.id} (Table ${order.tableNumber}) is now being prepared!`, 'info');
          return { ...order, status: 'preparing' };
        }
        if (order.status === 'preparing' && Math.random() > 0.9) {
          addNotification(`Order ${order.id} is ready for delivery! 🎉`, 'success');
          return { ...order, status: 'ready' };
        }
        return order;
      }));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  const addOrder = useCallback((orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      status: 'pending',
      createdAt: new Date(),
    };
    setOrders(prev => [newOrder, ...prev]);
    addNotification(`New order placed for Table ${orderData.tableNumber}`, 'success');
    return newOrder;
  }, [addNotification]);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    addNotification(`Order ${orderId} marked as ${status}`, 'success');
  }, [addNotification]);

  const updateTableStatus = useCallback((tableId, status) => {
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, status } : t));
  }, []);

  const toggleMenuItemAvailability = useCallback((itemId) => {
    setMenuItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
  }, []);

  const addMenuItem = useCallback((item) => {
    const newItem = { ...item, id: Date.now(), orders: 0, rating: 0 };
    setMenuItems(prev => [...prev, newItem]);
    addNotification(`"${item.name}" added to menu!`, 'success');
  }, [addNotification]);

  const addReservation = useCallback((res) => {
    const newRes = { ...res, id: Date.now(), status: 'confirmed' };
    setReservations(prev => [...prev, newRes]);
    addNotification(`Reservation confirmed for ${res.guestName}`, 'success');
  }, [addNotification]);

  const stats = {
    todayRevenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0),
    activeOrders: orders.filter(o => ['pending', 'preparing'].includes(o.status)).length,
    tablesOccupied: tables.filter(t => t.status === 'occupied').length,
    tablesTotal: tables.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    readyOrders: orders.filter(o => o.status === 'ready').length,
    lowStockItems: inventory.filter(i => i.quantity <= i.minStock).length,
    totalReservations: reservations.filter(r => r.status === 'confirmed').length,
  };

  return (
    <AppContext.Provider value={{
      menuItems, tables, orders, staff, inventory, reservations,
      notifications, currentTime, stats,
      addOrder, updateOrderStatus, updateTableStatus,
      toggleMenuItemAvailability, addMenuItem, addReservation,
      addNotification, setInventory,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
