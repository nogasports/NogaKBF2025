import React from 'react';
import { FileText, Download, Filter } from 'lucide-react';

const TeamReports = () => {
  const reports = [
    {
      id: '1',
      title: 'Monthly Performance Report',
      date: '2024-03-01',
      type: 'Performance',
      status: 'Ready',
    },
    {
      id: '2',
      title: 'Player Statistics Analysis',
      date: '2024-03-05',
      type: 'Statistics',
      status: 'Ready',
    },
    {
      id: '3',
      title: 'Training Assessment',
      date: '2024-03-10',
      type: 'Training',
      status: 'Processing',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
        <div className="flex gap-2">
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2">
            <option>All Types</option>
            <option>Performance</option>
            <option>Statistics</option>
            <option>Training</option>
          </select>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-gray-100 p-3">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{report.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{report.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    report.status === 'Ready'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {report.status}
                </span>
                <button
                  disabled={report.status !== 'Ready'}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 ${
                    report.status === 'Ready'
                      ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamReports;