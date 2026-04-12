// ============================================================
// HOTEL FOOD MANAGEMENT SYSTEM - MOCK DATA
// ============================================================

export const MENU_CATEGORIES = ['All', 'Breakfast', 'Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Specials'];

export const menuItems = [
  { id: 1, name: 'Classic Eggs Benedict', category: 'Breakfast', price: 18.50, cost: 6.20, emoji: '🍳', available: true, prepTime: 12, rating: 4.8, orders: 342, description: 'Poached eggs on English muffin with hollandaise', allergens: ['Egg', 'Gluten', 'Dairy'] },
  { id: 2, name: 'Avocado Toast', category: 'Breakfast', price: 14.00, cost: 4.50, emoji: '🥑', available: true, prepTime: 8, rating: 4.6, orders: 289, description: 'Smashed avocado on sourdough with microgreens', allergens: ['Gluten'] },
  { id: 3, name: 'French Toast Stack', category: 'Breakfast', price: 16.00, cost: 5.10, emoji: '🍞', available: true, prepTime: 10, rating: 4.7, orders: 198, description: 'Brioche french toast, maple syrup, fresh berries', allergens: ['Egg', 'Gluten', 'Dairy'] },
  { id: 4, name: 'Shrimp Cocktail', category: 'Appetizers', price: 24.00, cost: 10.00, emoji: '🍤', available: true, prepTime: 5, rating: 4.9, orders: 421, description: 'Chilled jumbo shrimp with house cocktail sauce', allergens: ['Shellfish'] },
  { id: 5, name: 'Truffle Bruschetta', category: 'Appetizers', price: 16.50, cost: 5.80, emoji: '🥖', available: true, prepTime: 7, rating: 4.5, orders: 187, description: 'Toasted ciabatta, black truffle, fresh tomatoes', allergens: ['Gluten'] },
  { id: 6, name: 'Beef Tenderloin', category: 'Main Course', price: 68.00, cost: 28.00, emoji: '🥩', available: true, prepTime: 25, rating: 4.9, orders: 156, description: '8oz center-cut, red wine reduction, seasonal veg', allergens: [] },
  { id: 7, name: 'Pan-Seared Salmon', category: 'Main Course', price: 42.00, cost: 16.00, emoji: '🐟', available: true, prepTime: 18, rating: 4.7, orders: 234, description: 'Atlantic salmon, lemon butter, asparagus', allergens: ['Fish', 'Dairy'] },
  { id: 8, name: 'Mushroom Risotto', category: 'Main Course', price: 32.00, cost: 9.50, emoji: '🍄', available: true, prepTime: 22, rating: 4.6, orders: 178, description: 'Arborio rice, wild mushrooms, parmesan, truffle oil', allergens: ['Dairy'] },
  { id: 9, name: 'Lobster Thermidor', category: 'Main Course', price: 85.00, cost: 42.00, emoji: '🦞', available: false, prepTime: 30, rating: 5.0, orders: 89, description: 'Whole lobster, cognac cream, gruyère crust', allergens: ['Shellfish', 'Dairy', 'Egg'] },
  { id: 10, name: 'Chocolate Fondant', category: 'Desserts', price: 14.00, cost: 3.50, emoji: '🍫', available: true, prepTime: 15, rating: 4.9, orders: 312, description: 'Warm dark chocolate cake, vanilla ice cream', allergens: ['Egg', 'Gluten', 'Dairy'] },
  { id: 11, name: 'Crème Brûlée', category: 'Desserts', price: 12.00, cost: 3.00, emoji: '🍮', available: true, prepTime: 5, rating: 4.8, orders: 267, description: 'Classic vanilla custard with caramelized top', allergens: ['Egg', 'Dairy'] },
  { id: 12, name: 'Signature Cocktail', category: 'Beverages', price: 18.00, cost: 5.50, emoji: '🍹', available: true, prepTime: 3, rating: 4.7, orders: 445, description: 'Passion fruit, premium rum, coconut cream', allergens: [] },
  { id: 13, name: 'Fresh Juice Blend', category: 'Beverages', price: 9.00, cost: 2.20, emoji: '🍊', available: true, prepTime: 2, rating: 4.5, orders: 322, description: 'Seasonal fruits, ginger, turmeric boost', allergens: [] },
  { id: 14, name: 'Chef\'s Tasting Menu', category: 'Specials', price: 120.00, cost: 48.00, emoji: '🌟', available: true, prepTime: 90, rating: 5.0, orders: 67, description: '7-course seasonal tasting menu with wine pairing', allergens: ['Egg', 'Gluten', 'Dairy', 'Fish'] },
  { id: 15, name: 'Wagyu Burger', category: 'Main Course', price: 38.00, cost: 14.00, emoji: '🍔', available: true, prepTime: 16, rating: 4.8, orders: 203, description: 'Wagyu beef patty, aged cheddar, truffle mayo', allergens: ['Gluten', 'Dairy', 'Egg'] },
];

export const TABLE_STATUSES = { AVAILABLE: 'available', OCCUPIED: 'occupied', RESERVED: 'reserved', CLEANING: 'cleaning' };

export const tables = [
  { id: 1, number: '1', capacity: 2, status: 'occupied', section: 'Indoor', currentOrder: 'ORD-1001', waiter: 'James K.' },
  { id: 2, number: '2', capacity: 4, status: 'available', section: 'Indoor', currentOrder: null, waiter: null },
  { id: 3, number: '3', capacity: 4, status: 'reserved', section: 'Indoor', currentOrder: null, waiter: 'Sarah M.', reservationTime: '7:30 PM' },
  { id: 4, number: '4', capacity: 6, status: 'occupied', section: 'Indoor', currentOrder: 'ORD-1002', waiter: 'Mike R.' },
  { id: 5, number: '5', capacity: 2, status: 'cleaning', section: 'Indoor', currentOrder: null, waiter: null },
  { id: 6, number: '6', capacity: 8, status: 'available', section: 'Indoor', currentOrder: null, waiter: null },
  { id: 7, number: 'T1', capacity: 2, status: 'occupied', section: 'Terrace', currentOrder: 'ORD-1003', waiter: 'Emma L.' },
  { id: 8, number: 'T2', capacity: 4, status: 'available', section: 'Terrace', currentOrder: null, waiter: null },
  { id: 9, number: 'T3', capacity: 4, status: 'reserved', section: 'Terrace', currentOrder: null, waiter: 'James K.', reservationTime: '8:00 PM' },
  { id: 10, number: 'B1', capacity: 10, status: 'occupied', section: 'Banquet', currentOrder: 'ORD-1004', waiter: 'Chris P.' },
  { id: 11, number: 'B2', capacity: 12, status: 'available', section: 'Banquet', currentOrder: null, waiter: null },
  { id: 12, number: 'P1', capacity: 4, status: 'occupied', section: 'Private', currentOrder: 'ORD-1005', waiter: 'Sarah M.' },
];

export const orders = [
  {
    id: 'ORD-1001', tableNumber: '1', guestName: 'Mr. Anderson', roomNumber: '204',
    status: 'preparing', priority: 'normal', type: 'dine-in',
    waiter: 'James K.', createdAt: new Date(Date.now() - 18 * 60000),
    items: [
      { menuItemId: 6, name: 'Beef Tenderloin', qty: 1, price: 68.00, status: 'preparing' },
      { menuItemId: 11, name: 'Crème Brûlée', qty: 2, price: 12.00, status: 'pending' },
      { menuItemId: 12, name: 'Signature Cocktail', qty: 2, price: 18.00, status: 'ready' },
    ],
    subtotal: 128.00, tax: 12.80, total: 140.80, notes: 'Guest prefers medium-rare steak'
  },
  {
    id: 'ORD-1002', tableNumber: '4', guestName: 'Johnson Family', roomNumber: null,
    status: 'pending', priority: 'high', type: 'dine-in',
    waiter: 'Mike R.', createdAt: new Date(Date.now() - 5 * 60000),
    items: [
      { menuItemId: 15, name: 'Wagyu Burger', qty: 2, price: 38.00, status: 'pending' },
      { menuItemId: 7, name: 'Pan-Seared Salmon', qty: 1, price: 42.00, status: 'pending' },
      { menuItemId: 13, name: 'Fresh Juice Blend', qty: 3, price: 9.00, status: 'pending' },
    ],
    subtotal: 145.00, tax: 14.50, total: 159.50, notes: ''
  },
  {
    id: 'ORD-1003', tableNumber: 'T1', guestName: 'Ms. Chen', roomNumber: '512',
    status: 'ready', priority: 'normal', type: 'room-service',
    waiter: 'Emma L.', createdAt: new Date(Date.now() - 35 * 60000),
    items: [
      { menuItemId: 1, name: 'Classic Eggs Benedict', qty: 1, price: 18.50, status: 'ready' },
      { menuItemId: 13, name: 'Fresh Juice Blend', qty: 1, price: 9.00, status: 'ready' },
    ],
    subtotal: 27.50, tax: 2.75, total: 30.25, notes: 'Room 512, deliver by 8am'
  },
  {
    id: 'ORD-1004', tableNumber: 'B1', guestName: 'Corporate Gala', roomNumber: null,
    status: 'preparing', priority: 'urgent', type: 'banquet',
    waiter: 'Chris P.', createdAt: new Date(Date.now() - 45 * 60000),
    items: [
      { menuItemId: 14, name: 'Chef\'s Tasting Menu', qty: 10, price: 120.00, status: 'preparing' },
      { menuItemId: 12, name: 'Signature Cocktail', qty: 15, price: 18.00, status: 'ready' },
    ],
    subtotal: 1470.00, tax: 147.00, total: 1617.00, notes: 'VIP event - extra attention required'
  },
  {
    id: 'ORD-1005', tableNumber: 'P1', guestName: 'Mr. & Mrs. Williams', roomNumber: '801',
    status: 'delivered', priority: 'normal', type: 'dine-in',
    waiter: 'Sarah M.', createdAt: new Date(Date.now() - 70 * 60000),
    items: [
      { menuItemId: 6, name: 'Beef Tenderloin', qty: 2, price: 68.00, status: 'delivered' },
      { menuItemId: 10, name: 'Chocolate Fondant', qty: 2, price: 14.00, status: 'delivered' },
      { menuItemId: 12, name: 'Signature Cocktail', qty: 2, price: 18.00, status: 'delivered' },
    ],
    subtotal: 200.00, tax: 20.00, total: 220.00, notes: 'Anniversary dinner'
  },
];

export const staff = [
  { id: 1, name: 'Chef Antoine Dubois', role: 'Head Chef', shift: 'Morning', status: 'on-duty', speciality: 'French Cuisine', orders: 12, rating: 4.9 },
  { id: 2, name: 'Chef Maria Santos', role: 'Sous Chef', shift: 'Morning', status: 'on-duty', speciality: 'Pastry & Desserts', orders: 8, rating: 4.8 },
  { id: 3, name: 'James Kim', role: 'Senior Waiter', shift: 'Evening', status: 'on-duty', speciality: 'Table Service', orders: 24, rating: 4.7 },
  { id: 4, name: 'Sarah Mitchell', role: 'Senior Waiter', shift: 'Morning', status: 'on-duty', speciality: 'Wine Service', orders: 18, rating: 4.9 },
  { id: 5, name: 'Mike Rodriguez', role: 'Waiter', shift: 'Evening', status: 'on-duty', speciality: 'Table Service', orders: 20, rating: 4.6 },
  { id: 6, name: 'Emma Liu', role: 'Waiter', shift: 'Morning', status: 'on-duty', speciality: 'Table Service', orders: 15, rating: 4.7 },
  { id: 7, name: 'Chris Parker', role: 'Banquet Server', shift: 'Evening', status: 'on-duty', speciality: 'Banquet Service', orders: 5, rating: 4.8 },
  { id: 8, name: 'Lisa Johnson', role: 'Hostess', shift: 'Morning', status: 'break', speciality: 'Guest Relations', orders: 0, rating: 4.9 },
];

export const inventory = [
  { id: 1, name: 'Premium Beef Tenderloin', category: 'Protein', unit: 'kg', quantity: 8.5, minStock: 5, maxStock: 20, cost: 45.00, supplier: 'Green Valley Farms', lastRestocked: '2026-03-17' },
  { id: 2, name: 'Atlantic Salmon', category: 'Protein', unit: 'kg', quantity: 3.2, minStock: 4, maxStock: 15, cost: 22.00, supplier: 'Ocean Fresh Co.', lastRestocked: '2026-03-18' },
  { id: 3, name: 'Black Truffle', category: 'Specialty', unit: 'g', quantity: 180, minStock: 200, maxStock: 500, cost: 120.00, supplier: 'European Delicacies', lastRestocked: '2026-03-15' },
  { id: 4, name: 'Heavy Cream', category: 'Dairy', unit: 'L', quantity: 12.5, minStock: 8, maxStock: 30, cost: 4.50, supplier: 'Happy Cow Dairy', lastRestocked: '2026-03-18' },
  { id: 5, name: 'Arborio Rice', category: 'Grain', unit: 'kg', quantity: 6.0, minStock: 5, maxStock: 20, cost: 3.20, supplier: 'Italian Imports', lastRestocked: '2026-03-10' },
  { id: 6, name: 'Jumbo Shrimp', category: 'Seafood', unit: 'kg', quantity: 2.1, minStock: 3, maxStock: 10, cost: 28.00, supplier: 'Ocean Fresh Co.', lastRestocked: '2026-03-17' },
  { id: 7, name: 'Dark Chocolate', category: 'Pastry', unit: 'kg', quantity: 4.5, minStock: 3, maxStock: 12, cost: 18.00, supplier: 'Belgian Chocolatiers', lastRestocked: '2026-03-12' },
  { id: 8, name: 'White Wine', category: 'Beverage', unit: 'bottle', quantity: 24, minStock: 20, maxStock: 60, cost: 12.00, supplier: 'Chateau Imports', lastRestocked: '2026-03-14' },
  { id: 9, name: 'Red Wine', category: 'Beverage', unit: 'bottle', quantity: 18, minStock: 20, maxStock: 60, cost: 15.00, supplier: 'Chateau Imports', lastRestocked: '2026-03-14' },
  { id: 10, name: 'Sourdough Bread', category: 'Bakery', unit: 'loaf', quantity: 8, minStock: 5, maxStock: 20, cost: 6.00, supplier: 'Artisan Bakery', lastRestocked: '2026-03-18' },
];

export const reservations = [
  { id: 1, guestName: 'Robert Chen', partySize: 4, date: '2026-03-18', time: '19:00', tableNumber: '3', roomNumber: '402', status: 'confirmed', occasion: 'Birthday', specialRequests: 'Cake preparation needed' },
  { id: 2, guestName: 'Williams Family', partySize: 6, date: '2026-03-18', time: '20:00', tableNumber: 'T3', roomNumber: null, status: 'confirmed', occasion: 'Anniversary', specialRequests: 'Champagne on arrival' },
  { id: 3, guestName: 'Dr. Patricia Moore', partySize: 2, date: '2026-03-18', time: '20:30', tableNumber: null, roomNumber: '615', status: 'pending', occasion: 'Business', specialRequests: 'Quiet corner table' },
  { id: 4, guestName: 'Thompson Corp. Dinner', partySize: 12, date: '2026-03-19', time: '19:00', tableNumber: 'B2', roomNumber: null, status: 'confirmed', occasion: 'Corporate', specialRequests: 'Pre-selected 3-course menu' },
  { id: 5, guestName: 'Mr. & Mrs. Garcia', partySize: 2, date: '2026-03-19', time: '20:00', tableNumber: null, roomNumber: '310', status: 'confirmed', occasion: 'Honeymoon', specialRequests: 'Rose petals on table' },
];

export const revenueData = [
  { day: 'Mon', revenue: 4200, orders: 48, avgCheck: 87.5 },
  { day: 'Tue', revenue: 3800, orders: 41, avgCheck: 92.7 },
  { day: 'Wed', revenue: 5100, orders: 56, avgCheck: 91.1 },
  { day: 'Thu', revenue: 6200, orders: 64, avgCheck: 96.9 },
  { day: 'Fri', revenue: 8900, orders: 89, avgCheck: 100.0 },
  { day: 'Sat', revenue: 12400, orders: 120, avgCheck: 103.3 },
  { day: 'Sun', revenue: 9800, orders: 95, avgCheck: 103.2 },
];

export const categoryRevenue = [
  { name: 'Main Course', value: 38, color: '#f59e0b' },
  { name: 'Beverages', value: 22, color: '#3b82f6' },
  { name: 'Desserts', value: 18, color: '#8b5cf6' },
  { name: 'Appetizers', value: 14, color: '#10b981' },
  { name: 'Specials', value: 8, color: '#ef4444' },
];
