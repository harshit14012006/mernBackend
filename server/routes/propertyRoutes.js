import express from 'express';
import multer from 'multer';
import { addProperty, getProperties, getPropertyById, updateProperty, deleteProperty } from '../controllers/propertyController.js';

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes
router.post('/add', upload.single('image'), addProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.put('/:id', upload.single('image'), updateProperty);
router.delete('/:id', deleteProperty);

export default router;
