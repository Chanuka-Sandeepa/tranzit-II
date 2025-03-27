import MaintenanceModel from "../model/MaintenanceModel.js";
import VehicleModel from "../model/Vehiclemodel.js";

// ✅ Record maintenance for a vehicle
export const recordMaintenance = async (req, res) => {
    try {
        const { vehicleId, maintenanceDate, maintenanceType, cost, notes } = req.body;

        const vehicle = await VehicleModel.findById(vehicleId);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        const newMaintenance = new MaintenanceModel({
            vehicleId,
            maintenanceDate,
            maintenanceType,
            cost,
            notes
        });

        await newMaintenance.save();

        vehicle.lastMaintenance = maintenanceDate;
        vehicle.status = "under maintenance";
        vehicle.nextMaintenance = new Date(new Date(maintenanceDate).setMonth(new Date(maintenanceDate).getMonth() + 6)); // Due in 6 months
        await vehicle.save();

        res.status(201).json({ message: "Maintenance recorded", newMaintenance });
    } catch (error) {
        res.status(500).json({ message: "Error recording maintenance", error });
    }
};

// ✅ Get maintenance history for a vehicle
export const getMaintenanceHistory = async (req, res) => {
    try {
        const { vehicleId } = req.params;
        const maintenanceRecords = await MaintenanceModel.find({ vehicleId });
        res.json(maintenanceRecords);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving maintenance records", error });
    }
};

// ✅ Get a specific maintenance record by ID
export const getRecordMaintenance = async (req, res) => {
    try {
        const { maintenanceId } = req.params;
        const maintenanceRecord = await MaintenanceModel.findById(maintenanceId);

        if (!maintenanceRecord) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }

        res.json(maintenanceRecord);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving maintenance record", error });
    }
};
