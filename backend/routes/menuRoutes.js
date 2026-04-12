import express from 'express';
import {
    getMenuItems,
    createMenuItem,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
} from '../controllers/menuController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(getMenuItems)
    .post(protect, authorize('admin', 'staff'), createMenuItem);

router
    .route('/:id')
    .get(getMenuItemById)
    .put(protect, authorize('admin', 'staff'), updateMenuItem)
    .delete(protect, authorize('admin'), deleteMenuItem);

export default router;
