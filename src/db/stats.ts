import type { ProjectStats } from '../types';
import { getAllProjects } from './queries';

export async function getProjectStats(): Promise<ProjectStats> {
  const projects = await getAllProjects();
  
  return {
    totalProjects: projects.length,
    byRegistry: projects.reduce((acc, project) => {
      acc[project.registry] = (acc[project.registry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byCategory: projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byCountry: projects.reduce((acc, project) => {
      acc[project.country] = (acc[project.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byStatus: projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
}