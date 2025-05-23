import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { FiPackage, FiMenu, FiLogOut, FiHome, FiDollarSign, FiUsers } from 'react-icons/fi';
import MenuManagement from './MenuManagement';
import OrderManagement from './OrderManagement';
import DashboardOverview from './DashboardOverview';

const AdminDashboard = () => {
  const { logout } = useAdmin();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return <MenuManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'dashboard':
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Cafe Admin</h1>
        </div>
        
        <nav className="mt-6">
          <NavItem 
            icon={<FiHome />} 
            text="Dashboard" 
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem 
            icon={<FiMenu />} 
            text="Menu Management" 
            active={activeTab === 'menu'}
            onClick={() => setActiveTab('menu')}
          />
          <NavItem 
            icon={<FiPackage />} 
            text="Orders" 
            active={activeTab === 'orders'}
            onClick={() => setActiveTab('orders')}
          />
          <div className="absolute bottom-0 w-64 p-4">
            <button
              onClick={logout}
              className="w-full flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md group"
            >
              <FiLogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'menu' && 'Menu Management'}
              {activeTab === 'orders' && 'Order Management'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin</span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-6 py-3 text-sm font-medium ${
      active 
        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' 
        : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{text}</span>
  </button>
);

export default AdminDashboard;
