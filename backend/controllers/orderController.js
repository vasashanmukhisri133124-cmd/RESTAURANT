import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/Staff
export const createOrder = async (req, res, next) => {
    try {
        const { tableNumber, items, totalPrice } = req.body;

        if (items && items.length === 0) {
            res.status(400);
            throw new Error('No order items');
        } else {
            const order = new Order({
                tableNumber,
                items,
                totalPrice,
                createdBy: req.user._id,
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Staff
export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate('createdBy', 'name').populate('items.menuItem', 'name price');
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Staff
export const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('createdBy', 'name').populate('items.menuItem', 'name price');
        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Staff
export const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        next(error);
    }
};
