import React from 'react';
import { Outlet } from 'react-router-dom';
import PlayerSidebar from './PlayerSidebar';
import PlayerHeader from './PlayerHeader';
import { usePlayer } from '../../contexts/PlayerContext';

const PlayerLayout = () => {
  const { currentPlayer } = usePlayer();

  if (!currentPlayer) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Not Authorized</h2>
          <p className="mt-2 text-gray-600">Please log in to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <PlayerSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PlayerHeader />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PlayerLayout;