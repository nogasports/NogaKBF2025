import React, { useState } from 'react';
import { Bell, Globe, User } from 'lucide-react';
import { useFan } from '../../contexts/FanContext';

const FanSettings = () => {
  const { currentFan } = useFan();
  const [activeTab, setActiveTab] = useState<'notifications' | 'preferences'>('notifications');

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

      {activeTab === 'notifications' && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-700">Match Alerts</p>
                  <p className="text-sm text-gray-500">
                    Get notified about upcoming matches for your favorite teams
                  </p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  defaultChecked={currentFan.preferences.notifications.matchAlerts}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-700">Team News</p>
                  <p className="text-sm text-gray-500">
                    Receive updates about your favorite teams
                  </p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  defaultChecked={currentFan.preferences.notifications.teamNews}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-700">League Updates</p>
                  <p className="text-sm text-gray-500">
                    Stay informed about league news and announcements
                  </p>
                </div>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  defaultChecked={currentFan.preferences.notifications.leagueUpdates}
                />
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
              <select
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                defaultValue={currentFan.preferences.theme}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Default View</label>
              <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                <option value="all">All Teams</option>
                <option value="following">Following Only</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FanSettings;