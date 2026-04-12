import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
    {
        roomNumber: {
            type: String,
            required: [true, 'Please add a room number'],
            unique: true,
        },
        type: {
            type: String,
            required: [true, 'Please add a room type'],
            enum: ['Single', 'Double', 'Suite', 'Deluxe'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price per night'],
        },
        status: {
            type: String,
            required: true,
            enum: ['Available', 'Booked', 'Maintenance'],
            default: 'Available',
        },
        description: {
            type: String,
        },
        capacity: {
            adults: { type: Number, required: true, default: 1 },
            children: { type: Number, required: true, default: 0 },
        },
        amenities: {
            type: [String],
        }
    },
    {
        timestamps: true,
    }
);

const Room = mongoose.model('Room', roomSchema);

export default Room;
