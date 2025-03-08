// src/services/mockApi.js
import { delay } from '@/utils/Helpers';

// Mock data
const users = [
  { id: 1, name: 'User Test', email: 'user@example.com', role: 'user' },
  { id: 2, name: 'Admin Test', email: 'admin@example.com', role: 'admin' },
];

const mockApi = {
  // Auth endpoints
  login: async (email, password) => {
    await delay(1000); // Simulate network delay
    
    const user = users.find(u => u.email === email);
    if (!user || password !== 'password123') {
      throw {
        response: {
          status: 401,
          data: { message: 'Invalid email or password' }
        }
      };
    }
    
    return {
      access_token: 'mock_access_token_' + Date.now(),
      refresh_token: 'mock_refresh_token_' + Date.now(),
      user: { ...user, password: undefined }
    };
  },
  
  // Add more mock endpoints as needed
};

export default mockApi;