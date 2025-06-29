
import React, { useState } from 'react';
import { X, Heart, MessageCircle, Share2, Clock, ChefHat, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface Recipe {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  image: string;
  likes: number;
  comments: number;
  time: string;
  difficulty: string;
  description: string;
}

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeDetail = ({ recipe, onClose }: RecipeDetailProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(recipe.likes);
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: `You are ${isFollowing ? "no longer following" : "now following"} ${recipe.author}`,
    });
  };

  const handleComment = () => {
    toast({
      title: "Comments",
      description: "Comment functionality coming soon!",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Recipe link copied to clipboard",
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const ingredients = [
    '400g spaghetti pasta',
    '200g pancetta or guanciale',
    '4 large eggs',
    '100g Pecorino Romano cheese',
    'Black pepper to taste',
    'Salt for pasta water'
  ];

  const instructions = [
    'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
    'While pasta cooks, cut pancetta into small cubes and cook in a large skillet until crispy.',
    'In a bowl, whisk together eggs, grated cheese, and black pepper.',
    'Reserve 1 cup of pasta water before draining the spaghetti.',
    'Add hot pasta to the skillet with pancetta and remove from heat.',
    'Quickly stir in the egg mixture, adding pasta water as needed to create a creamy sauce.',
    'Serve immediately with extra cheese and black pepper.'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Recipe Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Recipe Image */}
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-3 right-3 flex space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-black bg-opacity-50 rounded-full px-3 py-1">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">{recipe.time}</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Title and Author */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h1>
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={recipe.authorAvatar} />
                <AvatarFallback>{recipe.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{recipe.author}</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className={`${
                  isFollowing 
                    ? 'border-orange-200 text-orange-600 bg-orange-50' 
                    : 'border-orange-200 text-orange-600'
                }`}
                onClick={handleFollow}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-600">{recipe.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-y border-gray-100 py-4">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-2 group"
            >
              <Heart 
                className={`w-6 h-6 transition-colors group-hover:scale-110 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-500'
                }`}
              />
              <span className={`font-medium ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                {likes}
              </span>
            </button>
            
            <button 
              className="flex items-center space-x-2 group"
              onClick={handleComment}
            >
              <MessageCircle className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="font-medium text-gray-500">{recipe.comments}</span>
            </button>

            <button 
              className="flex items-center space-x-2 group"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
              <span className="font-medium text-gray-500">Share</span>
            </button>
          </div>

          {/* Recipe Details */}
          <div className="space-y-6">
            <div className="flex justify-around bg-orange-50 rounded-lg p-4">
              <div className="text-center">
                <Clock className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-800">{recipe.time}</p>
                <p className="text-xs text-gray-500">Cook Time</p>
              </div>
              <div className="text-center">
                <ChefHat className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-800">{recipe.difficulty}</p>
                <p className="text-xs text-gray-500">Difficulty</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                <p className="text-sm font-medium text-gray-800">4</p>
                <p className="text-xs text-gray-500">Servings</p>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Ingredients</h3>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-gray-700">{ingredient}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Instructions</h3>
              <div className="space-y-4">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
