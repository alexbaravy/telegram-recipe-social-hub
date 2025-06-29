
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileHeader from './ProfileHeader';
import UserAchievements from './UserAchievements';
import RecipeFilters from './RecipeFilters';
import RecipeGrid from './RecipeGrid';
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

  return (
    <div className="space-y-6">
      <ProfileHeader 
        profileData={profileData}
        onEditProfile={() => setShowProfileEdit(true)}
        onSettings={() => setShowSettingsModal(true)}
        onFollowersClick={() => setShowFollowersModal('followers')}
        onFollowingClick={() => setShowFollowersModal('following')}
      />

      <UserAchievements />

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
            <RecipeFilters 
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
            />

            <RecipeGrid 
              recipes={filteredRecipes}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              categories={categories}
              onRecipeClick={setSelectedRecipe}
            />
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
