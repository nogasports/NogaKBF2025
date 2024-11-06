import React from 'react';
import { Team } from '../../types/team';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';

interface TeamStatsProps {
  team: Team;
}

const TeamStats: React.FC<TeamStatsProps> = ({ team }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
          <div className="h-64 rounded-lg bg-gray-50 p-4">
            <div className="flex h-full items-center justify-center">
              <BarChart3 className="h-24 w-24 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Form</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <Activity className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">vs KPA</p>
                  <p className="text-sm text-gray-500">Won 78-72</p>
                </div>
              </div>
              <span className="text-green-500">+6</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <Activity className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">vs Equity</p>
                  <p className="text-sm text-gray-500">Won 85-80</p>
                </div>
              </div>
              <span className="text-green-500">+5</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <Activity className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">vs Thunder</p>
                  <p className="text-sm text-gray-500">Lost 82-88</p>
                </div>
              </div>
              <span className="text-red-500">-6</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Team Statistics</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Points Per Game</p>
            <p className="mt-2 text-2xl font-semibold">82.5</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Rebounds Per Game</p>
            <p className="mt-2 text-2xl font-semibold">38.2</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Assists Per Game</p>
            <p className="mt-2 text-2xl font-semibold">21.8</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-gray-500">Field Goal %</p>
            <p className="mt-2 text-2xl font-semibold">45.3%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;