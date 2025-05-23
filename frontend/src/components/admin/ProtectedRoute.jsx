import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useAdmin } from '../../context/AdminContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const location = useLocation();
  const { isAdmin } = useAdmin();
  const userData = JSON.parse(localStorage.getItem('cafeUserData') || 'null');
  const isAuthPage = location.pathname === '/' || location.pathname === '/home';
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    // If user is on auth page but already logged in
    if (isAuthPage && userData) {
      toast.success(`You're already in, ${userData.name}! 😊`, {
        duration: 3000,
        style: {
          borderLeft: '4px solid #10B981',
          background: '#ECFDF5',
          color: '#065F46',
        },
      });
    } 
    // If user is not on auth page and not logged in
    else if (!isAuthPage && !userData && !isAdmin) {
      toast.error('Please fill in your details first 🙏', {
        duration: 3000,
        style: {
          borderLeft: '4px solid #DC2626',
          background: '#FEF2F2',
          color: '#B91C1C',
        },
      });
    }
  }, [isAuthPage, userData, isAdmin, isAdminRoute]);

  // Handle admin routes
  if (isAdminRoute) {
    if (!isAdmin) {
      // If not admin, redirect to home
      return <Navigate to="/" replace />;
    }
    return children;
  }

  // If user is logged in and tries to access auth pages, redirect to menu
  if (isAuthPage && userData) {
    return <Navigate to="/menu" replace />;
  }

  // If user is not logged in and tries to access protected pages, redirect to login
  if (!isAuthPage && !userData) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;