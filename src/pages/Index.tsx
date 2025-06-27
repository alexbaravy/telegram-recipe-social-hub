
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, Search, User, Home, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import RecipeCard from '@/components/RecipeCard';
import CreateRecipe from '@/components/CreateRecipe';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showCreateRecipe, setShowCreateRecipe] = useState(false);

  const mockRecipes = [
    {
      id: 1,
      title: "Creamy Carbonara Pasta",
      author: "Chef Maria",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616c78938d8?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
      likes: 234,
      comments: 18,
      time: "25 mins",
      difficulty: "Easy",
      description: "Rich and creamy carbonara with authentic Italian flavors. Perfect for a cozy dinner!"
    },
    {
      id: 2,
      title: "Mediterranean Buddha Bowl",
      author: "Sarah Green",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      likes: 189,
      comments: 12,
      time: "15 mins",
      difficulty: "Easy",
      description: "Healthy and colorful bowl packed with Mediterranean flavors and fresh ingredients."
    },
    {
      id: 3,
      title: "Chocolate Lava Cake",
      author: "Baker Tom",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      likes: 456,
      comments: 32,
      time: "30 mins",
      difficulty: "Medium",
      description: "Decadent chocolate dessert with a molten center. Pure indulgence!"
    }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'profile':
        return <UserProfile />;
      case 'recipes':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">My Recipes</h2>
            <div className="grid gap-4">
              {mockRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        );
      case 'following':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Following</h2>
            <div className="space-y-3">
              {mockRecipes.map(recipe => (
                <div key={recipe.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={recipe.authorAvatar} />
                    <AvatarFallback>{recipe.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{recipe.author}</p>
                    <p className="text-sm text-gray-500">Active 2h ago</p>
                  </div>
                  <Button variant="outline" size="sm">Following</Button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search recipes, ingredients..." 
                className="pl-10 py-3 rounded-full border-2 border-orange-100 focus:border-orange-300"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {['All', 'Italian', 'Asian', 'Desserts', 'Healthy', 'Quick'].map(category => (
                <Button
                  key={category}
                  variant={category === 'All' ? 'default' : 'outline'}
                  size="sm"
                  className={`whitespace-nowrap rounded-full ${
                    category === 'All' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                      : 'border-orange-200 text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Recipe Feed */}
            <div className="space-y-6">
              {mockRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            CookShare
          </h1>
          <Avatar className="w-8 h-8 cursor-pointer" onClick={() => setCurrentView('profile')}>
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {renderContent()}
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={() => setShowCreateRecipe(true)}
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <Plus className="w-6 h-6 text-white" />
      </Button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-100 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            {[
              { icon: Home, label: 'Home', view: 'home' },
              { icon: BookOpen, label: 'Recipes', view: 'recipes' },
              { icon: Users, label: 'Following', view: 'following' },
              { icon: User, label: 'Profile', view: 'profile' }
            ].map(({ icon: Icon, label, view }) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  currentView === view 
                    ? 'text-orange-600 bg-orange-50' 
                    : 'text-gray-500 hover:text-orange-500'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Create Recipe Modal */}
      {showCreateRecipe && (
        <CreateRecipe onClose={() => setShowCreateRecipe(false)} />
      )}
    </div>
  );
};

export default Index;
