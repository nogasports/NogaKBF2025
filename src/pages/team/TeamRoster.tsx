import React, { useState } from 'react';
import { useTeam } from '../../contexts/TeamContext';
import PlayerList from '../../components/teams/PlayerList';
import StaffList from '../../components/teams/StaffList';
import { ArrowLeftRight } from 'lucide-react';
import { Player } from '../../types/team';

const TeamRoster = () => {
  const { selectedTeam } = useTeam();
  const [activeTab, setActiveTab] = useState<'players' | 'staff'>('players');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleTransferRequest = (player: Player) => {
    setSelectedPlayer(player);
    setShowTransferModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedTeam?.name} Roster
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowTransferModal(true)}
            className="flex items-center gap-2 rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50"
          >
            <ArrowLeftRight size={20} />
            Transfer Request
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            {activeTab === 'players' ? 'Add Player' : 'Add Staff Member'}
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('players')}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'players'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Players
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'staff'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Staff
          </button>
        </nav>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        {activeTab === 'players' ? (
          <PlayerList
            players={selectedTeam?.players || []}
            onEditPlayer={() => {}}
            onTransferRequest={handleTransferRequest}
          />
        ) : (
          <StaffList
            staff={selectedTeam?.staff || []}
            onEditStaff={() => {}}
          />
        )}
      </div>

      {/* Transfer Request Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Transfer Request
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Player
                </label>
                <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                  {selectedTeam?.players.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.name} - #{player.jerseyNumber}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Destination Team
                </label>
                <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                  <option value="1">KPA</option>
                  <option value="2">Thunder</option>
                  <option value="3">Equity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Transfer Type
                </label>
                <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                  <option value="permanent">Permanent Transfer</option>
                  <option value="loan">Loan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reason for Transfer
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Enter reason for transfer request..."
                />
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowTransferModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle transfer request submission
                    setShowTransferModal(false);
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamRoster;