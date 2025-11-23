import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { userService } from '../services/api';
import { User } from '../types';
import AddUserModal from './AddUserModal';

const ReferralsTab: React.FC = () => {
  const [referrals, setReferrals] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      const referralsData = await userService.getReferrals();
      setReferrals(referralsData);
      setError(null);
    } catch (err) {
      setError('Failed to fetch referrals');
      console.error('Error fetching referrals:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (mobile: string) => {
    try {
      await userService.verifyUser(mobile);
      fetchReferrals(); // Refresh the list
    } catch (err) {
      console.error('Error verifying user:', err);
    }
  };

  const handleUserAdded = () => {
    fetchReferrals(); // Refresh the list when a new user is added
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading referrals...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button
          onClick={fetchReferrals}
          className="btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">New Referrals</h2>
        <div className="flex gap-3">
          <button
            onClick={fetchReferrals}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', color: '#6b7280', borderRadius: '0.5rem', cursor: 'pointer' }}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5" />
            Add User
          </button>
        </div>
      </div>
      
      {referrals.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <div className="mb-4">
            <Plus className="w-12 h-12 mx-auto text-gray-300" />
          </div>
          <div className="text-lg font-medium mb-2">No referrals found</div>
          <div className="text-sm mb-4">Start by adding your first referral user</div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4" />
            Add First User
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {referrals.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.verified 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {!user.verified && (
                      <button
                        onClick={() => handleVerifyUser(user.mobile)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
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

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUserAdded}
      />
    </div>
  );
};

export default ReferralsTab;
