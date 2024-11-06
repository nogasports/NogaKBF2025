import React, { useState } from 'react';
import { Calendar, Award, Activity, Users, TrendingUp, CreditCard } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';
import VirtualPlayerCard from '../../components/player/VirtualPlayerCard';

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
      <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
      <span className="text-sm text-gray-600">{trend}</span>
    </div>
  </div>
);

const PlayerDashboard = () => {
  const { currentPlayer } = usePlayer();
  const [showVirtualCard, setShowVirtualCard] = useState(false);

  const stats = [
    {
      icon: Activity,
      label: 'Games Played',
      value: '28',
      trend: '+3 this month',
    },
    {
      icon: Award,
      label: 'Points Average',
      value: '18.5',
      trend: '+2.3 vs last season',
    },
    {
      icon: Users,
      label: 'Team Ranking',
      value: '2nd',
      trend: 'Premier Division',
    },
    {
      icon: Calendar,
      label: 'Next Game',
      value: '2 days',
      trend: 'vs Thunder',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Player Dashboard</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowVirtualCard(true)}
            className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
          >
            <CreditCard size={20} />
            View ID Card
          </button>
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm">
            <option>2024 Season</option>
            <option>2023 Season</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Recent Games
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
                      vs Team {i}
                    </p>
                    <p className="text-gray-500">
                      {i} day{i !== 1 ? 's' : ''} ago
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">18 pts, 5 reb</p>
                  <p className="text-sm text-green-600">Won by 12</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Upcoming Games
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
                      vs Team {i}
                    </p>
                    <p className="text-gray-500">
                      In {i} day{i !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  {i === 1 ? 'Next Game' : 'Upcoming'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showVirtualCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative">
            <button
              onClick={() => setShowVirtualCard(false)}
              className="absolute -right-4 -top-4 rounded-full bg-white p-2 text-gray-500 shadow-lg hover:text-gray-700"
            >
              ×
            </button>
            <VirtualPlayerCard player={currentPlayer} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDashboard;