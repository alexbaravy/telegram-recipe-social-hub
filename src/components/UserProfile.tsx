
import React from 'react';
import { Edit, Settings, Share2, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserProfile = () => {
  const userStats = [
    { label: 'Recipes', count: 24, icon: BookOpen },
    { label: 'Followers', count: 1234, icon: Users },
    { label: 'Following', count: 89, icon: Users },
  ];

  const achievements = [
    { title: 'Master Chef', icon: '👨‍🍳', description: 'Created 10+ recipes' },
    { title: 'Popular Creator', icon: '⭐', description: '1000+ total likes' },
    { title: 'Community Star', icon: '🌟', description: 'Top 10% creators' },
  ];

  const recentRecipes = [
    {
      id: 1,
      title: "Creamy Carbonara",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=150&h=150&fit=crop",
      likes: 234
    },
    {
      id: 2,
      title: "Buddha Bowl",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=150&fit=crop",
      likes: 189
    },
    {
      id: 3,
      title: "Chocolate Cake",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&h=150&fit=crop",
      likes: 456
    }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
        <div className="flex items-start space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">Your Name</h2>
            <p className="text-gray-600 text-sm mb-3">Passionate home cook sharing delicious recipes 🍳</p>
            
            {/* Stats */}
            <div className="flex space-x-6 mb-4">
              {userStats.map(({ label, count, icon: Icon }) => (
                <div key={label} className="text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Icon className="w-4 h-4 text-orange-600" />
                    <span className="font-bold text-gray-800">{count}</span>
                  </div>
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <Edit className="w-4 h-4 mr-1" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-600">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-600">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
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

      {/* Content Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
        <Tabs defaultValue="recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-orange-50 border-b border-orange-100">
            <TabsTrigger value="recipes" className="data-[state=active]:bg-white data-[state=active]:text-orange-600">
              My Recipes
            </TabsTrigger>
            <TabsTrigger value="liked" className="data-[state=active]:bg-white data-[state=active]:text-orange-600">
              Liked
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-white data-[state=active]:text-orange-600">
              Saved
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recipes" className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {recentRecipes.map(recipe => (
                <div key={recipe.id} className="relative group cursor-pointer">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-medium truncate">{recipe.title}</p>
                    <p className="text-white text-xs opacity-90">{recipe.likes} likes</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="liked" className="p-4">
            <div className="text-center py-8">
              <p className="text-gray-500">Your liked recipes will appear here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="p-4">
            <div className="text-center py-8">
              <p className="text-gray-500">Your saved recipes will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
