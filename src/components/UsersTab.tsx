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

  // Render nothing if no users
  if (users.length === 0) {
    return null;
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user, index) => (
          <li key={index} style={{ marginBottom: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '1.25rem' }}>
            <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{user.name}</div>
            <div style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Mobile: {user.mobile}</div>
            <div style={{ color: user.verified ? '#16a34a' : '#92400e', fontWeight: 500, marginBottom: '0.5rem' }}>
              Status: {user.verified ? 'Verified' : 'Pending'}
            </div>
            {!user.verified && (
              <button
                onClick={() => handleVerifyUser(user.mobile)}
                style={{ color: '#2563eb', fontWeight: '500', cursor: 'pointer', background: 'none', border: '1px solid #2563eb', borderRadius: '4px', padding: '0.5rem 1rem' }}
              >
                Verify
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersTab;
