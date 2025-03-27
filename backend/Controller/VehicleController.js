import VehicleModel from "../model/Vehiclemodel.js";

// ✅ Add a new vehicle
export const addVehicle = async (req, res) => {
    try {
        const { vehicleNumber, vehicleType, capacity, fuelType, status} = req.body;

        // Validate required fields
        if (!vehicleNumber || !vehicleType || !capacity || !fuelType || !status) {
            return res.status(400).json({ message: "Missing required fields: vehicleNumber, vehicleType, and capacity are required." });
        }

        // Create new vehicle
        const newVehicle = new VehicleModel({
            vehicleNumber,
            vehicleType,
            capacity,
            fuelType: fuelType || "diesel",
            status: status || "operational",
        });

        // Save the new vehicle
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ message: "Error adding vehicle", error });
    }
};

// ✅ Get all vehicles
export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await VehicleModel.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving vehicles", error });
    }
};

// ✅ Get a vehicle by its Number (Case-insensitive)
export const getVehicleByNumber = async (req, res) => {
    try {
        const { vehicleNumber } = req.params;

        // Case-insensitive search by vehicle number
        const vehicle = await VehicleModel.findOne({
            vehicleNumber: { $regex: `^${vehicleNumber}$`, $options: "i" }
        });

        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving vehicle", error });
    }
};

// ✅ Update vehicle details
export const updateVehicle = async (req, res) => {
    try {
        const { id } = req.params;

        // Check for required fields before updating
        const { vehicleNumber, vehicleType, capacity, fuelType, status, active } = req.body;
        if (!vehicleNumber || !vehicleType || !capacity) {
            return res.status(400).json({ message: "Missing required fields: vehicleNumber, vehicleType, and capacity are required." });
        }

        // Update vehicle by ID
        const updatedVehicle = await VehicleModel.findByIdAndUpdate(id, {
            vehicleNumber,
            vehicleType,
            capacity,
            fuelType,
            status,
        }, { new: true });

        if (!updatedVehicle) return res.status(404).json({ message: "Vehicle not found" });

        res.json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ message: "Error updating vehicle", error });
    }
};

// ✅ Delete a vehicle
export const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVehicle = await VehicleModel.findByIdAndDelete(id);

        if (!deletedVehicle) return res.status(404).json({ message: "Vehicle not found" });

        res.json({ message: "Vehicle deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting vehicle", error });
    }
};
