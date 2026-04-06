'use client';

import { useState } from 'react';
import { Project, ProjectStatus, CauseOfDeath } from '@/types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export default function AddProjectModal({ isOpen, onClose, onSubmit }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    status: ProjectStatus.ACTIVE,
    startDate: new Date().toISOString().split('T')[0],
    lastWorkedDate: new Date().toISOString().split('T')[0],
    repoLink: '',
    notes: '',
    causeOfDeath: undefined as CauseOfDeath | undefined,
    customCauseOfDeath: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.status === ProjectStatus.ABANDONED && !formData.causeOfDeath) {
      newErrors.causeOfDeath = 'Cause of death is required for abandoned projects';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const projectData = {
      name: formData.name,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      status: formData.status,
      startDate: new Date(formData.startDate),
      lastWorkedDate: new Date(formData.lastWorkedDate),
      repoLink: formData.repoLink || undefined,
      notes: formData.notes || undefined,
      causeOfDeath: formData.causeOfDeath,
      customCauseOfDeath: formData.customCauseOfDeath || undefined
    };

    onSubmit(projectData);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      tags: '',
      status: ProjectStatus.ACTIVE,
      startDate: new Date().toISOString().split('T')[0],
      lastWorkedDate: new Date().toISOString().split('T')[0],
      repoLink: '',
      notes: '',
      causeOfDeath: undefined,
      customCauseOfDeath: ''
    });
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cyan-400">Add New Project</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="My Awesome Project"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-700'
                }`}
                placeholder="What is this project about?"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">{errors.description}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="web, AI, frontend (comma separated)"
              />
              <p className="mt-1 text-xs text-gray-500">Separate tags with commas</p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value={ProjectStatus.ACTIVE}>🟢 Active</option>
                <option value={ProjectStatus.PAUSED}>🟡 Paused</option>
                <option value={ProjectStatus.ABANDONED}>🔴 Abandoned</option>
              </select>
            </div>

            {/* Cause of Death (for abandoned projects) */}
            {formData.status === ProjectStatus.ABANDONED && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cause of Death *
                </label>
                <select
                  value={formData.causeOfDeath || ''}
                  onChange={(e) => handleInputChange('causeOfDeath', e.target.value)}
                  className={`w-full px-3 py-2 bg-gray-800 border rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    errors.causeOfDeath ? 'border-red-500' : 'border-gray-700'
                  }`}
                >
                  <option value="">Select a cause...</option>
                  <option value={CauseOfDeath.LOST_INTEREST}>Lost Interest</option>
                  <option value={CauseOfDeath.TOO_COMPLEX}>Too Complex</option>
                  <option value={CauseOfDeath.STARTED_SOMETHING_NEW}>Started Something New</option>
                  <option value={CauseOfDeath.BURNOUT}>Burnout</option>
                  <option value={CauseOfDeath.POOR_PLANNING}>Poor Planning</option>
                  <option value={CauseOfDeath.OTHER}>Other</option>
                </select>
                {errors.causeOfDeath && (
                  <p className="mt-1 text-sm text-red-400">{errors.causeOfDeath}</p>
                )}
              </div>
            )}

            {/* Custom Cause of Death */}
            {formData.status === ProjectStatus.ABANDONED && formData.causeOfDeath === CauseOfDeath.OTHER && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Custom Cause of Death
                </label>
                <input
                  type="text"
                  value={formData.customCauseOfDeath}
                  onChange={(e) => handleInputChange('customCauseOfDeath', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Explain why this project was abandoned"
                />
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Worked Date
                </label>
                <input
                  type="date"
                  value={formData.lastWorkedDate}
                  onChange={(e) => handleInputChange('lastWorkedDate', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Repository Link */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Repository Link (Optional)
              </label>
              <input
                type="url"
                value={formData.repoLink}
                onChange={(e) => handleInputChange('repoLink', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="https://github.com/username/project"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Any additional notes about this project..."
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-800">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md font-medium transition-colors border border-cyan-500 shadow-lg shadow-cyan-600/25"
              >
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
