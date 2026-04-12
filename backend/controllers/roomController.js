import asyncHandler from '../middleware/asyncHandler.js';
import Room from '../models/Room.js';

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = asyncHandler(async (req, res) => {
    const rooms = await Room.find({});
    res.json(rooms);
});

// @desc    Get single room by ID
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (room) {
        res.json(room);
    } else {
        res.status(404);
        throw new Error('Room not found');
    }
});

// @desc    Create a room
// @route   POST /api/rooms
// @access  Public
const createRoom = asyncHandler(async (req, res) => {
    const { roomNumber, type, price, status, description, capacity, amenities } = req.body;

    const roomExists = await Room.findOne({ roomNumber });

    if (roomExists) {
        res.status(400);
        throw new Error('Room already exists');
    }

    const room = await Room.create({
        roomNumber,
        type,
        price,
        status,
        description,
        capacity,
        amenities
    });

    if (room) {
        res.status(201).json(room);
    } else {
        res.status(400);
        throw new Error('Invalid room data');
    }
});

// @desc    Update a room
// @route   PUT /api/rooms/:id
// @access  Public
const updateRoom = asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (room) {
        room.roomNumber = req.body.roomNumber || room.roomNumber;
        room.type = req.body.type || room.type;
        room.price = req.body.price || room.price;
        room.status = req.body.status || room.status;
        room.description = req.body.description || room.description;
        room.capacity = req.body.capacity || room.capacity;
        room.amenities = req.body.amenities || room.amenities;

        const updatedRoom = await room.save();
        res.json(updatedRoom);
    } else {
        res.status(404);
        throw new Error('Room not found');
    }
});

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Public
const deleteRoom = asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (room) {
        await room.deleteOne();
        res.json({ message: 'Room removed' });
    } else {
        res.status(404);
        throw new Error('Room not found');
    }
});

export { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };
