'use client';

import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { ProjectStats } from '@/types';
import { getProjects } from './lib/data';

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);

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
  
  // Calculate real stats from actual projects
  const stats: ProjectStats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    pausedProjects: projects.filter(p => p.status === 'paused').length,
    abandonedProjects: projects.filter(p => p.status === 'abandoned').length,
    averageLifespan: projects.length > 0 ? 
      Math.round(projects.reduce((acc, p) => {
        const days = Math.ceil((new Date().getTime() - p.startDate.getTime()) / (1000 * 60 * 60 * 24));
        return acc + days;
      }, 0) / projects.length) : 0,
    mostCommonCauseOfDeath: null, // TODO: Calculate from abandoned projects
    abandonmentRate: projects.length > 0 ? 
      Math.round((projects.filter(p => p.status === 'abandoned').length / projects.length) * 100) : 0
  };

  return (
    <Dashboard stats={stats} recentProjects={projects.slice(0, 3)} />
  );
}
