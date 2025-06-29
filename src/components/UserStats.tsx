
import React from 'react';
import { BookOpen, Users } from 'lucide-react';

interface UserStat {
  label: string;
  count: number;
  icon: React.ElementType;
  clickable?: boolean;
  onClick?: () => void;
}

interface UserStatsProps {
  stats: UserStat[];
}

const UserStats = ({ stats }: UserStatsProps) => {
  return (
    <div className="flex space-x-6 mb-4">
      {stats.map(({ label, count, icon: Icon, clickable, onClick }) => (
        <div 
          key={label} 
          className={`text-center ${clickable ? 'cursor-pointer hover:bg-orange-50 p-2 rounded-lg transition-colors' : ''}`}
          onClick={clickable ? onClick : undefined}
        >
          <div className="flex items-center justify-center space-x-1">
            <Icon className="w-4 h-4 text-orange-600" />
            <span className="font-bold text-gray-800">{count}</span>
          </div>
          <span className="text-xs text-gray-500">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
