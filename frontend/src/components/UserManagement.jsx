import {  } from 'react';
import PropTypes from 'prop-types';
import { Trash2 } from 'lucide-react';

const UserManagement = ({ users, fetchUsers }) => {

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:9000/api/user/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete user');
        }
        
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(`Failed to delete user: ${error.message}`);
      }
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  aria-label="Delete user"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="mt-3 text-sm space-y-1 text-gray-600">
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Phone:</span> {user.phone}</p>
              <p><span className="font-medium">Role:</span> {user.role || 'User'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

UserManagement.propTypes = {
  users: PropTypes.array.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

export default UserManagement;
