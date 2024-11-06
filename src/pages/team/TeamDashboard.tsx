import React, { useState } from 'react';
import { useTeam } from '../../contexts/TeamContext';
import {
  Users,
  Calendar,
  Award,
  Activity,
  TrendingUp,
  CreditCard,
} from 'lucide-react';
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
      <div className="rounded-full bg-orange-50 p-3">
        <Icon className="h-6 w-6 text-orange-600" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
      <span className="text-sm text-gray-600">{trend}</span>
    </div>
  </div>
);

const TeamDashboard = () => {
  const { selectedTeam } = useTeam();
  const [showVirtualCard, setShowVirtualCard] = useState(false);

  const stats = [
    {
      icon: Users,
      label: 'Active Players',
      value: '15',
      trend: '2 injured players',
    },
    {
      icon: Calendar,
      label: 'Next Match',
      value: '2 days',
      trend: 'vs Thunder Basketball',
    },
    {
      icon: Award,
      label: 'League Position',
      value: '2nd',
      trend: 'Won last 3 games',
    },
    {
      icon: Activity,
      label: 'Team Rating',
      value: '85.2',
      trend: '+2.3 vs last season',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">{selectedTeam?.name}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowVirtualCard(true)}
            className="flex items-center gap-2 rounded-lg border border-orange-600 px-4 py-2 text-orange-600 hover:bg-orange-50"
          >
            <CreditCard size={20} />
            Team ID Card
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
                      vs Thunder Basketball
                    </p>
                    <p className="text-gray-500">Yesterday, 7:00 PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">78 - 72</p>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    Won
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Team Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium text-gray-900">Points Per Game</p>
                <p className="text-sm text-gray-500">Last 5 games</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">82.5</p>
                <span className="text-sm text-green-600">+3.2</span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium text-gray-900">Field Goal %</p>
                <p className="text-sm text-gray-500">Season average</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">45.3%</p>
                <span className="text-sm text-green-600">+1.8%</span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium text-gray-900">Rebounds</p>
                <p className="text-sm text-gray-500">Per game</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">38.2</p>
                <span className="text-sm text-red-600">-0.5</span>
              </div>
            </div>
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
            <VirtualPlayerCard player={selectedTeam} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDashboard;