import Property from '../models/Property.js';

// Helper function to remove the 'uploads/' prefix
const cleanImagePath = (imagePath) => {
    return imagePath.replace(/^uploads[\\/]/, '');
};

// Add a new property
export const addProperty = async (req, res) => {
    const { title, location, price, status } = req.body;
    const image = cleanImagePath(req.file.path); // Clean the image path

    const newProperty = new Property({
        title,
        location,
        price,
        status,
        image,
    });

    try {
        await newProperty.save();
        res.status(201).json({ message: 'Property added successfully', property: newProperty });
    } catch (error) {
        res.status(500).json({ message: 'Error adding property', error: error.message });
    }
};

// Get all properties
export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties', error: error.message });
    }
};

// Get property by ID
export const getPropertyById = async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching property', error: error.message });
    }
};

// Update a property
export const updateProperty = async (req, res) => {
    const { id } = req.params;
    const { title, location, price, status } = req.body;
    let image;

    if (req.file) {
        image = cleanImagePath(req.file.path); // Clean the image path
    }

    try {
        const updatedProperty = await Property.findByIdAndUpdate(
            id,
            { title, location, price, status, image },
            { new: true }
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
    } catch (error) {
        res.status(500).json({ message: 'Error updating property', error: error.message });
    }
};

// Delete a property
export const deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProperty = await Property.findByIdAndDelete(id);
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting property', error: error.message });
    }
};
