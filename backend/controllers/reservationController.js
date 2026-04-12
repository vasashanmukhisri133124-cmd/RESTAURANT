import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    }
};

export const getReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({}).sort({ date: 1, time: 1 });
        res.json(reservations);
    } catch (error) {
        next(error);
    }
};

export const getReservationById = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404);
            throw new Error('Reservation not found');
        }
    } catch (error) {
        next(error);
    }
};

export const updateReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404);
            throw new Error('Reservation not found');
        }
    } catch (error) {
        next(error);
    }
};

export const deleteReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (reservation) {
            res.json({ message: 'Reservation removed' });
        } else {
            res.status(404);
            throw new Error('Reservation not found');
        }
    } catch (error) {
        next(error);
    }
};
