import React, { useState } from 'react';
import UsersTab from './components/UsersTab';
import ReferralsTab from './components/ReferralsTab';
import HealthStatus from './components/HealthStatus';
import { Users, UserPlus } from 'lucide-react';
import UserTabs from './components/UserTabs';

function App() {
  const [activeTab, setActiveTab] = useState<'users' | 'referrals'>('users');

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="title">Markwave Dashboard</h1>
            <HealthStatus />
          </div>
        </div>
      </header>

      <UserTabs />

      <main className="container" style={{ padding: '2rem 1rem' }}>
        {activeTab === 'users' ? <UsersTab /> : <ReferralsTab />}
      </main>
    </div>
  );
}

export default App;
