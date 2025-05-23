
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './components/AppRoutes';
import AdminLoginModal from './components/admin/AdminLoginModal';

function App() {
  // Prevent horizontal scroll on mobile
  useEffect(() => {
    const handleResize = () => {
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <AdminProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col w-full bg-white">
          <header className="w-full fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </header>

          <main className="flex-grow w-full pt-16 md:pt-20">
            <div className="w-full h-full">
              <AppRoutes />
            </div>
          </main>
          
          <footer className="w-full">
            <Footer />
          </footer>
          
          <AdminLoginModal />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
              error: {
                duration: 5000,
              },
            }}
          />
        </div>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;
