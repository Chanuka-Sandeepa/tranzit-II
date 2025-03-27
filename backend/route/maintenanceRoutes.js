import express from "express";
import { 
    recordMaintenance, 
    getMaintenanceHistory ,
    getRecordMaintenance
} from "../Controller/maintenanceController.js";

const router = express.Router();

router.post("/", recordMaintenance); // Record maintenance
router.get("/:vehicleId", getMaintenanceHistory); // Get maintenance history by vehicle ID
router.get('/maintenance/:maintenanceId', getRecordMaintenance); // New route for single maintenance record

export default router;
