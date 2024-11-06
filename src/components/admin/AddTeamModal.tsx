import React, { useState } from 'react';
import Modal from '../common/Modal';
import { CreateTeamRequest } from '../../types/requests';

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTeamModal: React.FC<AddTeamModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<CreateTeamRequest>({
    leagueId: '',
    name: '',
    kbfId: '',
    location: '',
    establishedYear: new Date().getFullYear(),
    homeVenue: '',
    homeKit: '',
    awayKit: '',
    mainContact: {
      firstName: '',
      surname: '',
      role: '',
      email: '',
      phone: '',
    },
    registered: false,
    leagueFeePaid: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle team creation logic here
    console.log('Creating team:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Team">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Team Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">KBF ID</label>
              <input
                type="text"
                value={formData.kbfId}
                onChange={(e) => setFormData({ ...formData, kbfId: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">League</label>
              <select
                value={formData.leagueId}
                onChange={(e) => setFormData({ ...formData, leagueId: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              >
                <option value="">Select League</option>
                <option value="mens-premier">Men's Premier League</option>
                <option value="womens-premier">Women's Premier League</option>
                <option value="mens-div1">Men's Division One</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Established Year</label>
              <input
                type="number"
                value={formData.establishedYear}
                onChange={(e) => setFormData({ ...formData, establishedYear: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Location & Venue */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Location & Venue</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Home Venue</label>
              <input
                type="text"
                value={formData.homeVenue}
                onChange={(e) => setFormData({ ...formData, homeVenue: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Team Colors */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Team Colors</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Home Kit</label>
              <input
                type="text"
                value={formData.homeKit}
                onChange={(e) => setFormData({ ...formData, homeKit: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="e.g., Blue/White"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Away Kit</label>
              <input
                type="text"
                value={formData.awayKit}
                onChange={(e) => setFormData({ ...formData, awayKit: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="e.g., Red/Black"
                required
              />
            </div>
          </div>
        </div>

        {/* Main Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Main Contact</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={formData.mainContact.firstName}
                onChange={(e) => setFormData({
                  ...formData,
                  mainContact: { ...formData.mainContact, firstName: e.target.value }
                })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Surname</label>
              <input
                type="text"
                value={formData.mainContact.surname}
                onChange={(e) => setFormData({
                  ...formData,
                  mainContact: { ...formData.mainContact, surname: e.target.value }
                })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                value={formData.mainContact.role}
                onChange={(e) => setFormData({
                  ...formData,
                  mainContact: { ...formData.mainContact, role: e.target.value }
                })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.mainContact.email}
                onChange={(e) => setFormData({
                  ...formData,
                  mainContact: { ...formData.mainContact, email: e.target.value }
                })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={formData.mainContact.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  mainContact: { ...formData.mainContact, phone: e.target.value }
                })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Registration & Payment */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Registration & Payment</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="registered"
                checked={formData.registered}
                onChange={(e) => setFormData({ ...formData, registered: e.target.checked })}
                className="rounded border-gray-300 text-blue-600"
              />
              <label htmlFor="registered">Team is registered with KBF</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="leagueFeePaid"
                checked={formData.leagueFeePaid}
                onChange={(e) => setFormData({ ...formData, leagueFeePaid: e.target.checked })}
                className="rounded border-gray-300 text-blue-600"
              />
              <label htmlFor="leagueFeePaid">League fee has been paid</label>
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Team Logo</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData({ ...formData, logo: file });
                }
              }}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            />
            <p className="mt-1 text-sm text-gray-500">
              Recommended size: 400x400px. Maximum file size: 2MB
            </p>
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
            Create Team
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTeamModal;