import React from 'react';
import { FileText, Download, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';

const PlayerDocuments = () => {
  const { currentPlayer } = usePlayer();

  const documents = [
    {
      id: '1',
      title: 'Player License',
      type: 'license',
      date: '2024-01-01',
      status: 'active',
      expiryDate: '2024-12-31',
      downloadable: true,
    },
    {
      id: '2',
      title: 'Medical Certificate',
      type: 'medical',
      date: '2024-02-15',
      status: 'active',
      expiryDate: '2024-12-31',
      downloadable: true,
    },
    {
      id: '3',
      title: 'Player Contract',
      type: 'contract',
      date: '2024-01-01',
      status: 'active',
      expiryDate: '2024-12-31',
      downloadable: true,
    },
    {
      id: '4',
      title: 'Insurance Policy',
      type: 'insurance',
      date: '2024-01-01',
      status: 'pending',
      downloadable: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Upload Document
        </button>
      </div>

      <div className="rounded-lg bg-white shadow-sm">
        <div className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-6"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-gray-100 p-3">
                  <FileText className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{doc.title}</h3>
                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Uploaded: {new Date(doc.date).toLocaleDateString()}</span>
                    </div>
                    {doc.expiryDate && (
                      <div>
                        <span>Expires: {new Date(doc.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
                    doc.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {doc.status === 'active' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
                {doc.downloadable && (
                  <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-6">
        <h3 className="text-lg font-medium text-blue-900">Document Guidelines</h3>
        <ul className="mt-4 list-inside list-disc space-y-2 text-blue-700">
          <li>All documents must be in PDF format</li>
          <li>Maximum file size: 5MB</li>
          <li>Medical certificates must be renewed annually</li>
          <li>Keep your license and insurance documents up to date</li>
        </ul>
      </div>
    </div>
  );
};

export default PlayerDocuments;