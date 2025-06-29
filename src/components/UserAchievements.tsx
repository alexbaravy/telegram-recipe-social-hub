
import React from 'react';
import { Award } from 'lucide-react';

interface Achievement {
  title: string;
  icon: string;
  description: string;
}

const UserAchievements = () => {
  const achievements: Achievement[] = [
    { title: 'Master Chef', icon: '👨‍🍳', description: 'Created 10+ recipes' },
    { title: 'Popular Creator', icon: '⭐', description: '1000+ total likes' },
    { title: 'Community Star', icon: '🌟', description: 'Top 10% creators' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <Award className="w-5 h-5 text-orange-600 mr-2" />
        Achievements
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100">
            <span className="text-2xl">{achievement.icon}</span>
            <div>
              <p className="font-medium text-gray-800">{achievement.title}</p>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAchievements;
