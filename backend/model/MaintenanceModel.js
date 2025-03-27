import mongoose from "mongoose";

const MaintenanceSchema = mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    maintenanceDate: { type: Date, required: true },
    maintenanceType: { type: String, required: true }, // e.g., "Oil Change", "Engine Check"
    cost: { type: Number, required: true },
    notes: { type: String }, // Additional comments
    createdAt: { type: Date, default: Date.now },
});

const MaintenanceModel = mongoose.model("Maintenance", MaintenanceSchema);
export default MaintenanceModel;
