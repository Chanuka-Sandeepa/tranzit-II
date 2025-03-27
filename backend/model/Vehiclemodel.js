import mongoose from "mongoose";

const VehicleSchema = mongoose.Schema({
    vehicleNumber: { type: String, required: true, unique: true }, // e.g., "Bus 101"
    vehicleType: { type: String, required: true, enum: ["bus", "train"] }, // Restrict to public transport types
    capacity: { type: Number, required: true },
    fuelType: { type: String, required: true, enum: ["diesel", "electric", "hybrid"] },
    status: { type: String, required: true, enum: ["operational", "maintenance", "inactive"] },
    lastMaintenance: { type: Date, default: null }, // Last maintenance date
    nextMaintenance: { type: Date, default: null }, // Scheduled maintenance
    createdAt: { type: Date, default: Date.now },
});

const VehicleModel = mongoose.model("Vehicle", VehicleSchema);
export default VehicleModel;
