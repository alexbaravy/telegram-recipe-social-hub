
import React from 'react';
import { Edit, Settings, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import UserStats from './UserStats';

interface ProfileData {
  name: string;
  bio: string;
  avatar: string;
}

interface ProfileHeaderProps {
  profileData: ProfileData;
  onEditProfile: () => void;
  onSettings: () => void;
  onFollowersClick: () => void;
  onFollowingClick: () => void;
}

const ProfileHeader = ({ 
  profileData, 
  onEditProfile, 
  onSettings, 
  onFollowersClick, 
  onFollowingClick 
}: ProfileHeaderProps) => {
  const userStats = [
    { label: 'Recipes', count: 24, icon: require('lucide-react').BookOpen },
    { label: 'Followers', count: 1234, icon: require('lucide-react').Users, clickable: true, onClick: onFollowersClick },
    { label: 'Following', count: 89, icon: require('lucide-react').Users, clickable: true, onClick: onFollowingClick },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
      <div className="flex items-start space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={profileData.avatar} />
          <AvatarFallback>YU</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800">{profileData.name}</h2>
          <p className="text-gray-600 text-sm mb-3">{profileData.bio}</p>
          
          <UserStats stats={userStats} />

          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
              onClick={onEditProfile}
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" className="border-orange-200 text-orange-600">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-orange-200 text-orange-600"
              onClick={onSettings}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
