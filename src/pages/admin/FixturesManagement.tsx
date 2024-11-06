import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, List } from 'lucide-react';
import { Fixture } from '../../types/fixture';
import FixtureCard from '../../components/fixtures/FixtureCard';
import FixtureDetails from '../../components/fixtures/FixtureDetails';

// Mock data for demonstration
const mockFixtures: Fixture[] = [
  {
    id: '1',
    homeTeam: {
      id: '1',
      name: 'Ulinzi Warriors',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      score: 78,
    },
    awayTeam: {
      id: '2',
      name: 'Thunder',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      score: 72,
    },
    date: '2024-03-20',
    time: '19:00',
    venue: 'Nyayo Stadium',
    status: 'completed',
    division: 'Premier',
    officials: {
      referee: 'John Smith',
      umpire1: 'Jane Doe',
      umpire2: 'Mike Johnson',
      scorer: 'Sarah Wilson',
    },
    attendance: 1200,
  },
  // Add more mock fixtures as needed
];

const FixturesManagement = () => {
  const [fixtures] = useState<Fixture[]>(mockFixtures);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Fixtures Management</h2>
        <div className="flex items-center gap-4">
          <div className="flex rounded-lg border border-gray-300">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 ${
                viewMode === 'list'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List size={20} />
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-4 py-2 ${
                viewMode === 'calendar'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CalendarIcon size={20} />
              Calendar
            </button>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            <Plus size={20} />
            Add Fixture
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
          <option>All Divisions</option>
          <option>Premier</option>
          <option>Division One</option>
        </select>
        <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
          <option>All Status</option>
          <option>Scheduled</option>
          <option>Live</option>
          <option>Completed</option>
        </select>
        <input
          type="date"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2"
        />
      </div>

      {selectedFixture ? (
        <FixtureDetails
          fixture={selectedFixture}
          onClose={() => setSelectedFixture(null)}
          onEdit={() => {}}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fixtures.map((fixture) => (
            <FixtureCard
              key={fixture.id}
              fixture={fixture}
              onClick={setSelectedFixture}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FixturesManagement;