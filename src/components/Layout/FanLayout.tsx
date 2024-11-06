import React from 'react';
import { Outlet } from 'react-router-dom';
import FanSidebar from './FanSidebar';
import FanHeader from './FanHeader';
import { useFan } from '../../contexts/FanContext';

const FanLayout = () => {
  const { currentFan } = useFan();

  if (!currentFan) {
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
      <FanSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <FanHeader />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FanLayout;