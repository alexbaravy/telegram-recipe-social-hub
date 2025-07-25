
import React, { useState } from 'react';
import { X, Camera, Plus, Minus, Link, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CreateRecipeProps {
  onClose: () => void;
}

const CreateRecipe = ({ onClose }: CreateRecipeProps) => {
  const [mode, setMode] = useState<'selection' | 'manual' | 'url'>('selection');
  const [url, setUrl] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const handleUrlSubmit = () => {
    // Here you would typically fetch recipe data from the URL
    console.log('Fetching recipe from URL:', url);
    // For now, just close the modal
    onClose();
  };

  const renderSelectionMode = () => (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-6">How would you like to add your recipe?</h2>
      
      <div className="space-y-3">
        <Button
          onClick={() => setMode('manual')}
          className="w-full p-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-xl flex items-center justify-center space-x-3"
        >
          <Edit className="w-6 h-6" />
          <div className="text-left">
            <div className="font-semibold">Add Recipe Manually</div>
            <div className="text-sm opacity-90">Create your recipe from scratch</div>
          </div>
        </Button>

        <Button
          onClick={() => setMode('url')}
          className="w-full p-6 bg-white border-2 border-orange-200 hover:bg-orange-50 text-gray-800 font-medium rounded-xl flex items-center justify-center space-x-3"
        >
          <Link className="w-6 h-6 text-orange-600" />
          <div className="text-left">
            <div className="font-semibold">Add Recipe by URL</div>
            <div className="text-sm text-gray-600">Import from a recipe website</div>
          </div>
        </Button>
      </div>
    </div>
  );

  const renderUrlMode = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-4 px-4 pt-4">
        <Button variant="ghost" size="sm" onClick={() => setMode('selection')}>
          <X className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-bold text-gray-800">Add Recipe by URL</h2>
      </div>

      <div className="flex-1 px-4 pb-4 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Recipe URL</label>
          <div className="flex space-x-2">
            <Input
              placeholder="https://example.com/recipe..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border-orange-200 focus:border-orange-400"
            />
          </div>
          <p className="text-xs text-gray-500">
            Enter a URL from popular recipe sites like AllRecipes, Food Network, etc.
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50 mt-auto">
        <Button
          onClick={handleUrlSubmit}
          disabled={!url.trim()}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 rounded-full"
        >
          Import Recipe
        </Button>
      </div>
    </div>
  );

  const renderManualMode = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-4 px-4 pt-4">
        <Button variant="ghost" size="sm" onClick={() => setMode('selection')}>
          <X className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-bold text-gray-800">Create Recipe Manually</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Recipe Photo</label>
          <div className="border-2 border-dashed border-orange-200 rounded-lg p-8 text-center bg-orange-50">
            <Camera className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Tap to add a photo</p>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Recipe Title</label>
            <Input placeholder="Enter recipe name..." className="border-orange-200 focus:border-orange-400" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
            <Textarea 
              placeholder="Tell us about your recipe..." 
              className="border-orange-200 focus:border-orange-400 min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Cooking Time</label>
              <Input placeholder="30 mins" className="border-orange-200 focus:border-orange-400" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Difficulty</label>
              <Select>
                <SelectTrigger className="border-orange-200 focus:border-orange-400">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Ingredients</label>
            <Button variant="ghost" size="sm" onClick={addIngredient} className="text-orange-600">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder="1 cup flour..."
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                className="border-orange-200 focus:border-orange-400"
              />
              {ingredients.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 hover:bg-red-50"
                >
                  <Minus className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Cooking Steps */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Cooking Steps</label>
            <Button variant="ghost" size="sm" onClick={addStep} className="text-orange-600">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-xs font-medium text-orange-600 bg-orange-100 w-6 h-6 rounded-full flex items-center justify-center mt-2 flex-shrink-0">
                {index + 1}
              </span>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Describe this step..."
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                  className="border-orange-200 focus:border-orange-400 min-h-[60px]"
                />
                {steps.length > 1 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeStep(index)}
                    className="text-red-500 hover:bg-red-50 w-full"
                  >
                    <Minus className="w-4 h-4 mr-1" />
                    Remove Step
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 mt-auto">
        <Button 
          onClick={onClose}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-3 rounded-full"
        >
          Share Recipe
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md h-[85vh] max-h-[600px] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">
            {mode === 'selection' ? 'Create Recipe' : mode === 'manual' ? 'Manual Recipe' : 'Import Recipe'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {mode === 'selection' && renderSelectionMode()}
          {mode === 'url' && renderUrlMode()}
          {mode === 'manual' && renderManualMode()}
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
