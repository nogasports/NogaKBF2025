import React, { useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import {
  User,
  Mail,
  Phone,
  Flag,
  Calendar,
  Ruler,
  Weight,
  Award,
  Edit,
} from 'lucide-react';

const PlayerProfile = () => {
  const { currentPlayer } = usePlayer();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Player Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Edit size={20} />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="text-center">
              {currentPlayer?.photo ? (
                <img
                  src={currentPlayer.photo}
                  alt={currentPlayer.name}
                  className="mx-auto h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {currentPlayer?.name}
              </h3>
              <p className="text-sm text-gray-500">{currentPlayer?.team}</p>
              <p className="mt-1 text-sm text-gray-500">
                Jersey #{currentPlayer?.jerseyNumber}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="h-5 w-5" />
                <span>{currentPlayer?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="h-5 w-5" />
                <span>{currentPlayer?.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Flag className="h-5 w-5" />
                <span>{currentPlayer?.nationality}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h4 className="mb-4 font-semibold text-gray-900">
                Personal Information
              </h4>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-sm text-gray-500">Date of Birth</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">
                      {currentPlayer?.dateOfBirth}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Height</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">{currentPlayer?.height}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Weight</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Weight className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">{currentPlayer?.weight}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Position</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Award className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">{currentPlayer?.position}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h4 className="mb-4 font-semibold text-gray-900">
                Career Statistics
              </h4>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">156</p>
                  <p className="mt-1 text-sm text-gray-500">Games Played</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">16.8</p>
                  <p className="mt-1 text-sm text-gray-500">Points Per Game</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">85%</p>
                  <p className="mt-1 text-sm text-gray-500">Games Started</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h4 className="mb-4 font-semibold text-gray-900">
                Team History
              </h4>
              <div className="space-y-4">
                {[
                  {
                    team: 'Current Team',
                    period: '2022 - Present',
                    games: 45,
                  },
                  {
                    team: 'Previous Team',
                    period: '2020 - 2022',
                    games: 72,
                  },
                ].map((history, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {history.team}
                      </p>
                      <p className="text-sm text-gray-500">{history.period}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {history.games} games
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;