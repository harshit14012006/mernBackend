import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import propertyRoutes from './routes/propertyRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
const directory = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(directory));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/realestateDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api', propertyRoutes);

// Route to show a message on the home page
app.get('/', (req, res) => {
  res.send('<h1>Server is running successfully!</h1><p>Welcome to the Real Estate API</p>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
