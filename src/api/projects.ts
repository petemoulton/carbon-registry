import { getProjects, getProjectStats } from '../db';
import type { Project, ProjectStats } from '../types';

export async function fetchProjects(): Promise<Project[]> {
  return getProjects();
}

export async function fetchProjectStats(): Promise<ProjectStats> {
  return getProjectStats();
}