import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        image: { type: String, required: true }, // Image URL
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
