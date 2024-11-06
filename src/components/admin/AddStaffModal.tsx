import React, { useState } from 'react';
import Modal from '../common/Modal';
import { StaffPosition } from '../../types/league';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({ isOpen, onClose, teamId }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    dateOfBirth: '',
    position: StaffPosition.HEAD_COACH,
    nationality: '',
    passportId: '',
    phone: '',
    email: '',
    coachLicense: '',
    contractStart: '',
    contractEnd: '',
    previousTeam: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle staff creation logic here
    console.log('Creating staff member:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Staff Member">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Surname</label>
              <input
                type="text"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nationality</label>
              <input
                type="text"
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Role & Qualifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Role & Qualifications</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <select
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value as StaffPosition })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              >
                {Object.values(StaffPosition).map((position) => (
                  <option key={position} value={position}>
                    {position.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Coach License Number</label>
              <input
                type="text"
                value={formData.coachLicense}
                onChange={(e) => setFormData({ ...formData, coachLicense: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Previous Team</label>
              <input
                type="text"
                value={formData.previousTeam}
                onChange={(e) => setFormData({ ...formData, previousTeam: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Contract Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Contract Details</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contract Start</label>
              <input
                type="date"
                value={formData.contractStart}
                onChange={(e) => setFormData({ ...formData, contractStart: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contract End</label>
              <input
                type="date"
                value={formData.contractEnd}
                onChange={(e) => setFormData({ ...formData, contractEnd: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Documents</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Passport Photo</label>
              <input
                type="file"
                accept="image/*"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ID Copy</label>
              <input
                type="file"
                accept="image/*,.pdf"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Staff Member
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStaffModal;