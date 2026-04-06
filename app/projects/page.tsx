'use client';

import { useState } from 'react';
import { Project, ProjectStatus, SortOption, FilterOption, CauseOfDeath } from '@/types';

// Mock data for development
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'AI Chatbot',
    description: 'Build a conversational AI assistant with natural language processing',
    tags: ['AI', 'web', 'frontend'],
    status: ProjectStatus.ACTIVE,
    startDate: new Date('2024-03-15'),
    lastWorkedDate: new Date('2024-04-01'),
    repoLink: 'https://github.com/example/ai-chatbot',
    notes: 'Working on the conversation flow',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-04-01')
  },
  {
    id: '2',
    name: 'E-commerce Site',
    description: 'Full-stack online store with React and Node.js',
    tags: ['web', 'fullstack', 'commerce'],
    status: ProjectStatus.ABANDONED,
    startDate: new Date('2024-02-01'),
    lastWorkedDate: new Date('2024-02-20'),
    causeOfDeath: CauseOfDeath.TOO_COMPLEX,
    repoLink: 'https://github.com/example/ecommerce',
    notes: 'Got overwhelmed with payment integration',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-20')
  },
  {
    id: '3',
    name: 'Mobile Game',
    description: 'Simple puzzle game for iOS and Android',
    tags: ['game', 'mobile', 'unity'],
    status: ProjectStatus.PAUSED,
    startDate: new Date('2024-01-10'),
    lastWorkedDate: new Date('2024-03-01'),
    repoLink: 'https://github.com/example/mobile-game',
    notes: 'Need to fix game balance issues',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-01')
  },
  {
    id: '4',
    name: 'Blog Platform',
    description: 'Markdown-based blogging platform with analytics',
    tags: ['web', 'cms', 'blogging'],
    status: ProjectStatus.ABANDONED,
    startDate: new Date('2023-12-01'),
    lastWorkedDate: new Date('2023-12-15'),
    causeOfDeath: CauseOfDeath.LOST_INTEREST,
    notes: 'Realized I prefer existing platforms',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2023-12-15')
  }
];

export default function ProjectsPage() {
  const [projects] = useState<Project[]>(mockProjects);
  const [filter, setFilter] = useState<FilterOption>('all');
  const [sort, setSort] = useState<SortOption>('lastUpdated');

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.status === filter
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sort) {
      case 'lastUpdated':
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      case 'created':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.ACTIVE:
        return 'bg-green-900/50 text-green-300 border-green-800';
      case ProjectStatus.PAUSED:
        return 'bg-yellow-900/50 text-yellow-300 border-yellow-800';
      case ProjectStatus.ABANDONED:
        return 'bg-red-900/50 text-red-300 border-red-800';
      default:
        return 'bg-gray-900/50 text-gray-300 border-gray-800';
    }
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.ACTIVE:
        return '🟢';
      case ProjectStatus.PAUSED:
        return '🟡';
      case ProjectStatus.ABANDONED:
        return '🔴';
      default:
        return '⚪';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getDaysSince = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">Projects</h1>
        <p className="text-gray-400">Manage your project graveyard</p>
      </div>

      {/* Filters and Controls */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-6 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-cyan-900/50 text-cyan-300 border border-cyan-800'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setFilter(ProjectStatus.ACTIVE)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === ProjectStatus.ACTIVE
                  ? 'bg-green-900/50 text-green-300 border border-green-800'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              Active ({projects.filter(p => p.status === ProjectStatus.ACTIVE).length})
            </button>
            <button
              onClick={() => setFilter(ProjectStatus.PAUSED)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === ProjectStatus.PAUSED
                  ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              Paused ({projects.filter(p => p.status === ProjectStatus.PAUSED).length})
            </button>
            <button
              onClick={() => setFilter(ProjectStatus.ABANDONED)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === ProjectStatus.ABANDONED
                  ? 'bg-red-900/50 text-red-300 border border-red-800'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              Abandoned ({projects.filter(p => p.status === ProjectStatus.ABANDONED).length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Sort:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="lastUpdated">Last Updated</option>
              <option value="created">Created</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-cyan-700/50 transition-all duration-200 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-900/10"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">{project.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                <span className="mr-1">{getStatusIcon(project.status)}</span>
                {project.status}
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Started:</span>
                <span>{formatDate(project.startDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Last worked:</span>
                <span>{formatDate(project.lastWorkedDate)} ({getDaysSince(project.lastWorkedDate)} days ago)</span>
              </div>
              {project.causeOfDeath && (
                <div className="flex justify-between">
                  <span>Cause of death:</span>
                  <span className="text-red-400">
                    {project.causeOfDeath.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800 flex gap-2">
              <button className="flex-1 bg-cyan-900/30 hover:bg-cyan-900/50 text-cyan-300 py-2 px-3 rounded-md text-sm font-medium transition-colors border border-cyan-800/50">
                View Details
              </button>
              {project.status === ProjectStatus.ABANDONED && (
                <button className="flex-1 bg-purple-900/30 hover:bg-purple-900/50 text-purple-300 py-2 px-3 rounded-md text-sm font-medium transition-colors border border-purple-800/50">
                  Resurrect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No projects found</p>
          <p className="text-gray-600 text-sm mt-2">Try adjusting your filters or add your first project</p>
        </div>
      )}
    </div>
  );
}
