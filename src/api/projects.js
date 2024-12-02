import { getProjects, getProjectStats } from '../db/index.js';

export async function fetchProjects() {
  return getProjects();
}

export async function fetchProjectStats() {
  return getProjectStats();
}