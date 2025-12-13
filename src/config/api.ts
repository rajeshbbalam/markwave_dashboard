export const API_CONFIG = {
  getBaseUrl: () => {
    // Force production URL - Updated at 12:12 PM
    const productionUrl = 'https://markwave-live-services-couipk45fa-el.a.run.app';

    // Determine if running on localhost
    const isLocalhost = window.location.hostname === 'localhost' ||
                        window.location.hostname === '127.0.0.1';

    const baseUrl = isLocalhost ? 'http://localhost:8000' : productionUrl;
    
    // Debug logging
    console.log('🔗 API Base URL:', baseUrl);
    console.log('🌐 Current hostname:', window.location.hostname);
    
    return baseUrl;
  }
};

export const API_ENDPOINTS = {
  getUsers: () => `${API_CONFIG.getBaseUrl()}/users/customers`,
  getReferrals: () => `${API_CONFIG.getBaseUrl()}/users/referrals`,
  createUser: () => `${API_CONFIG.getBaseUrl()}/users/`,
  getUserDetails: (mobile: string) => `${API_CONFIG.getBaseUrl()}/users/${mobile}`,
  verifyUser: () => `${API_CONFIG.getBaseUrl()}/users/verify`,
  updateUser: (mobile: string) => `${API_CONFIG.getBaseUrl()}/users/${mobile}`,
  getProducts: () => `${API_CONFIG.getBaseUrl()}/products`,
  health: () => `${API_CONFIG.getBaseUrl()}/health`,
  getPendingUnits: () => `${API_CONFIG.getBaseUrl()}/purchases/admin/units/pending`,
};
