'use client';

import { ProjectStats } from '@/types';

interface DashboardProps {
  stats: ProjectStats;
  recentProjects: any[];
}

export default function Dashboard({ stats, recentProjects }: DashboardProps) {
  const statCards = [
    {
      label: 'Total Projects',
      value: stats.totalProjects,
      icon: '📊',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-900/20 border-cyan-800/50'
    },
    {
      label: 'Active',
      value: stats.activeProjects,
      icon: '🟢',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20 border-green-800/50'
    },
    {
      label: 'Paused',
      value: stats.pausedProjects,
      icon: '🟡',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20 border-yellow-800/50'
    },
    {
      label: 'Abandoned',
      value: stats.abandonedProjects,
      icon: '🔴',
      color: 'text-red-400',
      bgColor: 'bg-red-900/20 border-red-800/50'
    }
  ];

  const insightCards = [
    {
      label: 'Average Lifespan',
      value: `${stats.averageLifespan} days`,
      icon: '⏱️',
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20 border-purple-800/50'
    },
    {
      label: 'Abandonment Rate',
      value: `${stats.abandonmentRate}%`,
      icon: '☠️',
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/20 border-orange-800/50'
    },
    {
      label: 'Main Cause of Death',
      value: stats.mostCommonCauseOfDeath ? 
        stats.mostCommonCauseOfDeath.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 
        'N/A',
      icon: '💀',
      color: 'text-pink-400',
      bgColor: 'bg-pink-900/20 border-pink-800/50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">Dashboard</h1>
        <p className="text-gray-400">Track your project graveyard and uncover patterns</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`border rounded-lg p-6 ${stat.bgColor} backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-sm font-medium ${stat.color}`}>{stat.label}</span>
            </div>
            <div className={`text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {insightCards.map((insight, index) => (
          <div
            key={index}
            className={`border rounded-lg p-6 ${insight.bgColor} backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{insight.icon}</span>
              <span className={`text-sm font-medium ${insight.color}`}>{insight.label}</span>
            </div>
            <div className={`text-xl font-bold ${insight.color}`}>
              {insight.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Recent Projects</h2>
        <div className="space-y-3">
          {recentProjects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No projects yet. Start by adding your first project!</p>
          ) : (
            recentProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-cyan-300">{project.name}</h3>
                    <p className="text-sm text-gray-400">{project.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'active' ? 'bg-green-900/50 text-green-300' :
                      project.status === 'paused' ? 'bg-yellow-900/50 text-yellow-300' :
                      'bg-red-900/50 text-red-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
