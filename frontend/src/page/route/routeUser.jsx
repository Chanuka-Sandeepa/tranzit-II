import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Search } from "lucide-react";

const API_URL = "http://localhost:5000/api/route"; // Ensure backend is running

export default function RouteManagement() {
  const [routes, setRoutes] = useState([]);
  const [searchStop, setSearchStop] = useState(""); // Changed to search by stop
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Routes
  const fetchRoutes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched routes:", response.data); // Debugging
      setRoutes(response.data || []);
    } catch (error) {
      console.error("Error fetching routes:", error);
      setError("Failed to fetch routes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  // Search Routes by bus stop
  const handleSearch = async () => {
    const sanitizedStop = searchStop.trim().replace(/[^a-zA-Z0-9\s]/g, ""); // Sanitize input
    if (!sanitizedStop) return; // Prevent empty searches

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: { stop: sanitizedStop }, // Searching by bus stop
      });

      console.log("Search results:", response.data); // Debugging

      // Ensure response data is always an array
      const routes = Array.isArray(response.data) ? response.data : [];
      setRoutes(routes);

      // Set error message if no routes are found
      if (routes.length === 0) {
        setError("No matching routes found.");
      } else {
        setError(null);
      }
    } catch (error) {
      console.error("Error searching routes:", error);

      // Differentiate between no matches and technical errors
      setError(
        error.response ? "No matching routes found." : "An error occurred while searching."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Route Management</h1>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Bus Stop"
          className="border p-2 rounded w-1/3"
          value={searchStop}
          onChange={(e) => setSearchStop(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          <Search size={16} /> {loading ? "Searching..." : "Find Routes"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading State */}
      {loading && <p>Loading routes...</p>}

      {/* Routes List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {routes.map((route) => (
          <div key={route._id} className="bg-white shadow-md rounded-md p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{route.routeName}</h3>
              <div className="flex gap-2">
              </div>
            </div>
            <div className="mt-2 text-sm space-y-1">
              <p>Source: {route.source}</p>
              <p>Destination: {route.destination}</p>
              <p>Stops: {route.stops.join(", ")}</p>
              <p>Distance: {route.distance} km</p>
              <p>Estimated Time: {route.estimatedTime}</p>
              <p>
                Status:{" "}
                <span className={`font-bold ${route.active ? "text-green-600" : "text-red-600"}`}>
                  {route.active ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
