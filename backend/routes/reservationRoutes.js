import express from 'express';
import {
    createReservation,
    getReservations,
    getReservationById,
    updateReservation,
    deleteReservation
} from '../controllers/reservationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(protect, getReservations)
    .post(protect, createReservation);

router
    .route('/:id')
    .get(protect, getReservationById)
    .put(protect, updateReservation)
    .delete(protect, authorize('admin'), deleteReservation);

export default router;
