import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        position: { type: String, required: true, trim: true },
        image: { type: String, required: true }, // Image URL
        bio: { type: String, required: true, trim: true },
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);

const Team = mongoose.model('Team', teamSchema);
export default Team;
