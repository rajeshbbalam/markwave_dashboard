import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import { User } from '../types';

const UsersTab: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getUsers();
      setUsers(usersData);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (mobile: string) => {
    try {
      await userService.verifyUser(mobile);
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error('Error verifying user:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span>Loading customers...</span>
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Existing Customers</h2>
      {users.length === 0 ? (
        <div className="empty-state">
          No existing customers found
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>
                    <span className={`status-badge ${user.verified ? 'status-verified' : 'status-pending'}`}>
                      {user.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    {!user.verified && (
                      <button
                        onClick={() => handleVerifyUser(user.mobile)}
                        style={{ color: '#2563eb', fontWeight: '500', cursor: 'pointer' }}
                      >
                        Verify
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersTab;
