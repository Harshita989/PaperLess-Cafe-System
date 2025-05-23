import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminContext = createContext();

// In a real app, you should use environment variables for these
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'cafe123' // In production, use proper authentication with hashed passwords
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // Check if admin is logged in from localStorage on initial load
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('adminAuth');
      if (storedAuth) {
        const { isAuthenticated, expiresAt } = JSON.parse(storedAuth);
        if (isAuthenticated && new Date().getTime() < expiresAt) {
          setIsAdmin(true);
        } else {
          // Clear invalid/expired auth
          localStorage.removeItem('adminAuth');
          setIsAdmin(false);
        }
      }
    };

    checkAuth();
  }, []);

  // Handle keyboard shortcut (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setShowLoginModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const login = useCallback((username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Clear any existing user data
      localStorage.removeItem('cafeUserData');
      localStorage.removeItem('cafeUserId');
      
      // Set expiration for 24 hours
      const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000;
      const authData = { isAuthenticated: true, expiresAt };
      localStorage.setItem('adminAuth', JSON.stringify(authData));
      setIsAdmin(true);
      setShowLoginModal(false);
      setLoginError('');
      navigate('/admin-dashboard');
      return true;
    }
    setLoginError('Invalid credentials');
    return false;
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('adminAuth');
    setIsAdmin(false);
    navigate('/');
  }, [navigate]);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        showLoginModal,
        setShowLoginModal,
        loginError,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};