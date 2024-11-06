import React, { useState } from 'react';
import { Bell, Shield, Globe, Moon, Sun, Mail } from 'lucide-react';
import NotificationSettings from '../../components/settings/NotificationSettings';
import SecuritySettings from '../../components/settings/SecuritySettings';
import SystemSettings from '../../components/settings/SystemSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'security' | 'system'>('notifications');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
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
            onClick={() => setActiveTab('security')}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'security'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span>Security</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`border-b-2 px-1 py-4 text-sm font-medium ${
              activeTab === 'system'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>System</span>
            </div>
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'system' && <SystemSettings />}
      </div>
    </div>
  );
};

export default Settings;