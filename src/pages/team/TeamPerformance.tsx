import React from 'react';
import { TrendingUp, Award, Target, BarChart3 } from 'lucide-react';
import { useTeam } from '../../contexts/TeamContext';

const TeamPerformance = () => {
  const { selectedTeam } = useTeam();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedTeam?.name} Performance
        </h2>
        <div className="flex gap-2">
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option>Last 5 Games</option>
            <option>Last 10 Games</option>
            <option>This Season</option>
          </select>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Download Report
          </button>
        </div>
      </div>

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default TeamPerformance;