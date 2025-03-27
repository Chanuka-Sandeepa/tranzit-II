import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileUser = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profile, setProfile] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    createdAt: '',
    avatar: 'https://public.readdy.ai/ai/img_res/773d0e9a23eb592fe9a90963e8f76f31.jpg'
  });
  const [editForm, setEditForm] = useState(profile);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId')
        if (!token) {
          navigate('/login');
          return;
        }
        // Assuming the user ID is in the token (you may adjust this depending on your backend)
        const response = await axios.get(`http://localhost:9000/api/user/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Assume the API response contains user info with created_at field
        setProfile({
          ...response.data,
          createdAt: new Date(response.data.created_at).toLocaleDateString()
        });
        setEditForm({
          ...response.data,
          createdAt: new Date(response.data.created_at).toLocaleDateString()
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrorMessage('Failed to fetch profile data');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:9000/api/user/${profile._id}`,  // Corrected the API URL to include profile ID
        {
          name: editForm.name,
          phone: editForm.phone
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProfile({
        ...response.data,
        createdAt: new Date(response.data.created_at).toLocaleDateString()
      });
      setShowEditModal(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:9000/api/user/${profile._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setShowDeleteModal(false);
      setSuccessMessage('Account deleted successfully!');
      setTimeout(() => {
        localStorage.removeItem('token');
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrorMessage('Failed to delete account');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <h1 className="text-2xl font-bold text-white">Profile Management</h1>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
              {successMessage}
            </div>
          )}

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex items-start space-x-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                />
              </div>

              {/* Profile Details */}
              <div className="flex-grow">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="mt-1 text-lg text-gray-900">{profile.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                    <p className="mt-1 text-lg text-gray-900">{profile.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                    <p className="mt-1 text-lg text-gray-900">{profile.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Registration Date</h3>
                    <p className="mt-1 text-lg text-gray-900">{formatDate(profile.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md cursor-pointer whitespace-nowrap"
              >
                <i className="fas fa-edit mr-2"></i>
                Update Profile
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md cursor-pointer whitespace-nowrap"
              >
                <i className="fas fa-trash-alt mr-2"></i>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md cursor-pointer whitespace-nowrap"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-red-600 mb-4">Delete Account</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md cursor-pointer whitespace-nowrap"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUser;
