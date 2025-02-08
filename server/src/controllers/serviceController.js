import Service from '../models/serviceModel.js';

/**
 * @route   POST /api/services
 * @desc    Create a new service (Admin Only)
 */
export const createService = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;

        // Create Service
        const newService = new Service({ name, description, price, image });
        await newService.save();

        res.status(201).json({ message: "Service added successfully", service: newService });
    } catch (error) {
        console.error("Error in createService:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * @route   GET /api/services
 * @desc    Get all services (Public)
 */
export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        console.error("Error in getAllServices:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * @route   GET /api/services/:id
 * @desc    Get a single service by ID (Public)
 */
export const getSingleService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });

        res.json(service);
    } catch (error) {
        console.error("Error in getSingleService:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * @route   PUT /api/services/:id
 * @desc    Update a service by ID (Admin Only)
 */
export const updateService = async (req, res) => {
    try {
        const { name, description, price, image } = req.body;
        const service = await Service.findById(req.params.id);

        if (!service) return res.status(404).json({ message: "Service not found" });

        // Update service fields
        service.name = name || service.name;
        service.description = description || service.description;
        service.price = price || service.price;
        service.image = image || service.image;

        await service.save();
        res.json({ message: "Service updated successfully", service });
    } catch (error) {
        console.error("Error in updateService:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * @route   DELETE /api/services/:id
 * @desc    Delete a service by ID (Admin Only)
 */
export const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });

        await service.deleteOne();
        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error in deleteService:", error);
        res.status(500).json({ message: "Server error" });
    }
};
