export const API_CONFIG = {
  getBaseUrl: () => {
    // Check if we're running in production/Cloud Run vs local development
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:8000';
    } else {
      return 'https://markwave-admin-dasboard-couipk45fa-ew.a.run.app';
    }
  }
};

export const API_ENDPOINTS = {
  getUsers: () => `${API_CONFIG.getBaseUrl()}/Users/customers`,
  getReferrals: () => `${API_CONFIG.getBaseUrl()}/Users/referrals`,
  createUser: () => `${API_CONFIG.getBaseUrl()}/Users/`,
  getUserDetails: (mobile: string) => `${API_CONFIG.getBaseUrl()}/Users/${mobile}`,
  verifyUser: () => `${API_CONFIG.getBaseUrl()}/users/verify`,
  updateUser: (mobile: string) => `${API_CONFIG.getBaseUrl()}/Users/${mobile}`,
  health: () => `${API_CONFIG.getBaseUrl()}/health`
};
