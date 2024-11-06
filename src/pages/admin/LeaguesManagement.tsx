import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Season, League, Division } from '../../types/league';
import AddSeasonModal from '../../components/admin/AddSeasonModal';

// ... (keep existing mock data)

const LeaguesManagement = () => {
  const [seasons] = useState<Season[]>([mockSeason]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [showAddSeasonModal, setShowAddSeasonModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Leagues Management</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50">
            <Plus size={20} />
            New League
          </button>
          <button 
            onClick={() => setShowAddSeasonModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus size={20} />
            New Season
          </button>
        </div>
      </div>

      {/* ... (keep existing JSX) */}

      <AddSeasonModal 
        isOpen={showAddSeasonModal}
        onClose={() => setShowAddSeasonModal(false)}
      />
    </div>
  );
};

export default LeaguesManagement;