import React, { useState } from 'react';
import { Search, Filter, QrCode, UserCheck } from 'lucide-react';
import { useTeam } from '../../contexts/TeamContext';
import { Membership } from '../../types/membership';

const TeamMemberships = () => {
  const { selectedTeam } = useTeam();
  const [activeTab, setActiveTab] = useState<'players' | 'staff'>('players');
  const [searchTerm, setSearchTerm] = useState('');

  const mockMemberships: Membership[] = [
    {
      id: '1',
      memberId: 'KBF-P-2024-001',
      type: 'player',
      name: 'John Doe',
      dateOfBirth: '1995-05-15',
      nationality: 'Kenyan',
      email: 'john.doe@example.com',
      phone: '+254 712 345 678',
      status: 'active',
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      team: selectedTeam?.name,
      licenseNumber: 'KBF-PL-001',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KBF-P-2024-001',
    },
    {
      id: '2',
      memberId: 'KBF-S-2024-001',
      type: 'coach',
      name: 'James Smith',
      dateOfBirth: '1975-03-20',
      nationality: 'Kenyan',
      email: 'james.smith@example.com',
      phone: '+254 723 456 789',
      status: 'active',
      validFrom: '2024-01-01',
      validUntil: '2024-12-31',
      team: selectedTeam?.name,
      licenseNumber: 'KBF-HC-001',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=KBF-S-2024-001',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Memberships</h2>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Request New Membership
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option value="all">All Types</option>
            <option value="player">Players</option>
            <option value="coach">Coaches</option>
            <option value="staff">Staff</option>
          </select>
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  ID/License
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Valid Until
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockMemberships.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <UserCheck className="h-10 w-10 rounded-full bg-gray-100 p-2 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{member.memberId}</div>
                    <div className="text-sm text-gray-500">{member.licenseNumber}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold capitalize text-blue-800">
                      {member.type}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      member.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : member.status === 'expired'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(member.validUntil).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                    <button className="mr-2 text-blue-600 hover:text-blue-900">View ID</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberships;