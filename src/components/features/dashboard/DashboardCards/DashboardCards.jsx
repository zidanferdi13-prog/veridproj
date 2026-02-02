import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Users, TrendingUp, ArrowUpRight } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, subtitle, trend, bgColor, onTrendClick }) => {
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4 gap-2">
        <div className="flex items-center gap-2 md:gap-3">
          <div className={`p-2 rounded-lg ${bgColor}`}>
            <Icon size={20} className="text-gray-700 md:w-6 md:h-6" />
          </div>
          <h3 className="text-xs md:text-sm text-gray-600 font-medium">{title}</h3>
        </div>
        {trend && (
          <button 
            onClick={onTrendClick}
            className="p-1.5 md:p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors flex-shrink-0"
          >
            <ArrowUpRight size={14} className="text-white md:w-4 md:h-4" />
          </button>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl md:text-4xl font-bold text-gray-800">{value}</span>
        {subtitle && <span className="text-xs md:text-sm text-gray-500 mb-1">{subtitle}</span>}
      </div>
    </div>
  );
};

const TopEmployeeCard = () => {
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 md:gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gray-100">
          <Users size={20} className="text-gray-700 md:w-6 md:h-6" />
        </div>
        <h3 className="text-xs md:text-sm text-gray-600 font-medium">Top Employee</h3>
      </div>
      <div className="flex items-center gap-2 md:gap-3 bg-blue-50 rounded-lg p-2 md:p-3">
        <img
          src="https://ui-avatars.com/api/?name=Zidan+Ferdiansyah&background=3B82F6&color=fff"
          alt="Zidan Ferdiansyah"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0"
        />
        <span className="text-xs md:text-base text-blue-600 font-semibold truncate">Zidan Ferdiansyah</span>
      </div>
    </div>
  );
};

const DashboardCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
      <StatCard
        icon={CheckCircle2}
        title="Device Active"
        value="5"
        trend={true}
        bgColor="bg-gray-100"
        onTrendClick={() => navigate('/device')}
      />
      <StatCard
        icon={Users}
        title="Today Attendance"
        value="156"
        subtitle="/200"
        trend={true}
        bgColor="bg-gray-100"
        onTrendClick={() => navigate('/attendance')}
      />
      <TopEmployeeCard />
    </div>
  );
};

export default DashboardCards;
