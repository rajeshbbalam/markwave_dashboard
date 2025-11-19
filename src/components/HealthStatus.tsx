import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';

const HealthStatus: React.FC = () => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await userService.checkHealth();
        setIsHealthy(response);
      } catch (error) {
        setIsHealthy(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="health-status">
        <div className="spinner"></div>
        <span className="health-status-text">Checking...</span>
      </div>
    );
  }

  return (
    <div className="health-status">
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isHealthy ? '#16a34a' : '#dc2626',
        }}
      ></div>
      <span className={`health-status-text ${isHealthy ? 'health-online' : 'health-offline'}`}>
        API {isHealthy ? 'Connected' : 'Offline'}
      </span>
    </div>
  );
};

export default HealthStatus;
