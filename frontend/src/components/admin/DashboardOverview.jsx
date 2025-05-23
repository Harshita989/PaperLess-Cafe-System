import { FiDollarSign, FiPackage, FiUsers, FiClock } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/orders/stats');
        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          icon={<FiPackage className="h-6 w-6 text-blue-500" />}
          title="Total Orders"
          value={stats.totalOrders}
          change="+12% from last month"
          color="blue"
        />
        <StatCard 
          icon={<FiDollarSign className="h-6 w-6 text-green-500" />}
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          change="+8% from last month"
          color="green"
        />
        <StatCard 
          icon={<FiClock className="h-6 w-6 text-yellow-500" />}
          title="Pending Orders"
          value={stats.pendingOrders}
          change="+3 from yesterday"
          color="yellow"
        />
        <StatCard 
          icon={<FiUsers className="h-6 w-6 text-purple-500" />}
          title="Total Customers"
          value={stats.totalCustomers}
          change="+5 this week"
          color="purple"
        />
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <p className="text-gray-500 text-center">Recent orders and activities will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, change, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    purple: 'bg-purple-50 text-purple-700',
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${colorClasses[color]}`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {change}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
