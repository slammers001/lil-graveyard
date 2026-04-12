'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import AddProjectModal from './AddProjectModal';
import { addProject, getProjects } from '../lib/data';
import { Project } from '@/types';

const navItems = [
  { href: '/projects', label: 'Graveyard', icon: '🪦' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    addProject(projectData);
    setIsModalOpen(false);
    
    // Trigger a storage event to notify other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'lil-graveyard-projects',
      newValue: JSON.stringify(getProjects())
    }));
  };

  return (
    <>
      <nav className="bg-gray-900 border-b border-cyan-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2 text-cyan-400 font-bold text-xl">
                <span>🪦</span>
                <span>Lil' Graveyard</span>
              </Link>
              
              <div className="hidden md:flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'bg-cyan-900/50 text-cyan-300 border border-cyan-800'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors border border-cyan-500 shadow-lg shadow-cyan-600/25"
              >
                Dig New Grave
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AddProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProject}
      />
    </>
  );
}
