import { Project, ProjectStatus, ActivityLog, CauseOfDeath } from '@/types';

// Local storage keys
const STORAGE_KEYS = {
  PROJECTS: 'lil-graveyard-projects',
  ACTIVITY_LOGS: 'lil-graveyard-activity-logs'
};

// Get projects from localStorage
export const getProjects = (): Project[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  if (!stored) return [];
  
  try {
    const projects = JSON.parse(stored);
    return projects.map((p: any) => ({
      ...p,
      startDate: new Date(p.startDate),
      lastWorkedDate: new Date(p.lastWorkedDate),
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt)
    }));
  } catch {
    return [];
  }
};

// Save projects to localStorage
export const saveProjects = (projects: Project[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
};

// Get activity logs for a project
export const getActivityLogs = (projectId: string): ActivityLog[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
  if (!stored) return [];
  
  try {
    const logs = JSON.parse(stored);
    return logs
      .filter((log: any) => log.projectId === projectId)
      .map((log: any) => ({
        ...log,
        createdAt: new Date(log.createdAt)
      }));
  } catch {
    return [];
  }
};

// Save activity log
export const saveActivityLog = (log: Omit<ActivityLog, 'id' | 'createdAt'>): void => {
  if (typeof window === 'undefined') return;
  
  const stored = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
  const logs = stored ? JSON.parse(stored) : [];
  
  const newLog: ActivityLog = {
    ...log,
    id: Date.now().toString(),
    createdAt: new Date()
  };
  
  logs.push(newLog);
  localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(logs));
};

// Add new project
export const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const projects = getProjects();
  projects.push(newProject);
  saveProjects(projects);
  
  // Add initial activity log
  saveActivityLog({
    projectId: newProject.id,
    message: `Created project: ${newProject.name}`
  });
  
  return newProject;
};

// Update project
export const updateProject = (id: string, updates: Partial<Project>): Project | null => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  const updatedProject = {
    ...projects[index],
    ...updates,
    updatedAt: new Date()
  };
  
  projects[index] = updatedProject;
  saveProjects(projects);
  
  return updatedProject;
};

// Delete project
export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  
  if (filtered.length === projects.length) return false;
  
  saveProjects(filtered);
  return true;
};
