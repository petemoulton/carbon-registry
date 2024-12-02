import React from 'react';
import { Download, ExternalLink, TrendingUp } from 'lucide-react';
import type { Project } from '../types';
import { RegistryLogo } from './RegistryLogo';

interface ProjectTableProps {
  projects: Project[];
  loading: boolean;
}

interface Column {
  id: keyof Project | 'actions';
  label: string;
  render: (project: Project) => React.ReactNode;
}

export function ProjectTable({ projects, loading }: ProjectTableProps) {
  const columns: Column[] = [
    {
      id: 'registry',
      label: 'Registry',
      render: (project) => (
        <div className="flex items-center">
          <RegistryLogo registry={project.registry} className="h-6 w-6" />
          <span className="ml-2 text-sm text-gray-500">{project.registry}</span>
        </div>
      )
    },
    {
      id: 'name',
      label: 'Project Name',
      render: (project) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{project.name}</div>
          <div className="text-sm text-gray-500">ID: {project.id}</div>
        </div>
      )
    },
    {
      id: 'category',
      label: 'Category',
      render: (project) => (
        <span className="text-sm text-gray-500">{project.category}</span>
      )
    },
    {
      id: 'methodology',
      label: 'Methodology',
      render: (project) => (
        <span className="text-sm text-gray-500">{project.methodology}</span>
      )
    },
    {
      id: 'status',
      label: 'Status',
      render: (project) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {project.status}
        </span>
      )
    },
    {
      id: 'estimatedReduction',
      label: 'Est. Reduction',
      render: (project) => (
        <div className="flex items-center text-sm text-gray-500">
          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
          {project.estimatedReduction?.toLocaleString()} tCO₂e
        </div>
      )
    },
    {
      id: 'actions',
      label: 'Actions',
      render: (project) => (
        <div className="flex space-x-2">
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-900"
            title="View Project Details"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
          {project.shapefileUrl && (
            <a
              href={project.shapefileUrl}
              download
              className="text-indigo-600 hover:text-indigo-900"
              title="Download Shapefile"
            >
              <Download className="h-5 w-5" />
            </a>
          )}
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const projectList = Array.isArray(projects) ? projects : [];

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projectList.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={`${project.id}-${column.id}`} className="px-6 py-4 whitespace-nowrap">
                  {column.render(project)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}