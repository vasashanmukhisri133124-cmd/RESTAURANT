import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        
        if (!mongoUri) {
            console.error('MONGO_URI environment variable is not set');
            console.error('Please set your MongoDB connection string');
            process.exit(1);
        }
        
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
