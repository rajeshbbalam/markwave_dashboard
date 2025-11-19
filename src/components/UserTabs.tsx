import React, { useState, useEffect } from 'react';
import './UserTabs.css';
import axios from 'axios';

const UserTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nonVerified' | 'existing'>('nonVerified');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    referral_type: '',
  });
  const [referralUsers, setReferralUsers] = useState([]);
  const [existingCustomers, setExistingCustomers] = useState([]);

  useEffect(() => {
    const fetchReferralUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/referrals');
        setReferralUsers(response.data);
      } catch (error) {
        setReferralUsers([]); // Clear users on error
      }
    };

    const fetchExistingCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users/customers');
        setExistingCustomers(response.data);
      } catch (error) {
        setExistingCustomers([]); // Clear users on error
      }
    };

    if (activeTab === 'nonVerified') {
      fetchReferralUsers();
    } else {
      fetchExistingCustomers();
    }
  }, [activeTab]);

  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/', {
        ...formData,
        verified: false,
      });
      console.log('User created:', response.data);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === 'nonVerified' ? 'active' : ''}
          onClick={() => setActiveTab('nonVerified')}
        >
          Referral Users
        </button>
        <button
          className={activeTab === 'existing' ? 'active' : ''}
          onClick={() => setActiveTab('existing')}
        >
          Existing Customers
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'nonVerified' ? (
          <div>
            <h2>Referral Users</h2>
            <div className="table-container">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {referralUsers.length === 0 ? (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center', color: '#888' }}>No users found</td>
                    </tr>
                  ) : (
                    referralUsers.map((user: any, index: number) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.mobile}</td>
                        <td>{user.verified ? 'Yes' : 'No'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <button className="floating-create-icon" onClick={handleCreateClick}>+</button>
          </div>
        ) : (
          <div>
            <h2>Existing Customers</h2>
            <div className="table-container">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {existingCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center', color: '#888' }}>No users found</td>
                    </tr>
                  ) : (
                    existingCustomers.map((user: any, index: number) => (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.mobile}</td>
                        <td>{user.verified ? 'Yes' : 'No'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create New User</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Mobile:
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Referral Type:
                <input
                  type="text"
                  name="referral_type"
                  value={formData.referral_type}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCloseModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTabs;