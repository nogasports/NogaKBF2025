import React from 'react';
import { Official } from '../../types/official';
import {
  Award,
  Mail,
  Phone,
  Calendar,
  Star,
  Flag,
  Clock,
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface OfficialDetailsProps {
  official: Official;
  onClose: () => void;
  onEdit: (official: Official) => void;
}

const OfficialDetails: React.FC<OfficialDetailsProps> = ({
  official,
  onClose,
  onEdit,
}) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {official.photo ? (
            <img
              src={official.photo}
              alt={official.name}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <Award className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {official.name}
              </h2>
              <span
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium',
                  statusColors[official.status]
                )}
              >
                {official.status}
              </span>
            </div>
            <p className="text-gray-500">
              {official.role.charAt(0).toUpperCase() + official.role.slice(1)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(official)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Edit Profile
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">Personal Information</h3>
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-400" />
              <span>{official.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-gray-400" />
              <span>{official.contactNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="h-5 w-5 text-gray-400" />
              <span>{official.nationality}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span>{official.experience} years experience</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">License Information</h3>
          <div className="grid gap-4">
            <div>
              <span className="text-sm text-gray-500">License Number</span>
              <p className="font-medium">{official.licenseNumber}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">License Level</span>
              <p className="font-medium">{official.licenseLevel}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Expiry Date</span>
              <p className="font-medium">{official.licenseExpiry}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="font-semibold text-gray-900">Performance Statistics</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <Calendar className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <span className="block text-2xl font-bold">
                {official.assignedMatches || 0}
              </span>
              <span className="text-sm text-gray-500">Assigned Matches</span>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <Award className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <span className="block text-2xl font-bold">
                {official.completedMatches || 0}
              </span>
              <span className="text-sm text-gray-500">Completed Matches</span>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <Star className="mx-auto mb-2 h-6 w-6 text-yellow-400" />
              <span className="block text-2xl font-bold">
                {official.rating || 'N/A'}
              </span>
              <span className="text-sm text-gray-500">Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialDetails;