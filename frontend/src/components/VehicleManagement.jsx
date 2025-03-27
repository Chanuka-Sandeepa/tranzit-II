import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({
    vehicleNumber: '',
    vehicleType: '',
    capacity: '',
    fuelType: '',
    status: '', // Consistent lowercase 'status'
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/vehicle');
      if (!response.ok) throw new Error('Failed to fetch vehicles');
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitVehicle = async (e) => {
    e.preventDefault();
    // Validate form fields
    if (!vehicleForm.vehicleNumber || !vehicleForm.vehicleType || !vehicleForm.capacity || !vehicleForm.fuelType || !vehicleForm.status) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const url = currentVehicle ? `http://localhost:9000/api/vehicle/${currentVehicle._id}` : 'http://localhost:9000/api/vehicle';
      const method = currentVehicle ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleForm),
      });
      if (!response.ok) throw new Error('Error saving vehicle');
      fetchVehicles();
      setShowVehicleModal(false);
      setCurrentVehicle(null);
      setVehicleForm({ vehicleNumber: '', vehicleType: '', capacity: '', fuelType: '', status: '' });
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  const handleEditVehicle = (vehicle) => {
    setCurrentVehicle(vehicle);
    setVehicleForm({
      vehicleNumber: vehicle.vehicleNumber,
      vehicleType: vehicle.vehicleType,
      capacity: vehicle.capacity,
      fuelType: vehicle.fuelType,
      status: vehicle.status, // Consistent 'status' field
    });
    setShowVehicleModal(true);
  };

  const handleDeleteVehicle = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      const response = await fetch(`http://localhost:9000/api/vehicle/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error deleting vehicle');
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vehicle Management</h2>
        <button onClick={() => setShowVehicleModal(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <Plus size={18} /> Add Vehicle
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="bg-white shadow-md rounded-md p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{vehicle.vehicleNumber}</h3>
              <div className="flex gap-2">
                <button onClick={() => handleEditVehicle(vehicle)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                <button onClick={() => handleDeleteVehicle(vehicle._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
              </div>
            </div>
            <p>Type: {vehicle.vehicleType}</p>
            <p>Capacity: {vehicle.capacity}</p>
            <p>Fuel Type: {vehicle.fuelType}</p>
            <p>Status: {vehicle.status}</p>
          </div>
        ))}
      </div>
      {showVehicleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{currentVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
              <button onClick={() => { setShowVehicleModal(false); setCurrentVehicle(null); setVehicleForm({ vehicleNumber: '', vehicleType: '', capacity: '', fuelType: '', status: '' }); }} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleSubmitVehicle}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Vehicle Number</label>
                  <input type="text" name="vehicleNumber" value={vehicleForm.vehicleNumber} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Vehicle Type</label>
                  <input type="text" name="vehicleType" value={vehicleForm.vehicleType} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Capacity</label>
                  <input type="number" name="capacity" value={vehicleForm.capacity} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Fuel Type</label>
                  <input type="text" name="fuelType" value={vehicleForm.fuelType} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <input type="text" name="status" value={vehicleForm.status} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md" required />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setShowVehicleModal(false)} className="px-4 py-2 border rounded-md hover:bg-gray-100">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{currentVehicle ? 'Update Vehicle' : 'Add Vehicle'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;
