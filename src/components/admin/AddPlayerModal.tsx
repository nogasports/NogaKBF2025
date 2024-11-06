import React, { useState } from 'react';
import Modal from '../common/Modal';
import { CreatePlayerRequest } from '../../types/requests';
import { PlayerPosition } from '../../types/league';

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
}

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({ isOpen, onClose, teamId }) => {
  const [formData, setFormData] = useState<CreatePlayerRequest>({
    leagueId: '',
    teamId,
    kbfId: '',
    firstName: '',
    surname: '',
    dateOfBirth: '',
    heightFt: 0,
    weightKg: 0,
    position: PlayerPosition.POINT_GUARD,
    nationality: '',
    passportId: '',
    jerseyNumber: '',
    isCaptain: false,
    contractStart: '',
    contractEnd: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle player creation logic here
    console.log('Creating player:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Player">
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Passport/ID Number</label>
              <input
                type="text"
                value={formData.passportId}
                onChange={(e) => setFormData({ ...formData, passportId: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>
        </div>

        {/* Physical Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Physical Details</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Height (ft)</label>
              <input
                type="number"
                step="0.1"
                value={formData.heightFt}
                onChange={(e) => setFormData({ ...formData, heightFt: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.weightKg}
                onChange={(e) => setFormData({ ...formData, weightKg: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <select
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value as PlayerPosition })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              >
                {Object.values(PlayerPosition).map((position) => (
                  <option key={position} value={position}>
                    {position.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Team Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Team Details</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Jersey Number</label>
              <input
                type="text"
                value={formData.jerseyNumber}
                onChange={(e) => setFormData({ ...formData, jerseyNumber: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Previous Team</label>
              <input
                type="text"
                value={formData.previousTeam || ''}
                onChange={(e) => setFormData({ ...formData, previousTeam: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
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
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isCaptain"
              checked={formData.isCaptain}
              onChange={(e) => setFormData({ ...formData, isCaptain: e.target.checked })}
              className="rounded border-gray-300 text-blue-600"
            />
            <label htmlFor="isCaptain">Team Captain</label>
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, passportPhoto: file });
                  }
                }}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ID Copy</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({ ...formData, idCopy: file });
                  }
                }}
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
            Add Player
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPlayerModal;