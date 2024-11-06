import React from 'react';
import { Play, Pause, Square, Clock, RotateCcw } from 'lucide-react';
import { MatchControl } from '../../lib/api/services/matchEngine.service';

interface MatchControlPanelProps {
  control: MatchControl;
  onStart: () => void;
  onPause: () => void;
  onEnd: () => void;
  onQuarterChange: (quarter: number) => void;
  onTimeUpdate: (time: string) => void;
  onShotClockReset: () => void;
}

const MatchControlPanel: React.FC<MatchControlPanelProps> = ({
  control,
  onStart,
  onPause,
  onEnd,
  onQuarterChange,
  onTimeUpdate,
  onShotClockReset,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Match Control</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Quarter
          </label>
          <select
            value={control.currentQuarter}
            onChange={(e) => onQuarterChange(parseInt(e.target.value))}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            {[1, 2, 3, 4].map((q) => (
              <option key={q} value={q}>
                Quarter {q}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Time Remaining
          </label>
          <input
            type="text"
            value={control.timeRemaining}
            onChange={(e) => onTimeUpdate(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <div className="space-x-2">
          {control.status === 'in_progress' ? (
            <button
              onClick={onPause}
              className="flex items-center gap-2 rounded-lg border border-yellow-600 px-4 py-2 text-yellow-600 hover:bg-yellow-50"
            >
              <Pause size={20} />
              Pause
            </button>
          ) : (
            <button
              onClick={onStart}
              className="flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-green-600 hover:bg-green-50"
            >
              <Play size={20} />
              Start
            </button>
          )}
          <button
            onClick={onEnd}
            className="flex items-center gap-2 rounded-lg border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50"
          >
            <Square size={20} />
            End Match
          </button>
        </div>

        <button
          onClick={onShotClockReset}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <RotateCcw size={20} />
          Reset Shot Clock
        </button>
      </div>
    </div>
  );
};

export default MatchControlPanel;