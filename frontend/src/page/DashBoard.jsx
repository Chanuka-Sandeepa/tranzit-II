import { useState, useEffect } from "react"; // Import Search icon
import { useNavigate } from "react-router-dom"; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TransitHub = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClick = () => {
    navigate("/routeUser"); // Navigate to '/route'
  };
  const vehicle = () => {
    navigate("/vehicle"); // Navigate to '/vehicle'
  };
  const profileuser = () => {
    navigate("/profileUser"); // Navigate to '/profileUser'
  };


  const heroImages = [
    "https://img.freepik.com/free-photo/traffic-vehicle-urban-reflections-city_1112-973.jpg?t=st=1740905855~exp=1740909455~hmac=4c07046c8ec2ecc99a7d3c50b8e0dcec26dd065362e7c5f51e7c8106391aa2a6&w=1380",
    "https://img.freepik.com/free-photo/transportation-mode-speeds-railroad-tracks-sunset-generative-ai_188544-12492.jpg?t=st=1740905998~exp=1740909598~hmac=e5e3ab683cb2a6f5b0b4b603382e18b1caad79a65a33d28751de5df58a05ae3b&w=1800",
  ];
  
  // Passenger stats data
  const passengerData = [
    { name: 'Mon', passengers: 820 },
    { name: 'Tue', passengers: 932 },
    { name: 'Wed', passengers: 901 },
    { name: 'Thu', passengers: 934 },
    { name: 'Fri', passengers: 1290 },
    { name: 'Sat', passengers: 1330 },
    { name: 'Sun', passengers: 1320 },
  ];
  
  // Active tickets data
  const activeTickets = [
    {
      id: 1,
      from: "Central Station",
      to: "Airport Terminal 1",
      date: "2025-02-26",
      time: "11:30 AM",
      type: "Express Train",
      status: "Active",
    },
    {
      id: 2,
      from: "West Harbor",
      to: "Business District",
      date: "2025-02-26",
      time: "2:15 PM",
      type: "Metro",
      status: "Active",
    },
  ];
  
  // Fleet status data
  const fleetStatus = [
    {
      id: 1,
      route: "Route A1",
      status: "On Time",
      type: "Bus",
      nextArrival: "5 mins",
    },
    {
      id: 2,
      route: "Route M3",
      status: "Delayed",
      type: "Metro",
      nextArrival: "12 mins",
    },
    {
      id: 3,
      route: "Route T2",
      status: "On Time",
      type: "Train",
      nextArrival: "3 mins",
    },
  ];
  
  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  
    navigate("/", { replace: true }); // Redirects to login
    window.location.reload(); // Ensures state updates in App.js
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-blue-600 text-2xl mr-2">🚌</div>
              <span className="text-xl font-bold text-gray-800">TransitHub</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-gray-600 hover:text-blue-600 font-medium">Home</button>
              <button className="text-gray-600 hover:text-blue-600 font-medium" onClick={handleClick}>Routes</button>
              <button className="text-gray-600 hover:text-blue-600 font-medium" onClick={vehicle}>Vehicle</button>
              <button className="text-gray-600 hover:text-blue-600 font-medium">Tickets</button>
              <button className="text-gray-600 hover:text-blue-600">🔔</button>
              <button className="text-gray-600 hover:text-blue-600" onClick={profileuser}>👤</button>
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <div className="pt-16 flex-grow">
        {/* Hero Section */}
        <div
          className="relative h-150 bg-cover bg-center transition-all duration-1"
          style={{
            backgroundImage: `url('${heroImages[currentImageIndex]}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent">
            <div className="max-w-7xl mx-auto h-full flex items-center">
              <div className="max-w-2xl px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  Smart Transit Solutions for Modern Cities
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Experience seamless urban mobility with real-time tracking,
                  smart ticketing, and sustainable transportation options.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                    Book Now
                  </button>
                  <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 font-semibold">
                    View Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto py-12 px-4 ">
          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 border-2 border-green-500 rounded-xl p-6 text-center">
              <div className="text-4xl text-blue-600 mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-gray-600">
                Track your transit in real-time with accurate arrival predictions
              </p>
            </div>
            <div className="bg-gray-50 border-2 border-green-500 rounded-xl p-6 text-center">
              <div className="text-4xl text-blue-600 mb-4">🎫</div>
              <h3 className="text-xl font-semibold mb-2">Smart Ticketing</h3>
              <p className="text-gray-600">
                Paperless tickets with QR code scanning for quick boarding
              </p>
            </div>
            <div className="bg-gray-50 border-2 border-green-500 rounded-xl p-6 text-center">
              <div className="text-4xl text-blue-600 mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-2">Route Planning</h3>
              <p className="text-gray-600">
                Intelligent route suggestions based on real-time conditions
              </p>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Active Tickets */}
            <div className="bg-gray-50 rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Active Tickets</h3>
              <div className="space-y-4">
                {activeTickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{ticket.type}</span>
                      <span className="text-green-500">{ticket.status}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>From: {ticket.from}</div>
                      <div>To: {ticket.to}</div>
                      <div>
                        Date: {ticket.date} {ticket.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fleet Status */}
            <div className="bg-gray-50 rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6">Fleet Status</h3>
              <div className="space-y-4">
                {fleetStatus.map((fleet) => (
                  <div key={fleet.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{fleet.route}</span>
                      <span
                        className={fleet.status === "On Time" ? "text-green-500" : "text-orange-500"}
                      >
                        {fleet.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      <div>Type: {fleet.type}</div>
                      <div>Next Arrival: {fleet.nextArrival}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Usage Statistics */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Transport Usage Statistics
            </h3>
            <div className="h-64 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={passengerData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="passengers" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Support</h4>
              <p>24/7 Customer Service</p>
              <p>Email: support@transithub.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 text-2xl">
                  📱
                </a>
                <a href="#" className="hover:text-blue-400 text-2xl">
                  📢
                </a>
                <a href="#" className="hover:text-blue-400 text-2xl">
                  📸
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TransitHub;