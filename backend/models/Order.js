import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        tableNumber: {
            type: Number,
            required: [true, 'Please provide a table number'],
        },
        items: [
            {
                menuItem: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'MenuItem',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        status: {
            type: String,
            required: true,
            enum: ['Pending', 'Preparing', 'Ready', 'Served', 'Cancelled'],
            default: 'Pending',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
