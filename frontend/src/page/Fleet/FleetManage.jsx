import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Search, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const API_URL = "http://localhost:9000/api/vehicle"; // Vehicle API URL
const MAINTENANCE_URL = "http://localhost:9000/api/maintenance"; // Maintenance API URL

export default function RouteManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [searchVehicleNumber, setSearchVehicleNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);

  // Fetch all vehicles once
  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched vehicles:", response.data);
      setVehicles(response.data || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setError("Failed to fetch vehicles.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  // Fetch maintenance history for a selected vehicle
  const fetchMaintenanceHistory = async (vehicleId) => {
    try {
      const response = await axios.get(`${MAINTENANCE_URL}/${vehicleId}`);
      setMaintenanceHistory(response.data);
    } catch (error) {
      console.error("Error fetching maintenance history:", error);
      setMaintenanceHistory([]);
    }
  };

  // Show maintenance history modal
  const handleShowMaintenanceHistory = (vehicle) => {
    setSelectedVehicle(vehicle);
    fetchMaintenanceHistory(vehicle._id);
    setShowModal(true);
  };

  // Filter vehicles based on searchVehicleNumber
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.vehicleNumber.toLowerCase().includes(searchVehicleNumber.toLowerCase().trim())
  );

  const MaintenanceHistoryModal = ({ vehicle, maintenanceHistory, onClose }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Maintenance History for {vehicle.vehicleName}</h2>
        <ul>
          {maintenanceHistory.length > 0 ? (
            maintenanceHistory.map((history, index) => (
              <li key={index} className="border-b py-2">
                <p><strong>Date:</strong> {new Date(history.maintenanceDate).toLocaleDateString()}</p>
                <p><strong>Type:</strong> {history.maintenanceType}</p>
                <p><strong>Cost:</strong> ${history.cost}</p>
                <p><strong>Notes:</strong> {history.notes}</p>
              </li>
            ))
          ) : (
            <p>No maintenance history available.</p>
          )}
        </ul>
        <button 
          onClick={onClose} 
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );

  MaintenanceHistoryModal.propTypes = {
    vehicle: PropTypes.shape({
      vehicleName: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
    maintenanceHistory: PropTypes.arrayOf(
      PropTypes.shape({
        maintenanceDate: PropTypes.string.isRequired,
        maintenanceType: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        notes: PropTypes.string,
      })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
      </div>

      {/* Search Bar */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Vehicle Number"
          className="border p-2 rounded w-1/3"
          value={searchVehicleNumber}
          onChange={(e) => setSearchVehicleNumber(e.target.value)}
        />
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          <Search size={16} /> Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading State */}
      {loading && <p>Loading vehicles...</p>}

      {/* Vehicle List */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle, index) => (
            <motion.div 
              key={vehicle._id} 
              className="border rounded-lg shadow p-4 flex flex-col justify-between bg-white hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div>
                <h2 className="text-xl font-semibold">{vehicle.vehicleName}</h2>
                <p>Vehicle Number: {vehicle.vehicleNumber}</p>
                <p>Vehicle Type: {vehicle.vehicleType}</p>
                <p>Capacity: {vehicle.capacity}</p>
                <p>Fuel Type: {vehicle.fuelType}</p>
                <p>Status: 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    vehicle.status === "active" ? "bg-green-100 text-green-800" :
                    vehicle.status === "under maintenance" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {vehicle.status}
                  </span>
                </p>
                {vehicle.lastMaintenance && (
                  <p>Last Maintenance: {new Date(vehicle.lastMaintenance).toLocaleDateString()}</p>
                )}
              </div>

              <button 
                className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition"
                onClick={() => handleShowMaintenanceHistory(vehicle)}
              >
                <Wrench size={16} /> Maintenance History
              </button>
            </motion.div>
          ))
        ) : (
          !loading && <p className="col-span-3 text-center">No vehicles found.</p>
        )}
      </motion.div>

      {/* Maintenance History Modal */}
      {showModal && selectedVehicle && (
        <MaintenanceHistoryModal
          vehicle={selectedVehicle}
          maintenanceHistory={maintenanceHistory}
          onClose={() => setShowModal(false)}
        />
      )}
    </motion.div>
  );
}