import React from 'react';
import { BarChart3, Users, Calendar, Trophy } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <ul className="menu p-4 space-y-2">
      <li>
        <button
          className={`${activeTab === 'overview' ? 'active bg-primary text-primary-content' : 'text-neutral hover:bg-base-200'}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 className="w-5 h-5" />
          Overview
        </button>
      </li>
      <li>
        <button
          className={`${activeTab === 'matchmaking' ? 'active bg-primary text-primary-content' : 'text-neutral hover:bg-base-200'}`}
          onClick={() => setActiveTab('matchmaking')}
        >
          <Trophy className="w-5 h-5" />
          Matchmaking
        </button>
      </li>
      <li>
        <button
          className={`${activeTab === 'players' ? 'active bg-primary text-primary-content' : 'text-neutral hover:bg-base-200'}`}
          onClick={() => setActiveTab('players')}
        >
          <Users className="w-5 h-5" />
          Players
        </button>
      </li>
    </ul>
  );
};

export default Sidebar;
