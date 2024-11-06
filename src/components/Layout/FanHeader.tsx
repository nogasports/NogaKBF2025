import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useFan } from '../../contexts/FanContext';
import { useNavigate } from 'react-router-dom';

const FanHeader = () => {
  const { currentFan } = useFan();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any cleanup logic here
    navigate('/');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-gray-800">
          KBF Fan Portal
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            {currentFan.name}
          </span>
          <button className="rounded-full bg-gray-100 p-2">
            <User size={20} className="text-gray-600" />
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default FanHeader;