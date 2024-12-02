import React, { useEffect, useState } from 'react';
import { fetchProjects, fetchProjectStats } from './api/projects';
import { ProjectTable } from './components/ProjectTable';
import { Dashboard } from './components/Dashboard';
import type { Project, ProjectStats } from './types';
import { Filter } from 'lucide-react';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegistry, setSelectedRegistry] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [projectsData, statsData] = await Promise.all([
          fetchProjects(),
          fetchProjectStats()
        ]);
        setProjects(projectsData);
        setFilteredProjects(projectsData);
        setStats(statsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    let filtered = [...projects];
    
    if (selectedRegistry !== 'all') {
      filtered = filtered.filter(project => project.registry === selectedRegistry);
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    
    setFilteredProjects(filtered);
  }, [selectedRegistry, selectedCategory, projects]);

  const uniqueCategories = [...new Set(projects.map(project => project.category))].sort();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {stats && <Dashboard stats={stats} loading={loading} />}
            <div className="mt-8">
              <div className="mb-4 bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-400" />
                <div className="flex space-x-4 flex-grow">
                  <div className="flex items-center space-x-2">
                    <label htmlFor="registry" className="text-sm font-medium text-gray-700">
                      Registry:
                    </label>
                    <select
                      id="registry"
                      value={selectedRegistry}
                      onChange={(e) => setSelectedRegistry(e.target.value)}
                      className="block w-48 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="all">All Registries</option>
                      <option value="CER">CER</option>
                      <option value="Verra">Verra</option>
                      <option value="Gold Standard">Gold Standard</option>
                      <option value="ACR">ACR</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Category:
                    </label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="block w-64 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="all">All Categories</option>
                      {uniqueCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedRegistry('all');
                    setSelectedCategory('all');
                  }}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Clear Filters
                </button>
              </div>
              <ProjectTable projects={filteredProjects} loading={loading} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;