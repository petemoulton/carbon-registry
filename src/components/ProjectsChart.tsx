import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import { Project } from '../types';

interface ProjectsChartProps {
  projects: Project[];
}

export function ProjectsChart({ projects }: ProjectsChartProps) {
  const projectsByRegistry = projects.reduce((acc, project) => {
    acc[project.registry] = (acc[project.registry] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(projectsByRegistry).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Projects by Registry</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#059669" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}