import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  Award,
  Activity,
  Upload,
  Download,
  FileSpreadsheet,
  UserPlus,
  ClipboardList,
  Mail,
  AlertCircle,
  Settings,
  TrendingUp,
  Database,
  FileText,
  Printer,
} from 'lucide-react';
import Modal from '../../components/common/Modal';
import { useApi } from '../../hooks/useApi';
import { dashboardService } from '../../lib/api/services/dashboard.service';
import { Cache } from '../../lib/cache';

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, trend }) => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="rounded-full bg-blue-50 p-3">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
      <span className="text-sm text-gray-600">{trend}</span>
    </div>
  </div>
);

interface QuickActionProps {
  icon: React.ElementType;
  label: string;
  description: string;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon: Icon, label, description, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-left transition-all hover:border-blue-500 hover:shadow-sm"
  >
    <div className="rounded-full bg-blue-50 p-2">
      <Icon className="h-5 w-5 text-blue-600" />
    </div>
    <div>
      <p className="font-medium text-gray-900">{label}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </button>
);

const Dashboard = () => {
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'players' | 'officials' | 'teams' | 'staff' | null>(null);
  
  const {
    data: dashboardStats,
    error: statsError,
    isLoading: isLoadingStats,
    execute: fetchStats
  } = useApi(dashboardService.getStats);

  const {
    data: activities,
    isLoading: isLoadingActivities,
    execute: fetchActivities
  } = useApi(dashboardService.getRecentActivities);

  const {
    data: deadlines,
    isLoading: isLoadingDeadlines,
    execute: fetchDeadlines
  } = useApi(dashboardService.getUpcomingDeadlines);

  useEffect(() => {
    const cache = Cache.getInstance();
    const cachedStats = cache.get('dashboard_stats');
    
    if (cachedStats) {
      // Use cached data initially
      fetchStats();
    }

    // Fetch fresh data
    fetchStats().then(data => {
      cache.set('dashboard_stats', data);
    });

    fetchActivities();
    fetchDeadlines();
  }, [fetchStats, fetchActivities, fetchDeadlines]);

  if (isLoadingStats && !dashboardStats) {
    return <div>Loading...</div>;
  }

  if (statsError) {
    return <div>Error loading dashboard data</div>;
  }

  const stats = [
    {
      icon: Users,
      label: 'Total Teams',
      value: dashboardStats?.totalTeams.toString() || '0',
      trend: '+2 new this season',
    },
    {
      icon: Calendar,
      label: 'Upcoming Matches',
      value: dashboardStats?.upcomingMatches.toString() || '0',
      trend: 'Next 7 days',
    },
    {
      icon: Award,
      label: 'Active Officials',
      value: dashboardStats?.activeOfficials.toString() || '0',
      trend: '92% availability',
    },
    {
      icon: Activity,
      label: 'Active Players',
      value: dashboardStats?.activePlayers.toString() || '0',
      trend: '+25 this season',
    },
  ];

  const quickActions = [
    {
      icon: Upload,
      label: 'Bulk Upload Players',
      description: 'Import multiple players using CSV template',
      onClick: () => {
        setUploadType('players');
        setShowBulkUploadModal(true);
      },
    },
    {
      icon: FileSpreadsheet,
      label: 'Bulk Upload Officials',
      description: 'Import officials data using CSV template',
      onClick: () => {
        setUploadType('officials');
        setShowBulkUploadModal(true);
      },
    },
    {
      icon: UserPlus,
      label: 'Bulk Upload Teams',
      description: 'Import multiple teams using CSV template',
      onClick: () => {
        setUploadType('teams');
        setShowBulkUploadModal(true);
      },
    },
    {
      icon: Upload,
      label: 'Bulk Upload Staff',
      description: 'Import team staff using CSV template',
      onClick: () => {
        setUploadType('staff');
        setShowBulkUploadModal(true);
      },
    },
    {
      icon: Download,
      label: 'Download Templates',
      description: 'Get CSV templates for bulk uploads',
      onClick: () => {
        // Handle template downloads
      },
    },
    {
      icon: ClipboardList,
      label: 'Generate Reports',
      description: 'Create league and team reports',
      onClick: () => {
        // Handle report generation
      },
    },
    {
      icon: Mail,
      label: 'Mass Communication',
      description: 'Send announcements to teams and officials',
      onClick: () => {
        // Handle mass communication
      },
    },
    {
      icon: AlertCircle,
      label: 'Pending Approvals',
      description: 'Review and approve registrations',
      onClick: () => {
        // Handle approvals
      },
    },
    {
      icon: Database,
      label: 'Data Export',
      description: 'Export league data in various formats',
      onClick: () => {
        // Handle data export
      },
    },
    {
      icon: FileText,
      label: 'League Documents',
      description: 'Manage league documents and forms',
      onClick: () => {
        // Handle league documents
      },
    },
    {
      icon: Printer,
      label: 'Print ID Cards',
      description: 'Generate and print member ID cards',
      onClick: () => {
        // Handle ID card printing
      },
    },
    {
      icon: Settings,
      label: 'League Configuration',
      description: 'Manage seasons and settings',
      onClick: () => {
        // Handle league configuration
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <div className="flex items-center gap-4">
          <select className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm">
            <option>2024 Season</option>
            <option>2023 Season</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <QuickAction key={action.label} {...action} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activities</h3>
          <div className="space-y-4">
            {activities?.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    activity.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {deadlines?.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium text-gray-900">{deadline.title}</p>
                  <p className="text-sm text-gray-500">{deadline.description}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    deadline.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  Due: {deadline.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showBulkUploadModal && (
        <Modal
          isOpen={showBulkUploadModal}
          onClose={() => {
            setShowBulkUploadModal(false);
            setUploadType(null);
          }}
          title={`Bulk Upload ${uploadType?.charAt(0).toUpperCase()}${uploadType?.slice(1) || ''}`}
        >
          {/* Modal content */}
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;