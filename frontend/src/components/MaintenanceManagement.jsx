import { useState, useEffect } from 'react';
import { Plus, Eye } from 'lucide-react';

const MaintenanceManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState({
    vehicleId: '',
    maintenanceDate: '',
    maintenanceType: '',
    cost: 0,
    notes: '',
  });

  const [maintenanceHistory, setMaintenanceHistory] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [maintenanceRecord, setMaintenanceRecord] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/vehicle');
      if (!response.ok) throw new Error('Failed to fetch vehicles');
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      alert('Failed to load vehicles. Please try again later.');
    }
  };

  const fetchMaintenanceHistory = async (vehicleId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/maintenance/${vehicleId}`);
      if (!response.ok) throw new Error('Failed to fetch maintenance records');
      const data = await response.json();
      setMaintenanceHistory(data);
      setSelectedVehicle(vehicles.find(v => v._id === vehicleId));
      setShowHistoryModal(true);
    } catch (error) {
      console.error('Error fetching maintenance history:', error);
    }
  };

  const fetchSpecificMaintenanceRecord = async (maintenanceId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/maintenance/maintenance/${maintenanceId}`);
      if (!response.ok) throw new Error('Failed to fetch maintenance record');
      const data = await response.json();
      setMaintenanceRecord(data);
      setShowRecordModal(true);
    } catch (error) {
      console.error('Error fetching maintenance record:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaintenanceForm((prev) => ({
      ...prev,
      [name]: name === 'cost' ? Number(value) : value,
    }));
  };

  const handleSubmitMaintenance = async (e) => {
    e.preventDefault();
    if (!maintenanceForm.vehicleId) {
      alert('Please select a vehicle');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(maintenanceForm),
      });
      if (!response.ok) throw new Error('Error recording maintenance');
      setShowMaintenanceModal(false);
      setMaintenanceForm({ 
        vehicleId: '', 
        maintenanceDate: '', 
        maintenanceType: '', 
        cost: 0, 
        notes: '' 
      });
      alert('Maintenance recorded successfully!');
    } catch (error) {
      console.error('Error saving maintenance:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Vehicle Maintenance</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="bg-white shadow-md rounded-md p-4 flex flex-col">
            <h3 className="text-lg font-medium mb-2">{vehicle.vehicleNumber}</h3>
            <div className="flex justify-between mt-auto">
              <button
                onClick={() => fetchMaintenanceHistory(vehicle._id)} 
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Eye size={18} /> History
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowMaintenanceModal(true)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
      >
        <Plus size={18} /> Record Maintenance
      </button>

      {/* Maintenance History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                Maintenance History for {selectedVehicle?.vehicleNumber}
              </h3>
              <button 
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {maintenanceHistory.length > 0 ? (
              <div className="space-y-4">
                {maintenanceHistory.map((record) => (
                  <div key={record._id} className="border p-4 rounded-md hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p><strong>Date:</strong> {new Date(record.maintenanceDate).toLocaleDateString()}</p>
                        <p><strong>Type:</strong> {record.maintenanceType}</p>
                        <p><strong>Cost:</strong> ${record.cost.toFixed(2)}</p>
                        {record.notes && <p><strong>Notes:</strong> {record.notes}</p>}
                      </div>
                      <button
                        onClick={() => fetchSpecificMaintenanceRecord(record._id)}
                        className="text-green-600 hover:text-green-800 flex items-center gap-1"
                      >
                        <Eye size={16} /> Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No maintenance records found for this vehicle.</p>
            )}
          </div>
        </div>
      )}

      {/* Single Maintenance Record Modal */}
      {showRecordModal && maintenanceRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Maintenance Details</h3>
              <button 
                onClick={() => setShowRecordModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <p><strong>Vehicle:</strong> {vehicles.find(v => v._id === maintenanceRecord.vehicleId)?.vehicleNumber || 'N/A'}</p>
              <p><strong>Date:</strong> {new Date(maintenanceRecord.maintenanceDate).toLocaleDateString()}</p>
              <p><strong>Type:</strong> {maintenanceRecord.maintenanceType}</p>
              <p><strong>Cost:</strong> ${maintenanceRecord.cost.toFixed(2)}</p>
              {maintenanceRecord.notes && <p><strong>Notes:</strong> {maintenanceRecord.notes}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Modal for recording maintenance */}
      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Record Maintenance</h3>
              <button 
                onClick={() => setShowMaintenanceModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitMaintenance} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vehicle</label>
                <select
                  name="vehicleId"
                  value={maintenanceForm.vehicleId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select a Vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.vehicleNumber}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="maintenanceDate"
                  value={maintenanceForm.maintenanceDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <input
                  type="text"
                  name="maintenanceType"
                  value={maintenanceForm.maintenanceType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cost</label>
                <input
                  type="number"
                  name="cost"
                  value={maintenanceForm.cost}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={maintenanceForm.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows="3"
                ></textarea>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowMaintenanceModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceManagement;