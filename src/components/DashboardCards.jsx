import React from 'react';
import { CheckCircle2, Users, TrendingUp, ArrowUpRight } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, subtitle, trend, bgColor }) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${bgColor}`}>
            <Icon size={24} className="text-gray-700" />
          </div>
          <h3 className="text-gray-600 font-medium">{title}</h3>
        </div>
        {trend && (
          <button className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
            <ArrowUpRight size={16} className="text-white" />
          </button>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold text-gray-800">{value}</span>
        {subtitle && <span className="text-gray-500 mb-1">{subtitle}</span>}
      </div>
    </div>
  );
};

const TopEmployeeCard = () => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gray-100">
          <Users size={24} className="text-gray-700" />
        </div>
        <h3 className="text-gray-600 font-medium">Top Employee</h3>
      </div>
      <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-3">
        <img
          src="https://ui-avatars.com/api/?name=Zidan+Ferdiansyah&background=3B82F6&color=fff"
          alt="Zidan Ferdiansyah"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-blue-600 font-semibold">Zidan Ferdiansyah</span>
      </div>
    </div>
  );
};

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <StatCard
        icon={CheckCircle2}
        title="Device Active"
        value="5"
        trend={true}
        bgColor="bg-gray-100"
      />
      <StatCard
        icon={Users}
        title="Today Attendance"
        value="156"
        subtitle="/200"
        trend={true}
        bgColor="bg-gray-100"
      />
      <TopEmployeeCard />
    </div>
  );
};

export default DashboardCards;
