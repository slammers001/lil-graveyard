import Dashboard from './components/Dashboard';
import { ProjectStats, CauseOfDeath } from '@/types';

// Mock data for development
const mockStats: ProjectStats = {
  totalProjects: 12,
  activeProjects: 3,
  pausedProjects: 2,
  abandonedProjects: 7,
  averageLifespan: 14,
  mostCommonCauseOfDeath: CauseOfDeath.LOST_INTEREST,
  abandonmentRate: 58
};

const mockRecentProjects = [
  {
    id: '1',
    name: 'AI Chatbot',
    description: 'Build a conversational AI assistant',
    status: 'active'
  },
  {
    id: '2',
    name: 'E-commerce Site',
    description: 'Full-stack online store with React',
    status: 'abandoned'
  },
  {
    id: '3',
    name: 'Mobile Game',
    description: 'Simple puzzle game for iOS',
    status: 'paused'
  }
];

export default function Home() {
  return (
    <Dashboard stats={mockStats} recentProjects={mockRecentProjects} />
  );
}
