import Team from '../models/teamModel.js';

/*
  ✅ Create Team Member (Admin Only)
*/
export const createTeamMember = async (req, res) => {
    try {
        const { name, position, image, bio } = req.body;

        // Create Team Member
        const newMember = new Team({ name, position, image, bio });

        await newMember.save();
        res.status(201).json({ message: "Team member added successfully", member: newMember });
    } catch (error) {
        console.error("Error in createTeamMember:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/*
  ✅ Get All Team Members (Public Access)
*/
export const getAllTeamMembers = async (req, res) => {
    try {
        const members = await Team.find();
        res.json(members);
    } catch (error) {
        console.error("Error in getAllTeamMembers:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/*
  ✅ Get Single Team Member by ID (Public Access)
*/
export const getSingleTeamMember = async (req, res) => {
    try {
        const member = await Team.findById(req.params.id);
        if (!member) return res.status(404).json({ message: "Team member not found" });

        res.json(member);
    } catch (error) {
        console.error("Error in getSingleTeamMember:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/*
  ✅ Update Team Member (Admin Only)
*/
export const updateTeamMember = async (req, res) => {
    try {
        const { name, position, image, bio } = req.body;
        const member = await Team.findById(req.params.id);

        if (!member) return res.status(404).json({ message: "Team member not found" });

        // Update Team Member (Fixing Syntax Error)
        member.name = name || member.name;
        member.position = position || member.position;
        member.image = image || member.image;
        member.bio = bio || member.bio;

        await member.save();
        res.json({ message: "Team member updated successfully", member });
    } catch (error) {
        console.error("Error in updateTeamMember:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/*
  ✅ Delete Team Member (Admin Only)
*/
export const deleteTeamMember = async (req, res) => {
    try {
        const member = await Team.findById(req.params.id);
        if (!member) return res.status(404).json({ message: "Team member not found" });

        await member.deleteOne();
        res.json({ message: "Team member deleted successfully" });
    } catch (error) {
        console.error("Error in deleteTeamMember:", error);
        res.status(500).json({ message: "Server error" });
    }
};
