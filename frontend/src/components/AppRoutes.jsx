import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useAdmin } from "../context/AdminContext";
import Form from "./Form";
import Menu from "./Menu";
import AdminDashboard from "./admin/AdminDashboard";
import Cart from "./Cart";
import Navbar from "./Navbar";
import ProtectedRoute from "./admin/ProtectedRoute";
import Orders from "./Orders";
import OrderStatus from "./OrderStatus";

function AppRoutes() {
  const location = useLocation();
  const { isAdmin } = useAdmin();
  const isFormPage = location.pathname === '/' || location.pathname === '/home';
  const showNavbar = !isAdmin && !isFormPage;

  // Set document title based on current route
  useEffect(() => {
    const pageTitles = {
      '/': 'Welcome - Resto Cafe',
      '/menu': 'Menu - Resto Cafe',
      '/cart': 'Your Cart - Resto Cafe',
      '/admin-dashboard': 'Admin Dashboard'
    };
    document.title = pageTitles[location.pathname] || 'Resto Cafe';
  }, [location]);

  return (
    <>
      {showNavbar && <Navbar />}
      <main className={`${showNavbar ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          } />
          <Route path="/menu" element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          } />
          {/* Admin Routes */}
          <Route 
            path="/admin-dashboard/*" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Regular User Routes */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/order-status/:orderId" element={
            <ProtectedRoute>
              <OrderStatus />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </>
  );
}

export default AppRoutes;