import { useState, useEffect } from "react";
import { Menu, LogOut, Truck, Map, Settings, Users } from "lucide-react";
import RouteManagement from "../../components/RouteManagement.jsx";
import VehicleManagement from "../../components/VehicleManagement.jsx";
import MaintenanceManagement from "../../components/MaintenanceManagement.jsx";
import UserManagement from "../../components/UserManagement.jsx";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("routes");
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchRoutes();
    fetchVehicles();
    fetchUsers();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/route");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/vehicles");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/user");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Logout Functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white shadow-md transition-all duration-300`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`${isSidebarOpen ? "block" : "hidden"} text-xl font-bold`}>Admin Panel</h1>
          <button className="p-2 hover:bg-gray-200 rounded-md" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4 space-y-4">
          <button
            className={`flex items-center gap-2 w-full p-2 rounded-md ${activeSection === "routes" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveSection("routes")}
          >
            <Map size={20} />
            <span className={`${isSidebarOpen ? "inline" : "hidden"}`}>Routes</span>
          </button>

          <button
            className={`flex items-center gap-2 w-full p-2 rounded-md ${activeSection === "vehicles" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveSection("vehicles")}
          >
            <Truck size={20} />
            <span className={`${isSidebarOpen ? "inline" : "hidden"}`}>Vehicles</span>
          </button>

          <button
            className={`flex items-center gap-2 w-full p-2 rounded-md ${activeSection === "maintenance" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveSection("maintenance")}
          >
            <Settings size={20} />
            <span className={`${isSidebarOpen ? "inline" : "hidden"}`}>Maintenance</span>
          </button>

          <button
            className={`flex items-center gap-2 w-full p-2 rounded-md ${activeSection === "users" ? "bg-gray-200" : ""}`}
            onClick={() => setActiveSection("users")}
          >
            <Users size={20} />
            <span className={`${isSidebarOpen ? "inline" : "hidden"}`}>Users</span>
          </button>

          {/* Logout Button */}
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-800 w-full mt-6">
            <LogOut size={18} />
            <span className={`${isSidebarOpen ? "inline" : "hidden"}`}>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeSection === "routes" && <RouteManagement routes={routes} fetchRoutes={fetchRoutes} />}
        {activeSection === "vehicles" && <VehicleManagement vehicles={vehicles} fetchVehicles={fetchVehicles} />}
        {activeSection === "maintenance" && <MaintenanceManagement />}
        {activeSection === "users" && <UserManagement users={users} fetchUsers={fetchUsers} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
