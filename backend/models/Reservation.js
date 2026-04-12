import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
    {
        guestName: {
            type: String,
            required: [true, 'Please provide guest name'],
        },
        contactInfo: {
            type: String,
            required: [true, 'Please provide contact information'],
        },
        date: {
            type: Date,
            required: [true, 'Please provide reservation date'],
        },
        time: {
            type: String,
            required: [true, 'Please provide reservation time'],
        },
        numberOfGuests: {
            type: Number,
            required: [true, 'Please provide number of guests'],
            min: 1,
        },
        tableNumber: {
            type: Number,
        },
        status: {
            type: String,
            enum: ['Confirmed', 'Pending', 'Cancelled', 'Completed'],
            default: 'Pending',
        },
        notes: {
            type: String,
        }
    },
    { timestamps: true }
);

export default mongoose.model('Reservation', reservationSchema);
