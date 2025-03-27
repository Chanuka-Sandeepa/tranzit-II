import express from "express";
import { 
    addVehicle, 
    getAllVehicles, 
    getVehicleByNumber, 
    updateVehicle, 
    deleteVehicle 
} from "../Controller/VehicleController.js";

const router = express.Router();

router.post("/", addVehicle); // Add a new vehicle
router.get("/", getAllVehicles); // Get all vehicles
router.get("/search/:vehicleNumber", getVehicleByNumber); // Search vehicle by number
router.put("/:id", updateVehicle); // Update vehicle by ID
router.delete("/:id", deleteVehicle); // Delete vehicle by ID

export default router;
