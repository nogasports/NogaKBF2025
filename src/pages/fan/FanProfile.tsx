import React from 'react';
import { User, Heart, Trophy, Calendar, Star } from 'lucide-react';
import { useFan } from '../../contexts/FanContext';

const FanProfile = () => {
  const { currentFan } = useFan();

  const recentActivity = [
    {
      type: 'vote',
      icon: Star,
      title: 'MVP Vote',
      description: 'John Doe - Ulinzi Warriors vs Thunder',
      date: '2024-03-15',
    },
    {
      type: 'attendance',
      icon: Calendar,
      title: 'Match Attendance',
      description: 'KPA vs Equity Hawks',
      date: '2024-03-10',
    },
    {
      type: 'follow',
      icon: Heart,
      title: 'Started Following',
      description: 'Strathmore Blades',
      date: '2024-03-05',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Fan Profile</h2>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Edit Profile
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="text-center">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
                <User className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {currentFan.name}
              </h3>
              <p className="text-sm text-gray-500">{currentFan.email}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-600">Teams Following</span>
                <span className="font-medium text-blue-600">
                  {currentFan.favoriteTeams.length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-600">Matches Attended</span>
                <span className="font-medium text-blue-600">15</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-600">MVP Votes</span>
                <span className="font-medium text-blue-600">8</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {/* Favorite Teams */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Favorite Teams
            </h3>
            <div className="space-y-4">
              {currentFan.favoriteTeams.map((team) => (
                <div
                  key={team.teamId}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{team.name}</p>
                      <p className="text-sm text-gray-500">
                        Following since {new Date(team.followedSince).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                      {team.division}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-50 p-2">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Match History */}
          <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Match History
              </h3>
              <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm">
                <option>Last Month</option>
                <option>Last 3 Months</option>
                <option>All Time</option>
              </select>
            </div>
            <div className="mt-4 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      Ulinzi Warriors vs Thunder
                    </p>
                    <p className="text-sm text-gray-500">
                      March {15 - i}, 2024 • Nyayo Stadium
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      Attended
                    </span>
                    {i === 1 && (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                        MVP Vote Cast
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FanProfile;