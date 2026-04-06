'use client';

import { useState, useEffect } from 'react';
import { Project, ProjectStatus, SortOption, FilterOption, ActivityLog } from '@/types';
import Graveyard from '../components/Graveyard';
import ProjectReport from '../components/ProjectReport';
import { getProjects, getActivityLogs } from '../lib/data';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Load projects on mount and when localStorage changes
  useEffect(() => {
    const loadProjects = () => {
      const updatedProjects = getProjects();
      setProjects(updatedProjects);
    };

    loadProjects();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'lil-graveyard-projects') {
        loadProjects();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for local changes
    const interval = setInterval(loadProjects, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleGraveClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseReport = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Graveyard 
        projects={projects} 
        onGraveClick={handleGraveClick}
      />
      
      {selectedProject && (
        <ProjectReport
          project={selectedProject}
          activityLogs={getActivityLogs(selectedProject.id)}
          onClose={handleCloseReport}
        />
      )}
    </>
  );
}
