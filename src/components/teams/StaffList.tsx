import React from 'react';
import { Staff } from '../../types/team';
import { UserCircle } from 'lucide-react';

interface StaffListProps {
  staff: Staff[];
  onEditStaff: (staff: Staff) => void;
}

const StaffList: React.FC<StaffListProps> = ({ staff, onEditStaff }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Staff Member
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              License
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {staff.map((member) => (
            <tr key={member.id}>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <UserCircle className="mr-3 h-8 w-8 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">
                      {member.nationality}
                    </div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {member.role}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {member.licenseNumber}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                <button
                  onClick={() => onEditStaff(member)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;