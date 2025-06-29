import React, { useState } from 'react';
import { Edit, Settings, Share2, Award, Users, BookOpen, Search, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileEdit from './ProfileEdit';
import RecipeDetail from './RecipeDetail';
import FollowersModal from './FollowersModal';
import SettingsModal from './SettingsModal';

const UserProfile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showFollowersModal, setShowFollowersModal] = useState<'followers' | 'following' | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Your Name',
    bio: 'Passionate home cook sharing delicious recipes 🍳',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });

  const userStats = [
    { label: 'Recipes', count: 24, icon: BookOpen },
    { label: 'Followers', count: 1234, icon: Users, clickable: true, onClick: () => setShowFollowersModal('followers') },
    { label: 'Following', count: 89, icon: Users, clickable: true, onClick: () => setShowFollowersModal('following') },
  ];

  const achievements = [
    { title: 'Master Chef', icon: '👨‍🍳', description: 'Created 10+ recipes' },
    { title: 'Popular Creator', icon: '⭐', description: '1000+ total likes' },
    { title: 'Community Star', icon: '🌟', description: 'Top 10% creators' },
  ];

  const categories = [
    { id: 'all', name: 'All Recipes' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'dessert', name: 'Dessert' },
    { id: 'snack', name: 'Snacks' },
  ];

  const recentRecipes = [
    {
      id: 1,
      title: "Creamy Carbonara",
      author: "Your Name",
      authorAvatar: profileData.avatar,
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=150&h=150&fit=crop",
      likes: 234,
      comments: 18,
      time: "25 mins",
      difficulty: "Easy",
      description: "Rich and creamy carbonara with authentic Italian flavors. Perfect for a cozy dinner!",
      category: 'dinner'
    },
    {
      id: 2,
      title: "Buddha Bowl",
      author: "Your Name",  
      authorAvatar: profileData.avatar,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=150&fit=crop",
      likes: 189,
      comments: 12,
      time: "15 mins",
      difficulty: "Easy",
      description: "Healthy and colorful bowl packed with Mediterranean flavors and fresh ingredients.",
      category: 'lunch'
    },
    {
      id: 3,
      title: "Chocolate Cake",
      author: "Your Name",
      authorAvatar: profileData.avatar,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&h=150&fit=crop",
      likes: 456,
      comments: 32,
      time: "30 mins",
      difficulty: "Medium",
      description: "Decadent chocolate dessert with a molten center. Pure indulgence!",
      category: 'dessert'
    }
  ];

  const filteredRecipes = recentRecipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProfileSave = (newProfileData) => {
    setProfileData(newProfileData);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100">
        <div className="flex items-start space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={profileData.avatar} />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">{profileData.name}</h2>
            <p className="text-gray-600 text-sm mb-3">{profileData.bio}</p>
            
            {/* Stats */}
            <div className="flex space-x-6 mb-4">
              {userStats.map(({ label, count, icon: Icon, clickable, onClick }) => (
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

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                onClick={() => setShowProfileEdit(true)}
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
                onClick={() => setShowSettingsModal(true)}
              >
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
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search your recipes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'border-orange-200 text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Recipes Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredRecipes.map(recipe => (
                <div key={recipe.id} className="relative group cursor-pointer" onClick={() => handleRecipeClick(recipe)}>
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-sm font-medium truncate">{recipe.title}</p>
                    <p className="text-white text-xs opacity-90">{recipe.likes} likes</p>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredRecipes.length === 0 && (searchQuery || selectedCategory !== 'all') && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {searchQuery 
                    ? `No recipes found matching "${searchQuery}"${selectedCategory !== 'all' ? ` in ${categories.find(c => c.id === selectedCategory)?.name}` : ''}`
                    : `No recipes found in ${categories.find(c => c.id === selectedCategory)?.name}`
                  }
                </p>
              </div>
            )}
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

      {/* Modals */}
      {showProfileEdit && (
        <ProfileEdit 
          onClose={() => setShowProfileEdit(false)}
          onSave={handleProfileSave}
        />
      )}

      {selectedRecipe && (
        <RecipeDetail 
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {showFollowersModal && (
        <FollowersModal 
          type={showFollowersModal}
          onClose={() => setShowFollowersModal(null)}
        />
      )}

      {showSettingsModal && (
        <SettingsModal onClose={() => setShowSettingsModal(false)} />
      )}
    </div>
  );
};

export default UserProfile;
