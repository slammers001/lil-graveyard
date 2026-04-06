'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Project, ProjectStatus, CauseOfDeath, ActivityLog } from '@/types';

// Mock data for development
const mockProject: Project = {
  id: '1',
  name: 'AI Chatbot',
  description: 'Build a conversational AI assistant with natural language processing capabilities. The goal is to create an intelligent chatbot that can understand context, maintain conversation history, and provide helpful responses.',
  tags: ['AI', 'web', 'frontend', 'machine-learning'],
  status: ProjectStatus.ACTIVE,
  startDate: new Date('2024-03-15'),
  lastWorkedDate: new Date('2024-04-01'),
  repoLink: 'https://github.com/example/ai-chatbot',
  notes: 'Working on the conversation flow and improving response accuracy. Need to implement better context management.',
  createdAt: new Date('2024-03-15'),
  updatedAt: new Date('2024-04-01')
};

const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    projectId: '1',
    message: 'Set up basic project structure with Next.js',
    createdAt: new Date('2024-03-15')
  },
  {
    id: '2',
    projectId: '1',
    message: 'Implemented initial chat interface',
    createdAt: new Date('2024-03-18')
  },
  {
    id: '3',
    projectId: '1',
    message: 'Added API integration for OpenAI',
    createdAt: new Date('2024-03-22')
  },
  {
    id: '4',
    projectId: '1',
    message: 'Fixed message history persistence',
    createdAt: new Date('2024-03-25')
  },
  {
    id: '5',
    projectId: '1',
    message: 'Improved error handling and loading states',
    createdAt: new Date('2024-04-01')
  }
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project] = useState<Project>(mockProject);
  const [activityLogs] = useState<ActivityLog[]>(mockActivityLogs);

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
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getDaysSince = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const generateResurrectionSuggestion = () => {
    const suggestions = [
      'Set up basic project structure',
      'Create a simple "Hello World" implementation',
      'Write down the core requirements',
      'Build the main feature first',
      'Set up version control',
      'Create a basic UI mockup'
    ];
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
      >
        ← Back to Projects
      </button>

      {/* Project Header */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-6 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-cyan-400 mb-2">{project.name}</h1>
            <p className="text-gray-300 text-lg mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-md border border-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
            <span className="mr-2">{getStatusIcon(project.status)}</span>
            {project.status}
          </div>
        </div>

        {/* Project Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="text-gray-400 mb-1">Started</div>
            <div className="text-gray-200">{formatDate(project.startDate)}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="text-gray-400 mb-1">Last Worked</div>
            <div className="text-gray-200">{formatDate(project.lastWorkedDate)}</div>
            <div className="text-gray-500 text-xs mt-1">{getDaysSince(project.lastWorkedDate)} days ago</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="text-gray-400 mb-1">Project Age</div>
            <div className="text-gray-200">{getDaysSince(project.startDate)} days</div>
          </div>
          {project.repoLink && (
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
              <div className="text-gray-400 mb-1">Repository</div>
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 text-xs break-all"
              >
                {project.repoLink}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Cause of Death (for abandoned projects) */}
      {project.status === ProjectStatus.ABANDONED && project.causeOfDeath && (
        <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-6 mb-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Cause of Death ☠️</h2>
          <p className="text-red-300">
            {project.causeOfDeath.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </p>
          {project.customCauseOfDeath && (
            <p className="text-red-300 mt-2">{project.customCauseOfDeath}</p>
          )}
        </div>
      )}

      {/* Notes */}
      {project.notes && (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-cyan-400 mb-2">Notes</h2>
          <p className="text-gray-300">{project.notes}</p>
        </div>
      )}

      {/* Activity Timeline */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-6 backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">Activity Timeline</h2>
        <div className="space-y-4">
          {activityLogs.map((log, index) => (
            <div key={log.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                {index < activityLogs.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-700 mt-1"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-200 mb-2">{log.message}</p>
                  <p className="text-gray-500 text-xs">{formatDate(log.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        {project.status === ProjectStatus.ABANDONED && (
          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-purple-500 shadow-lg shadow-purple-600/25">
            🔁 Resurrect Project
          </button>
        )}
        
        <button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-cyan-500 shadow-lg shadow-cyan-600/25">
          Edit Project
        </button>
        
        <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-red-500 shadow-lg shadow-red-600/25">
          Delete
        </button>
      </div>

      {/* Resurrection Suggestion (for abandoned projects) */}
      {project.status === ProjectStatus.ABANDONED && (
        <div className="mt-6 bg-purple-900/20 border border-purple-800/50 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">Resurrection Mode 🔁</h3>
          <p className="text-purple-300 mb-4">Here's a small next step to get started again:</p>
          <div className="bg-purple-800/30 border border-purple-700/50 rounded-lg p-4">
            <p className="text-purple-200 font-medium">{generateResurrectionSuggestion()}</p>
          </div>
          <p className="text-purple-400 text-sm mt-4">Remember: Start small. One step at a time.</p>
        </div>
      )}
    </div>
  );
}
