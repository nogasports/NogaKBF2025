import React, { useState } from 'react';
import { User, Bell, Shield, Globe } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';

const PlayerSettings = () => {
  const { currentPlayer } = usePlayer();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'preferences'>('profile');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Save Changes
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'profile'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>Profile</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'notifications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bell size={16} />
              <span>Notifications</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'preferences'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>Preferences</span>
            </div>
          </button>
        </nav>
      </div>

      {activeTab === 'profile' && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                Change Photo
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  defaultValue={currentPlayer.name}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jersey Number</label>
                <input
                  type="text"
                  defaultValue={currentPlayer.jerseyNumber}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  defaultValue={currentPlayer.position}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Height</label>
                <input
                  type="text"
                  defaultValue={currentPlayer.height}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight</label>
                <input
                  type="text"
                  defaultValue={currentPlayer.weight}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nationality</label>
                <input
                  type="text"
                  defaultValue={currentPlayer.nationality}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-700">Match Updates</p>
                  <p className="text-sm text-gray-500">
                    Get notified about upcoming matches and results
                  </p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-700">Training Schedule</p>
                  <p className="text-sm text-gray-500">
                    Receive notifications about training sessions
                  </p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-700">Team Announcements</p>
                  <p className="text-sm text-gray-500">
                    Stay updated with team news and announcements
                  </p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" className="peer sr-only" defaultChecked />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                <option value="en">English</option>
                <option value="sw">Swahili</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Theme</label>
              <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Timezone</label>
              <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                <option value="EAT">East Africa Time (GMT+3)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerSettings;