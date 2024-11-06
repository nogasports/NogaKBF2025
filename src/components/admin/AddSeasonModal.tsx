import React, { useState } from 'react';
import Modal from '../common/Modal';

interface AddSeasonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSeasonModal: React.FC<AddSeasonModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    leagues: [] as { name: string; divisions: string[] }[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle season creation logic here
    console.log('Creating season:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Season">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Season Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="e.g., 2024 Season"
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Leagues</label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="mens-premier"
                className="rounded border-gray-300 text-blue-600"
              />
              <label htmlFor="mens-premier">Men's Premier League</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="womens-premier"
                className="rounded border-gray-300 text-blue-600"
              />
              <label htmlFor="womens-premier">Women's Premier League</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="mens-div1"
                className="rounded border-gray-300 text-blue-600"
              />
              <label htmlFor="mens-div1">Men's Division One</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="womens-div1"
                className="rounded border-gray-300 text-blue-600"
              />
              <label htmlFor="womens-div1">Women's Division One</label>
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
            Create Season
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSeasonModal;