'use client';

import { useState } from 'react';
import { Project, ProjectStatus, SortOption, FilterOption } from '@/types';
import Image from 'next/image';

interface GraveyardProps {
  projects: Project[];
  onGraveClick: (project: Project) => void;
}

export default function Graveyard({ projects, onGraveClick }: GraveyardProps) {
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

  const getGraveStatus = (project: Project) => {
    switch (project.status) {
      case ProjectStatus.ACTIVE:
        return { border: 'border-green-600', glow: 'shadow-green-600/30', label: 'Still Breathing' };
      case ProjectStatus.PAUSED:
        return { border: 'border-yellow-600', glow: 'shadow-yellow-600/30', label: 'In Limbo' };
      case ProjectStatus.ABANDONED:
        return { border: 'border-gray-600', glow: 'shadow-gray-600/30', label: 'RIP' };
      default:
        return { border: 'border-gray-600', glow: 'shadow-gray-600/30', label: 'Unknown' };
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
        <h1 className="text-4xl font-bold text-cyan-400 mb-2">The Digital Boneyard</h1>
        <p className="text-gray-400 text-lg">Where good code goes to die. Click any grave to read its epitaph.</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-8 backdrop-blur-sm">
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
              All Souls ({projects.length})
            </button>
            <button
              onClick={() => setFilter(ProjectStatus.ACTIVE)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === ProjectStatus.ACTIVE
                  ? 'bg-green-900/50 text-green-300 border border-green-800'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              Still Breathing ({projects.filter(p => p.status === ProjectStatus.ACTIVE).length})
            </button>
            <button
              onClick={() => setFilter(ProjectStatus.PAUSED)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === ProjectStatus.PAUSED
                  ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-800'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              In Limbo ({projects.filter(p => p.status === ProjectStatus.PAUSED).length})
            </button>
            <button
              onClick={() => setFilter(ProjectStatus.ABANDONED)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === ProjectStatus.ABANDONED
                  ? 'bg-red-900/50 text-red-300 border border-red-800'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              RIP ({projects.filter(p => p.status === ProjectStatus.ABANDONED).length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Sort by:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="lastUpdated">Recent Departures</option>
              <option value="created">Ancient History</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Graveyard Grid */}
      {sortedProjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🪦</div>
          <p className="text-gray-500 text-xl mb-2">The graveyard is empty</p>
          <p className="text-gray-600">Every graveyard starts somewhere. Time to dig your first grave.</p>
        </div>
      ) : (
        <div className="relative bg-gradient-to-b from-gray-900/30 to-gray-800/50 rounded-lg p-8 border border-gray-800 backdrop-blur-sm">
          {/* Ground texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-50 rounded-lg"></div>
          
          {/* Graves */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProjects.map((project, index) => {
              const graveStatus = getGraveStatus(project);
              return (
                <div
                  key={project.id}
                  className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => onGraveClick(project)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Grave stone */}
                  <div className={`relative border-2 ${graveStatus.border} rounded-lg overflow-hidden shadow-lg ${graveStatus.glow} transition-all duration-300 hover:shadow-xl`}>
                    <div className="relative h-48 bg-gradient-to-b from-gray-700 to-gray-800">
                      <Image
                        src="/grave.png"
                        alt="Grave"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      
                      {/* Epitaph (Project Name) */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                        <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg">
                          {project.name}
                        </h3>
                        <p className="text-gray-300 text-sm italic drop-shadow">
                          {project.status === ProjectStatus.ABANDONED ? 'RIP' : 
                           project.status === ProjectStatus.PAUSED ? '...' : 'Still coding'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover info */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    <p className="text-xs text-gray-300">
                      {project.description.length > 30 ? 
                        project.description.substring(0, 30) + '...' : 
                        project.description}
                    </p>
                  </div>
                  
                  {/* Dates on the grave */}
                  <div className="absolute top-2 left-2 text-xs text-gray-400">
                    <div>{formatDate(project.startDate)}</div>
                    {project.status === ProjectStatus.ABANDONED && (
                      <div className="text-red-400">-{formatDate(project.lastWorkedDate)}</div>
                    )}
                  </div>
                  
                  {/* Status indicator */}
                  <div className="absolute top-2 right-2">
                    <div className={`w-3 h-3 rounded-full ${
                      project.status === ProjectStatus.ACTIVE ? 'bg-green-500 animate-pulse' :
                      project.status === ProjectStatus.PAUSED ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}></div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      )}
    </div>
  );
}
