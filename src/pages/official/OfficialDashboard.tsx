import React from 'react';
import { Calendar, CheckSquare, Award, Activity, Edit2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useOfficial } from '../../contexts/OfficialContext';

const StatCard = ({ icon: Icon, label, value, trend }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  trend: string;
}) => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="rounded-full bg-blue-50 p-3">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <Activity className="mr-2 h-4 w-4 text-green-500" />
      <span className="text-sm text-gray-600">{trend}</span>
    </div>
  </div>
);

const QuickAction = ({ icon: Icon, label, onClick }: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-blue-500 hover:shadow-sm"
  >
    <div className="rounded-full bg-blue-50 p-2">
      <Icon className="h-5 w-5 text-blue-600" />
    </div>
    <span className="font-medium text-gray-700">{label}</span>
  </button>
);

const OfficialDashboard = () => {
  const { currentOfficial } = useOfficial();

  const stats = [
    {
      icon: Calendar,
      label: 'Upcoming Assignments',
      value: '3',
      trend: 'Next 7 days',
    },
    {
      icon: CheckSquare,
      label: 'Completed Matches',
      value: currentOfficial.completedMatches,
      trend: 'This season',
    },
    {
      icon: Award,
      label: 'Rating',
      value: currentOfficial.rating,
      trend: 'Based on last 10 matches',
    },
  ];

  const quickActions = [
    {
      icon: Edit2,
      label: 'Enter Match Score',
      onClick: () => {
        // Navigate to results page or open score modal
      },
    },
    {
      icon: CheckCircle,
      label: 'Accept/Decline Assignment',
      onClick: () => {
        // Navigate to assignments page
      },
    },
    {
      icon: Clock,
      label: 'Update Availability',
      onClick: () => {
        // Open availability modal
      },
    },
    {
      icon: AlertCircle,
      label: 'Report Incident',
      onClick: () => {
        // Open incident report modal
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm">
          <option>2024 Season</option>
          <option>2023 Season</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <QuickAction
              key={action.label}
              icon={action.icon}
              label={action.label}
              onClick={action.onClick}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Next Assignments
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      Thunder vs KPA
                    </p>
                    <p className="text-gray-500">Tomorrow, {15 + i}:00</p>
                  </div>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  Referee
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Recent Matches
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      Equity vs Ulinzi
                    </p>
                    <p className="text-gray-500">Yesterday</p>
                  </div>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialDashboard;