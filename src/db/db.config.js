import mongoose from 'mongoose';
import dotenv from 'dotenv/config';

export const initMongoDb = async () => {
    try {
        await mongoose.connect(
            process.env.URLMongoDb
        );
    } catch (error) {
        throw new Error(error)
    }
};

// // environment variables config
// dotenv.config();
// const URLConnection = process.env.URLMongoDb;

// // conexión a la base de datos
// mongoose.connect(URLConnection);