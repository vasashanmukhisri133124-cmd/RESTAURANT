import express from 'express';
const router = express.Router();
import {
    getRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
} from '../controllers/roomController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.route('/').get(getRooms).post(protect, authorize('admin', 'staff'), createRoom);
router.route('/:id').get(getRoomById).put(protect, authorize('admin', 'staff'), updateRoom).delete(protect, authorize('admin'), deleteRoom);

export default router;
