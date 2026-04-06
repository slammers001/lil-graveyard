// Core data types for Lil' Graveyard

export enum ProjectStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  ABANDONED = 'abandoned'
}

export enum CauseOfDeath {
  LOST_INTEREST = 'lost_interest',
  TOO_COMPLEX = 'too_complex',
  STARTED_SOMETHING_NEW = 'started_something_new',
  BURNOUT = 'burnout',
  POOR_PLANNING = 'poor_planning',
  OTHER = 'other'
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  startDate: Date;
  lastWorkedDate: Date;
  causeOfDeath?: CauseOfDeath;
  customCauseOfDeath?: string;
  repoLink?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityLog {
  id: string;
  projectId: string;
  message: string;
  createdAt: Date;
}

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  pausedProjects: number;
  abandonedProjects: number;
  averageLifespan: number;
  mostCommonCauseOfDeath: CauseOfDeath | null;
  abandonmentRate: number;
}

export interface DashboardData {
  stats: ProjectStats;
  recentProjects: Project[];
  projectsByStatus: Record<ProjectStatus, number>;
  projectsByTag: Record<string, number>;
}

export interface ResurrectionSuggestion {
  projectId: string;
  suggestion: string;
  generatedAt: Date;
}

export type SortOption = 'lastUpdated' | 'created' | 'name';
export type FilterOption = ProjectStatus | 'all';
export type TagFilter = string[];
