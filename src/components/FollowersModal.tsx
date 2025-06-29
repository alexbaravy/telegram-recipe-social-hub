
import React, { useState } from 'react';
import { X, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface FollowersModalProps {
  type: 'followers' | 'following';
  onClose: () => void;
}

const FollowersModal = ({ type, onClose }: FollowersModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [followingStates, setFollowingStates] = useState<{[key: number]: boolean}>({});
  const { toast } = useToast();

  const mockUsers = [
    {
      id: 1,
      name: 'Chef Maria',
      username: '@chefmaria',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c78938d8?w=100&h=100&fit=crop&crop=face',
      isFollowing: true
    },
    {
      id: 2,
      name: 'Sarah Green',
      username: '@sarahgreen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      isFollowing: false
    },
    {
      id: 3,
      name: 'Baker Tom',
      username: '@bakertom',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isFollowing: true
    },
    {
      id: 4,
      name: 'Emily Cook',
      username: '@emilycook',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      isFollowing: false
    }
  ];

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollow = (userId: number) => {
    const currentState = followingStates[userId] ?? mockUsers.find(u => u.id === userId)?.isFollowing ?? false;
    setFollowingStates(prev => ({
      ...prev,
      [userId]: !currentState
    }));
    
    toast({
      title: !currentState ? "Following" : "Unfollowed",
      description: `You are ${!currentState ? "now following" : "no longer following"} this user`,
    });
  };

  const isUserFollowing = (userId: number) => {
    return followingStates[userId] ?? mockUsers.find(u => u.id === userId)?.isFollowing ?? false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 capitalize">{type}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder={`Search ${type}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-orange-200 focus:border-orange-300"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="overflow-y-auto max-h-96">
          {filteredUsers.length > 0 ? (
            <div className="p-4 space-y-3">
              {filteredUsers.map(user => (
                <div key={user.id} className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.username}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={`${
                      isUserFollowing(user.id)
                        ? 'border-orange-200 text-orange-600 bg-orange-50' 
                        : 'border-orange-200 text-orange-600'
                    }`}
                    onClick={() => handleFollow(user.id)}
                  >
                    {isUserFollowing(user.id) ? 'Following' : 'Follow'}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Users className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500">
                {searchQuery ? `No users found matching "${searchQuery}"` : `No ${type} yet`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersModal;
