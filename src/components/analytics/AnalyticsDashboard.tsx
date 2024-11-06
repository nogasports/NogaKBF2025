import React, { useState, useEffect } from 'react';
import { BarChart, Activity, AlertCircle, Users } from 'lucide-react';
import { monitoring } from '../../lib/monitoring';
import { MetricAggregation, ErrorStats } from '../../lib/monitoring/types';

const AnalyticsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Record<string, MetricAggregation>>({});
  const [errorStats, setErrorStats] = useState<ErrorStats | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'day' | 'week' | 'month'>('day');

  useEffect(() => {
    const updateMetrics = () => {
      const allMetrics = monitoring.getMetrics();
      setMetrics(allMetrics.events);
      setErrorStats(allMetrics.errors);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value as any)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* User Engagement */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-3xl font-semibold">
            {metrics['active_users']?.lastValue || 0}
          </p>
          <p className="mt-1 text-sm text-green-600">
            +{metrics['active_users']?.count || 0} today
          </p>
        </div>

        {/* Match Statistics */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Live Matches</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-3xl font-semibold">
            {metrics['live_matches']?.lastValue || 0}
          </p>
          <p className="mt-1 text-sm text-blue-600">
            {metrics['match_attendance']?.avg.toFixed(0) || 0} avg. attendance
          </p>
        </div>

        {/* System Performance */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">API Response Time</h3>
            <BarChart className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-3xl font-semibold">
            {metrics['api_response_time']?.avg.toFixed(0) || 0}ms
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {metrics['api_requests']?.count || 0} requests
          </p>
        </div>

        {/* Error Rate */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Error Rate</h3>
            <AlertCircle className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-3xl font-semibold">
            {errorStats?.total || 0}
          </p>
          <p className="mt-1 text-sm text-red-600">
            Last 24 hours
          </p>
        </div>
      </div>

      {/* Recent Errors */}
      {errorStats && errorStats.recentErrors.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Recent Errors</h3>
          <div className="space-y-4">
            {errorStats.recentErrors.map((error, index) => (
              <div
                key={index}
                className="rounded-lg border border-red-100 bg-red-50 p-4"
              >
                <p className="font-medium text-red-800">{error.message}</p>
                <p className="mt-1 text-sm text-red-600">
                  {new Date(error.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;