'use client';

import { Project, ProjectStatus, CauseOfDeath, ActivityLog } from '@/types';
import Image from 'next/image';

interface ProjectReportProps {
  project: Project;
  activityLogs: ActivityLog[];
  onClose: () => void;
}

export default function ProjectReport({ project, activityLogs, onClose }: ProjectReportProps) {
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.ACTIVE:
        return 'text-green-400 border-green-800';
      case ProjectStatus.PAUSED:
        return 'text-yellow-400 border-yellow-800';
      case ProjectStatus.ABANDONED:
        return 'text-red-400 border-red-800';
      default:
        return 'text-gray-400 border-gray-800';
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

  const generateEpitaph = () => {
    if (project.status === ProjectStatus.ACTIVE) {
      return "Still breathing, still coding, still hoping...";
    } else if (project.status === ProjectStatus.PAUSED) {
      return "In limbo, waiting for the day motivation returns...";
    } else {
      const epitaphs = [
        "Here lies a good idea that couldn't survive reality.",
        "Another victim of 'I'll finish it tomorrow'.",
        "Started with passion, ended with 'maybe later'.",
        "Rest in peace, sweet code. You deserved better.",
        "Gone but not forgotten (until we run out of disk space).",
        "The road to hell is paved with good intentions and abandoned repos."
      ];
      return epitaphs[Math.floor(Math.random() * epitaphs.length)];
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with grave image */}
        <div className="relative h-48 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-lg">
          <Image
            src="/grave.png"
            alt="Grave"
            fill
            sizes="100vw"
            className="object-cover opacity-60 rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-t-lg"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {project.name}
            </h2>
            <p className="text-gray-300 italic text-lg drop-shadow">
              {generateEpitaph()}
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-black/50 rounded-full p-2"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Project Status */}
          <div className={`border-l-4 ${getStatusColor(project.status)} pl-4 mb-6`}>
            <div className="flex items-center justify-between">
              <span className={`font-semibold ${getStatusColor(project.status)}`}>
                Status: {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              <span className="text-gray-500 text-sm">
                {getDaysSince(project.lastWorkedDate)} days since last activity
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">About This Project</h3>
            <p className="text-gray-300">{project.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
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

          {/* Timeline */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Life Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-green-400 font-medium">Born</p>
                  <p className="text-gray-400 text-sm">{formatDate(project.startDate)}</p>
                </div>
              </div>
              
              {activityLogs.map((log, index) => (
                <div key={log.id} className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                  <div>
                    <p className="text-cyan-300 font-medium">{log.message}</p>
                    <p className="text-gray-500 text-sm">{formatDate(log.createdAt)}</p>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${
                  project.status === ProjectStatus.ACTIVE ? 'bg-green-500 animate-pulse' :
                  project.status === ProjectStatus.PAUSED ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}></div>
                <div>
                  <p className={`font-medium ${
                    project.status === ProjectStatus.ACTIVE ? 'text-green-400' :
                    project.status === ProjectStatus.PAUSED ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {project.status === ProjectStatus.ACTIVE ? 'Still Alive' :
                     project.status === ProjectStatus.PAUSED ? 'Paused' :
                     'Deceased'}
                  </p>
                  <p className="text-gray-500 text-sm">{formatDate(project.lastWorkedDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cause of Death */}
          {project.status === ProjectStatus.ABANDONED && project.causeOfDeath && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
              <h3 className="text-lg font-semibold text-red-400 mb-2">Cause of Death ☠️</h3>
              <p className="text-red-300">
                {project.causeOfDeath.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </p>
              {project.customCauseOfDeath && (
                <p className="text-red-300 mt-2 italic">"{project.customCauseOfDeath}"</p>
              )}
            </div>
          )}

          {/* Notes */}
          {project.notes && (
            <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">Final Words</h3>
              <p className="text-gray-300 italic">"{project.notes}"</p>
            </div>
          )}

          {/* Repository Link */}
          {project.repoLink && (
            <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">Final Resting Place</h3>
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline break-all"
              >
                {project.repoLink}
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-800">
            {project.status === ProjectStatus.ABANDONED && (
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-purple-500">
                🔁 Attempt Resurrection
              </button>
            )}
            
            <button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-cyan-500">
              Edit Epitaph
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Close Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
