import mongoose from "mongoose";

const RouteSchema = mongoose.Schema({
    routeName: { type: String, required: true }, // e.g., "NYC to Boston"
    source: { type: String, required: true },
    destination: { type: String, required: true },
    stops: [{ type: String }], // Intermediate stops
    distance: { type: Number, required: true }, // Distance in km/miles
    estimatedTime: { type: String, required: true }, // Duration
    active: { type: Boolean, default: true, required: true}, // Route availability
    createdAt: { type: Date, default: Date.now },
});

const RouteModel = mongoose.model("Route", RouteSchema);
export default RouteModel;
