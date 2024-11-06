import React from 'react';
import { Moon, Sun, Globe, Database } from 'lucide-react';

const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sun className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-700">Theme</p>
                <p className="text-sm text-gray-500">
                  Choose your preferred color theme
                </p>
              </div>
            </div>
            <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">Language & Region</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-700">Language</p>
                <p className="text-sm text-gray-500">
                  Select your preferred language
                </p>
              </div>
            </div>
            <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
              <option value="en">English</option>
              <option value="sw">Swahili</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-700">Time Zone</p>
                <p className="text-sm text-gray-500">
                  Set your local time zone
                </p>
              </div>
            </div>
            <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
              <option value="EAT">East Africa Time (GMT+3)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">Data Management</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-700">Cache</p>
                <p className="text-sm text-gray-500">
                  Clear application cache data
                </p>
              </div>
            </div>
            <button className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
              Clear Cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;