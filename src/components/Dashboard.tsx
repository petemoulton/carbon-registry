import React from 'react';
import type { ProjectStats } from '../types';
import { BarChart3, Globe2, Tag, Activity } from 'lucide-react';

interface DashboardProps {
  stats: ProjectStats;
  loading: boolean;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export function Dashboard({ stats, loading }: DashboardProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="ml-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Projects"
        value={stats.totalProjects}
        icon={<BarChart3 className="h-6 w-6" />}
      />
      <StatCard
        title="Countries"
        value={Object.keys(stats.byCountry).length}
        icon={<Globe2 className="h-6 w-6" />}
      />
      <StatCard
        title="Categories"
        value={Object.keys(stats.byCategory).length}
        icon={<Tag className="h-6 w-6" />}
      />
      <StatCard
        title="Active Projects"
        value={stats.byStatus['Active'] || 0}
        icon={<Activity className="h-6 w-6" />}
      />
    </div>
  );
}