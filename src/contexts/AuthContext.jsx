// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, getUser, removeToken, setAuthData } from '@/utils/token';
import authService from '@/services/auth.service';

// Buat Auth Context
const AuthContext = createContext(null);

export { AuthContext };

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cek token dan user yang tersimpan saat aplikasi dimuat
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = getToken();
        if (storedToken) {
          // Dapatkan data user dari localStorage
          const userData = getUser();
          if (userData) {
            setUser(userData);
          } else {
            // Jika token ada tapi user tidak ada, fetch profile
            try {
              const result = await authService.getProfile();
              if (result.success) {
                setUser(result.data);
              } else {
                logout(); // Logout jika gagal fetch profile
              }
            } catch (error) {
              console.error('Failed to fetch user profile:', error);
              logout(); // Logout jika gagal fetch profile
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function
// src/contexts/AuthContext.jsx - Update login function
const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('AuthContext: Attempting login with:', { email });
      const result = await authService.login(email, password);
      console.log('AuthContext: Login result:', result);
      
      if (result.success) {
        console.log('AuthContext: Login successful, setting user data');
        // Pastikan data user diset dengan benar
        const userData = result.data.user || result.data;
        setUser(userData);
        return { success: true, user: userData };
      } else {
        console.error('AuthContext: Login failed:', result.error);
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      const errorMsg = 'Login gagal. Silakan coba lagi.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.register(userData);
      
      if (result.success) {
        setUser(result.data.user);
        return { success: true, user: result.data.user };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMsg = 'Registrasi gagal. Silakan coba lagi.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
// src/contexts/AuthContext.jsx - Perbaiki fungsi logout
const logout = async () => {
    setLoading(true);
    
    try {
      console.log('AuthContext: Attempting to logout');
      // Jika perlu, panggil endpoint logout
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await api.post('/auth/logout', { refresh_token: refreshToken });
      }
    } catch (error) {
      console.error('AuthContext: Logout error:', error);
    } finally {
      console.log('AuthContext: Clearing auth data');
      // Hapus data auth dari localStorage
      removeToken();
      // Reset state
      setUser(null);
      setLoading(false);
      
      // Redirect ke halaman login setelah logout
      window.location.href = '/login';
    }
  };

  // Check if user has specific role
  const hasRole = (roles) => {
    if (!user) return false;
    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }
    return user.role === roles;
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!getToken(), // Pastikan user dan token ada
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};