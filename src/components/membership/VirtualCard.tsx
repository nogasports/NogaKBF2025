import React from 'react';
import { Membership } from '../../types/membership';
import { QrCode } from 'lucide-react';

interface VirtualCardProps {
  membership: Membership;
}

const VirtualCard: React.FC<VirtualCardProps> = ({ membership }) => {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white shadow-xl">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-bold">Kenya Basketball Federation</h3>
          <p className="text-sm opacity-75">Official Member Card</p>
        </div>
        <img
          src="/kbf-logo.png"
          alt="KBF Logo"
          className="h-12 w-12"
        />
      </div>

      <div className="mt-6 flex items-center gap-4">
        {membership.photo ? (
          <img
            src={membership.photo}
            alt={membership.name}
            className="h-20 w-20 rounded-full border-4 border-white object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-blue-700">
            <span className="text-2xl font-bold">
              {membership.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className="text-lg font-semibold">{membership.name}</h4>
          <p className="text-sm opacity-75">
            {membership.type.toUpperCase()} MEMBER
          </p>
          {membership.licenseNumber && (
            <p className="text-sm opacity-75">
              License: {membership.licenseNumber}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs opacity-75">Valid From</p>
          <p className="font-medium">
            {new Date(membership.validFrom).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-xs opacity-75">Valid Until</p>
          <p className="font-medium">
            {new Date(membership.validUntil).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-xs opacity-75">Member ID</p>
          <p className="font-medium">{membership.memberId}</p>
        </div>
        <div className="rounded-lg bg-white p-2">
          <QrCode className="h-16 w-16 text-blue-800" />
        </div>
      </div>
    </div>
  );
};

export default VirtualCard;