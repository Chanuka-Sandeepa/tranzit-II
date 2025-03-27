import RouteModel from "../model/Route.js";

// ✅ Add a new route
export const addRoute = async (req, res) => {
    try {
        const { routeName, source, destination, stops, distance, estimatedTime, active } = req.body;

        // Validate required fields
        if (!routeName || !source || !destination || !stops || !distance || !estimatedTime) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newRoute = new RouteModel({
            routeName,
            source,
            destination,
            stops,
            distance,
            estimatedTime,
            active: active !== undefined ? active : true, // Default status is true (active)
        });

        await newRoute.save();
        res.status(201).json(newRoute);
    } catch (error) {
        res.status(500).json({ message: "Error adding route", error: error.message });
    }
};

// ✅ Search route by stop name
export const getRouteByStop = async (req, res) => {
    try {
        const { stop } = req.query;

        if (!stop) {
            return res.status(400).json({ message: "Stop name is required for search." });
        }

        const sanitizedStop = stop.trim(); // Sanitize input
        console.log("Searching for stop:", sanitizedStop);

        // Case-insensitive search within the stops array
        const routes = await RouteModel.find({
            stops: { $regex: new RegExp(sanitizedStop, "i") }
        });

        console.log("Found routes:", routes);

        if (routes.length === 0) {
            return res.status(404).json({ message: "No routes found for this stop" });
        }

        res.json(routes);
    } catch (error) {
        console.error("Error retrieving routes:", error);
        res.status(500).json({ message: "Error retrieving routes", error: error.message });
    }
};

// ✅ Get all routes
export const getAllRoutes = async (req, res) => {
    try {
        const routes = await RouteModel.find();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving routes", error: error.message });
    }
};

// ✅ Get a route by ID
export const getRouteById = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await RouteModel.findById(id);

        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }

        res.json(route);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving route", error: error.message });
    }
};

// ✅ Update route details
export const updateRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const { active, ...rest } = req.body; // Extract active separately
        const updatedData = { ...rest };

        if (active !== undefined) {
            updatedData.active = active; // Ensure active is updated properly
        }

        const updatedRoute = await RouteModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRoute) {
            return res.status(404).json({ message: "Route not found" });
        }

        res.json(updatedRoute);
    } catch (error) {
        res.status(500).json({ message: "Error updating route", error: error.message });
    }
};

// ✅ Delete a route
export const deleteRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRoute = await RouteModel.findByIdAndDelete(id);

        if (!deletedRoute) {
            return res.status(404).json({ message: "Route not found" });
        }

        res.json({ message: "Route deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting route", error: error.message });
    }
};
