import express from 'express';
import multer from 'multer';
import path from 'path'; 
import { addProperty, getProperties, getPropertyById, updateProperty, deleteProperty } from '../controllers/propertyController.js';

const router = express.Router();

// Configure multer for image uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Routes
router.post('/properties', upload.single('image'), addProperty);
router.get('/properties', getProperties);
router.get('/properties/:id', getPropertyById);
router.put('/properties/:id', upload.single('image'), updateProperty);
router.delete('/properties/:id', deleteProperty);

export default router;
