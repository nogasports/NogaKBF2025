import React, { useState } from 'react';
import { User, Bell, Globe, Shield, Briefcase } from 'lucide-react';
import { TeamManager, ManagerNotificationSettings, ManagerPreferences } from '../../types/manager';

const mockManager: TeamManager = {
  id: '1',
  name: 'Mupalia Joy',
  email: 'mupalia.joy@strathmore.edu',
  phone: '+254 712 345 678',
  teams: [
    {
      id: '1',
      name: 'Strathmore Swords',
      role: 'head_manager',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      division: 'Women\'s Premier',
    },
    {
      id: '2',
      name: 'Strathmore Blades',
      role: 'head_manager',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
      division: 'Men\'s Premier',
    },
  ],
  status: 'active',
  licenseNumber: 'KBF-TM-001',
  licenseExpiry: '2024-12-31',
};

const TeamManagerSettings = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'teams' | 'notifications' | 'preferences'>('profile');
  const [manager] = useState<TeamManager>(mockManager);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manager Settings</h2>
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
            onClick={() => setActiveTab('teams')}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'teams'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Briefcase size={16} />
              <span>Teams</span>
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
              {manager.photo ? (
                <img
                  src={manager.photo}
                  alt={manager.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                Change Photo
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  defaultValue={manager.name}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue={manager.email}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  defaultValue={manager.phone}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">License Number</label>
                <input
                  type="text"
                  defaultValue={manager.licenseNumber}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Managed Teams</h3>
              <button className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                Request Team Access
              </button>
            </div>

            <div className="space-y-4">
              {manager.teams.map((team) => (
                <div key={team.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{team.name}</h4>
                      <p className="text-sm text-gray-500">
                        {team.division} • {team.role.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                    Manage Access
                  </button>
                </div>
              ))}
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
                    Get notified about match schedules and results
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
                  <p className="font-medium text-gray-700">Training Reminders</p>
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
                  <p className="font-medium text-gray-700">League Announcements</p>
                  <p className="text-sm text-gray-500">
                    Stay updated with league news and announcements
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
              <label className="block text-sm font-medium text-gray-700">Default Team</label>
              <select className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2">
                {manager.teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

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

export default TeamManagerSettings;