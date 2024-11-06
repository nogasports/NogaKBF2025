import React from 'react';
import { User, Shield, Bell } from 'lucide-react';
import { useTeam } from '../../contexts/TeamContext';

const TeamSettings = () => {
  const { selectedTeam } = useTeam();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        {selectedTeam?.name} Settings
      </h2>

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default TeamSettings;