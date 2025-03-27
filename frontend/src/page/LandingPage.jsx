import {  useState, useEffect } from "react";
import { motion } from 'framer-motion'; 
import { Link } from 'react-scroll'; 
import { FaArrowUp } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const userImages = [
    "https://media.istockphoto.com/id/1455027590/photo/casual-asian-woman.jpg?s=1024x1024&w=is&k=20&c=tXs1YynwrXzp6IVbjCnQbrhRd5dZQH_VE6DScQ4yQi4=",
    "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://cdn.pixabay.com/photo/2022/08/21/22/29/smile-7402270_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/01/28/10/26/man-6974298_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/12/23/16/47/people-6889599_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/12/16/14/46/black-man-4699505_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/04/26/16/05/sunglasses-3352288_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/03/22/04/57/portrait-2163997_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/01/12/10/44/woman-597173_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/01/21/17/45/woman-3946473_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/11/10/02/30/woman-8378634_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/06/05/19/49/man-4254423_1280.jpg"
  ];


  const heroImages = [
    "https://img.freepik.com/free-photo/african-american-man-riding-city-bus-guy-brown-coat-man-with-notebook_1157-46219.jpg?t=st=1740588058~exp=1740591658~hmac=509eda8c5401d90145e7c9edacb72a7332c003eeda1c4ae181a96f8e5ec11344&w=1380",
    "https://img.freepik.com/free-photo/young-adult-travelling-winter-time_23-2149211136.jpg?t=st=1740587824~exp=1740591424~hmac=523a4f6b641a6aad88bced24e98d7788cdd5aec8a2e0a8dc8d77fece52f71972&w=1380",
    "https://img.freepik.com/free-photo/cute-girl-railway-station-looking-down_23-2148771050.jpg?t=st=1740588083~exp=1740591683~hmac=0dc66f3a0368f0a8d9dd43c4d397f72f63bd12bba6852363d7902f7702734c50&w=1380",
    "https://cdn.pixabay.com/photo/2015/11/15/23/10/bus-1044939_1280.jpg"
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const feedbackData = [
    {
      name: "John Doe",
      feedback: "Great app! It's super easy to use, and I love the interface!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      feedback: "Amazing service, always on time and very reliable!",
      rating: 4,
    },
    {
      name: "Mike Johnson",
      feedback: "I love the features, but I think the app can use a few more improvements.",
      rating: 3,
    },
    {
      name: "Emily Davis",
      feedback: "Great experience! Highly recommended for everyone!",
      rating: 5,
    },
    {
      name: "Chris Wilson",
      feedback: "The customer support is amazing, always quick to respond!",
      rating: 4,
    },
    {
      name: "Sarah Brown",
      feedback: "A bit slow at times, but overall a good service.",
      rating: 3,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % feedbackData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [feedbackData.length]);

  const currentFeedbacks = feedbackData.slice(currentIndex, currentIndex + 3);

  const navigate = useNavigate();
  

  return (

    
    <div className="min-h-screen bg-[#00cca6]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">Jadoo</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="hero-section" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-gray-900">
                Home
              </Link>
              <Link to="features-section" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-gray-900">
                Services
              </Link>
              <Link to="About-section" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-gray-900">
                About Us
              </Link>
              <Link to="feedback-section" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-gray-900">
               Feedbacks
              </Link>
              <Link to="Contact-section" smooth={true} duration={500} className="cursor-pointer text-gray-700 hover:text-gray-900">
                Contact
              </Link>
              {/* Login Button */}
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400"
                onClick={() => navigate('/login')} // Navigate to Login page
              >
                Login
              </button>

              {/* Sign Up Button */}
              <button
                className="px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400"
                onClick={() => navigate('/signup')} // Navigate to Sign Up page
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>

       {/* Hero Section */}
       <div
        className="relative h-150 bg-cover bg-center transition-all 500 ease-linear hover:scale-110"
        style={{
          backgroundImage: `url('${heroImages[currentImageIndex]}')`, // Use the state for currentImageIndex
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent">
          <div className="max-w-7xl mx-auto h-full flex items-center">
            <div className="max-w-2xl px-4">
              <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Seamless Travel Across<br />
              the City
              </h1>
              <p className="text-xl text-gray-700 mb-8">
              Fast, Safe and Affordable - Your Trusted Public Transport System 
              Connecting Communities And Making Every Journey Easier.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                  Get Start
                </button>
                <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 font-semibold fas fa-play-circle">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features-section" className="py-16 bg-[#f3fffd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Eco-Friendly Card */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-xl border-2 border-emerald-300"
              whileHover={{ y: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 8 }}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 5v2m0 0l3-3m-3 3l-3-3M5 19v-2m0 0l-3 3m3-3l3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly Travel</h3>
            </motion.div>

            {/* Cost Savings Card */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-xl border-2 border-emerald-300"
              whileHover={{ y: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 8 }}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost Savings for Citizens</h3>
            </motion.div>

            {/* Bike & Pedestrian Card */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-xl border-2 border-emerald-300"
              whileHover={{ y: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 8 }}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Electric & Hybrid Buses</h3>
            </motion.div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div id="About-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Images and Stats */}
            <div className="space-y-8">
              {/* Stats Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 relative">
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-gray-700">+100</span>
                  <FaArrowUp className="text-emerald-500 ml-2" />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-4">
                    {userImages.map((img, i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src={img} alt={`User ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>;
              </div>
              {/* Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden">
                  <img src="https://img.freepik.com/free-photo/happy-couple-talking-each-other-while-commuting-by-bus_637285-12180.jpg?t=st=1740588383~exp=1740591983~hmac=34d5a1f2366e258ecfcb5e611b605d0d8c24681c3b2836b80b7546a7f1265f6d&w=1380" alt="People on bus" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img src="https://cdn.pixabay.com/photo/2016/03/17/16/31/bus-1263266_1280.jpg" alt="City bus" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">ABOUT US</h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  MetroConnect is a reliable and efficient public transport system designed to keep your city moving. With a network of buses, trains, and trams, we provide safe, affordable, and timely transportation for thousands of passengers daily.
                </p>
                <p>
                  Our goal is to offer a seamless commuting experience with real-time schedules, easy route navigation, and convenient ticketing options.
                </p>
                <p>
                  Whether you are traveling for work, school, or leisure, MetroConnect is here to connect you to your destination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="feedback-section" className="py-16 bg-[#f3fffd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-8">What Our Customers Are Saying</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentFeedbacks.map((feedback, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-xl border-2 border-emerald-300"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 100, damping: 8 }}
            >
              <h3 className="text-xl font-semibold mb-2">{feedback.name}</h3>
              <p className="text-gray-600 mb-4">{feedback.feedback}</p>
              <div className="flex items-center">
                <span className="text-yellow-500">{'★'.repeat(feedback.rating)}</span>
                <span className="ml-2 text-gray-500">({feedback.rating} stars)</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

            {/* Contact Us Section */}
            <div id="Contact-section" className="min-h-screen bg-white pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          {/* Header */}
          <div className="text-gray-900 mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4 py-6">CONTACT US</h2>
            <p className="text-lg max-w-2xl mx-auto">
              We are here to assist you! If you have any questions or need support, feel free to reach out to us. Whether it is about our services, your recent journey, or general inquiries, we are just a message away. Let us help you make your experience better!
            </p>
          </div>

          {/* Contact Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="rounded-xl overflow-hidden">
              <img 
                src="https://operationshoebox.com/wp-content/uploads/2024/01/DALL%C2%B7E-2024-01-24-e1706117831127-768x554.png" 
                alt="Contact" 
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-green-100 rounded-xl p-12 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">GET IN TOUCH</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name :</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email :</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Write your message :</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Write your message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
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

export default LandingPage;
