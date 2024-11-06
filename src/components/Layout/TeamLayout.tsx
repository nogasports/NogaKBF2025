import React from 'react';
import { Outlet } from 'react-router-dom';
import TeamSidebar from './TeamSidebar';
import Header from './Header';
import { useTeam } from '../../contexts/TeamContext';

const TeamLayout = () => {
  const { selectedTeam } = useTeam();

  if (!selectedTeam) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">No Team Selected</h2>
          <p className="mt-2 text-gray-600">Please select a team to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <TeamSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeamLayout;