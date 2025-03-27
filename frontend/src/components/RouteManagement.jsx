import { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, Edit, Trash2 } from 'lucide-react';

const RouteManagement = ({ routes, fetchRoutes }) => {
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [routeForm, setRouteForm] = useState({
    routeName: '',
    source: '',
    destination: '',
    stops: '',
    distance: '',
    estimatedTime: '',
    active: true, // Changed from 'Status' to 'active' as a boolean
  });

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRouteForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox for boolean
    }));
  };

  // Handle form submission (Add/Edit Route)
  const handleSubmitRoute = async (e) => {
    e.preventDefault();
    try {
      const url = currentRoute ? `http://localhost:5000/api/route/${currentRoute._id}` : 'http://localhost:5000/api/route';
      const method = currentRoute ? 'PUT' : 'POST';
      // Convert stops from comma-separated string to array
      const updatedRouteForm = {
        ...routeForm,
        stops: routeForm.stops.split(',').map((stop) => stop.trim()),
      };
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRouteForm),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchRoutes(); // Refresh routes after successful operation
      setShowRouteModal(false);
      setCurrentRoute(null);
      setRouteForm({
        routeName: '',
        source: '',
        destination: '',
        stops: '',
        distance: '',
        estimatedTime: '',
        active: true, // Reset to default active state
      });
    } catch (error) {
      console.error('Error saving route:', error);
    }
  };

  // Handle route editing
  const handleEditRoute = (route) => {
    setCurrentRoute(route);
    setRouteForm({
      routeName: route.routeName,
      source: route.source,
      destination: route.destination,
      stops: route.stops.join(','), // Convert array to comma-separated string
      distance: route.distance,
      estimatedTime: route.estimatedTime,
      active: route.active, // Ensure 'active' is a boolean
    });
    setShowRouteModal(true);
  };

  // Handle route deletion
  const handleDeleteRoute = async (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/route/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchRoutes(); // Refresh routes after deletion
      } catch (error) {
        console.error('Error deleting route:', error);
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Route Management</h2>
        <button
          onClick={() => setShowRouteModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Route
        </button>
      </div>

      {/* Routes List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {routes.map((route) => (
          <div key={route._id} className="bg-white shadow-md rounded-md p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{route.routeName}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditRoute(route)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteRoute(route._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="mt-2 text-sm space-y-1">
              <p>Source: {route.source}</p>
              <p>Destination: {route.destination}</p>
              <p>Stops: {route.stops.join(', ')}</p>
              <p>Distance: {route.distance} km</p>
              <p>Estimated Time: {route.estimatedTime}</p>
              <p>
                Status:{' '}
                <span
                  className={`font-bold ${
                    route.active ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {route.active ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Route Modal */}
      {showRouteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{currentRoute ? 'Edit Route' : 'Add New Route'}</h3>
              <button
                onClick={() => {
                  setShowRouteModal(false);
                  setCurrentRoute(null);
                  setRouteForm({
                    routeName: '',
                    source: '',
                    destination: '',
                    stops: '',
                    distance: '',
                    estimatedTime: '',
                    active: true, // Reset to default active state
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitRoute}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route Name</label>
                  <input
                    type="text"
                    name="routeName"
                    value={routeForm.routeName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <input
                    type="text"
                    name="source"
                    value={routeForm.source}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input
                    type="text"
                    name="destination"
                    value={routeForm.destination}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stops (comma separated)</label>
                  <input
                    type="text"
                    name="stops"
                    value={routeForm.stops}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
                  <input
                    type="number"
                    name="distance"
                    value={routeForm.distance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time</label>
                  <input
                    type="text"
                    name="estimatedTime"
                    value={routeForm.estimatedTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="active" // Changed from 'Status' to 'active'
                    value={routeForm.active}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowRouteModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {currentRoute ? 'Update Route' : 'Add Route'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

RouteManagement.propTypes = {
  routes: PropTypes.array.isRequired,
  fetchRoutes: PropTypes.func.isRequired,
};

export default RouteManagement;