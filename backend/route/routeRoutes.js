import express from "express";
import { 
    addRoute, 
    getRouteByStop, 
    getRouteById, 
    updateRoute, 
    deleteRoute,
    getAllRoutes
} from "../Controller/routeController.js"; // ✅ Fixed import path

const router = express.Router();

router.post("/", addRoute); // Add a new route
router.get("/", getAllRoutes); // Get all routes
router.get("/search", getRouteByStop); // ✅ Search route by stop name
router.get("/:id", getRouteById); // Get a route by ID
router.put("/:id", updateRoute); // Update route by ID
router.delete("/:id", deleteRoute); // Delete route by ID

export default router;
