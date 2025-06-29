
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Clock, ChefHat, ExternalLink } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

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

interface RecipeCardProps {
  recipe: Recipe;
  onRecipeClick?: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onRecipeClick }: RecipeCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(recipe.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleCardClick = () => {
    if (onRecipeClick) {
      onRecipeClick(recipe);
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

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Author Header */}
      <div className="flex items-center space-x-3 p-4 pb-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={recipe.authorAvatar} />
          <AvatarFallback>{recipe.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{recipe.author}</p>
          <p className="text-sm text-gray-500">2 hours ago</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-orange-600 hover:bg-orange-50"
          onClick={(e) => e.stopPropagation()}
        >
          Follow
        </Button>
      </div>

      {/* Recipe Image */}
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
          <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-200" />
        </div>
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

      {/* Recipe Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{recipe.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1 group"
            >
              <Heart 
                className={`w-6 h-6 transition-colors group-hover:scale-110 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-500'
                }`}
              />
              <span className={`text-sm font-medium ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                {likes}
              </span>
            </button>
            
            <button 
              className="flex items-center space-x-1 group"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm font-medium text-gray-500">{recipe.comments}</span>
            </button>
          </div>

          <button 
            className="flex items-center space-x-1 group"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
