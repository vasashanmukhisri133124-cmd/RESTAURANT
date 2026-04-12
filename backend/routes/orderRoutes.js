import express from 'express';
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .post(protect, authorize('admin', 'staff'), createOrder)
    .get(protect, authorize('admin', 'staff'), getOrders);

router.route('/:id').get(protect, authorize('admin', 'staff'), getOrderById);

router.route('/:id/status').put(protect, authorize('admin', 'staff'), updateOrderStatus);

export default router;
