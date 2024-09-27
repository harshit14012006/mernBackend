import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true, enum: ['sold', 'available', 'pending'], default: 'available' },
    image: { type: String, required: false }
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

export default Property;
