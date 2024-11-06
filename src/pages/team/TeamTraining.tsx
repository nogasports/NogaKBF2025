import React from 'react';
import { Calendar, Clock, Users, Target } from 'lucide-react';
import { useTeam } from '../../contexts/TeamContext';

const TeamTraining = () => {
  const { selectedTeam } = useTeam();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedTeam?.name} Training
        </h2>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Schedule Session
        </button>
      </div>

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default TeamTraining;