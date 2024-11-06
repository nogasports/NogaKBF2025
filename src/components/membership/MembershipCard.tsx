import React from 'react';
import { Membership } from '../../types/membership';
import { User, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MembershipCardProps {
  membership: Membership;
  onClick: (membership: Membership) => void;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ membership, onClick }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
    suspended: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-blue-100 text-blue-800',
  };

  const typeColors = {
    player: 'border-blue-500',
    official: 'border-purple-500',
    coach: 'border-green-500',
    team: 'border-orange-500',
    fan: 'border-gray-500',
  };

  return (
    <div
      onClick={() => onClick(membership)}
      className={cn(
        'cursor-pointer rounded-lg border-l-4 bg-white p-6 shadow-sm transition-all hover:shadow-md',
        typeColors[membership.type]
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          {membership.photo ? (
            <img
              src={membership.photo}
              alt={membership.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <User className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{membership.name}</h3>
            <p className="text-sm text-gray-500">
              {membership.type.charAt(0).toUpperCase() + membership.type.slice(1)}
            </p>
            {membership.licenseNumber && (
              <p className="text-sm text-gray-500">
                License: {membership.licenseNumber}
              </p>
            )}
          </div>
        </div>
        <span
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium',
            statusColors[membership.status]
          )}
        >
          {membership.status}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Valid until {new Date(membership.validUntil).toLocaleDateString()}</span>
        </div>
        {membership.status === 'active' ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
      </div>
    </div>
  );
};

export default MembershipCard;