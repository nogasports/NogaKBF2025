import React from 'react';
import { Outlet } from 'react-router-dom';
import OfficialSidebar from './OfficialSidebar';
import OfficialHeader from './OfficialHeader';
import { useOfficial } from '../../contexts/OfficialContext';

const OfficialLayout = () => {
  const { currentOfficial } = useOfficial();

  if (!currentOfficial) {
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
      <OfficialSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <OfficialHeader />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OfficialLayout;