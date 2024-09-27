import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import propertyRoutes from './routes/propertyRoutes.js';

dotenv.config();  // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (for uploaded images)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Property routes
app.use('/api/properties', propertyRoutes);

// MongoDB connection
const DB = process.env.MONGODB_URI || `mongodb+srv://harshit14012006:harshit14012006@cluster0.rvw7t6o.mongodb.net/realestateDB?retryWrites=true&w=majority`;

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas: realestateDB'))
    .catch((err) => console.log('Error connecting to MongoDB', err));

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
