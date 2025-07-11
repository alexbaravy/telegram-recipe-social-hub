
import React from 'react';
import { Settings, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  profileData: {
    name: string;
    bio: string;
    avatar: string;
    followers?: number;
    following?: number;
  };
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
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profileData.avatar} />
            <AvatarFallback className="text-xl font-semibold bg-orange-100 text-orange-600">
              {profileData.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
            <p className="text-gray-600 mt-1">{profileData.bio}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEditProfile}
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSettings}
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="flex space-x-6 pt-4 border-t border-gray-100">
        <button 
          onClick={onFollowersClick}
          className="text-center hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors"
        >
          <div className="text-xl font-bold text-gray-800">{profileData.followers || 1250}</div>
          <div className="text-sm text-gray-500">Followers</div>
        </button>
        
        <button 
          onClick={onFollowingClick}
          className="text-center hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors"
        >
          <div className="text-xl font-bold text-gray-800">{profileData.following || 340}</div>
          <div className="text-sm text-gray-500">Following</div>
        </button>
        
        <div className="text-center">
          <div className="text-xl font-bold text-gray-800">12</div>
          <div className="text-sm text-gray-500">Recipes</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
