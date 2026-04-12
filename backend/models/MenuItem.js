import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a menu item name'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
            enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: 0,
        },
        description: {
            type: String,
            required: false,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        preparationTime: {
            type: Number, // in minutes
            default: 15,
        }
    },
    { timestamps: true }
);

export default mongoose.model('MenuItem', menuItemSchema);
