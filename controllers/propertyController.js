import Property from '../models/Property.js';
import path from 'path';

// Helper function to remove the 'uploads/' prefix
const cleanImagePath = (imagePath) => {
    return imagePath.replace(/^uploads[\\/]/, '');
};

// Add a new property
export const addProperty = async (req, res) => {
    try {
        const { title, location, price, status } = req.body;
        const image = req.file ? req.file.path : '';

        const newProperty = new Property({
            title,
            location,
            price,
            status,
            image
        });

        await newProperty.save();
        res.status(201).json({
            ...newProperty.toObject(),
            image: cleanImagePath(newProperty.image)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all properties
export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        const cleanedProperties = properties.map(property => ({
            ...property.toObject(),
            image: cleanImagePath(property.image)
        }));
        res.status(200).json(cleanedProperties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a property by ID
export const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (property) {
            res.status(200).json({
                ...property.toObject(),
                image: cleanImagePath(property.image)
            });
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a property
export const updateProperty = async (req, res) => {
    try {
        const { title, location, price, status } = req.body;
        const image = req.file ? req.file.path : '';

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            { title, location, price, status, image },
            { new: true } // Return the updated document
        );

        if (updatedProperty) {
            res.status(200).json({
                ...updatedProperty.toObject(),
                image: cleanImagePath(updatedProperty.image)
            });
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a property
export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (property) {
            res.status(200).json({ message: 'Property deleted' });
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
