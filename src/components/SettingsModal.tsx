
import React, { useState } from 'react';
import { X, Settings, User, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const [accountType, setAccountType] = useState<'public' | 'private' | 'invitation'>('public');
  const { toast } = useToast();

  const accountOptions = [
    {
      type: 'public' as const,
      title: 'Public Account',
      description: 'Anyone can see your recipes and follow you',
      icon: User
    },
    {
      type: 'private' as const,
      title: 'Private Account',
      description: 'Only approved followers can see your recipes',
      icon: Lock
    },
    {
      type: 'invitation' as const,
      title: 'By Invitation Only',
      description: 'Only people you invite can follow you',
      icon: Users
    }
  ];

  const handleSave = () => {
    toast({
      title: "Settings Updated",
      description: `Account privacy set to ${accountType}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-bold text-gray-800">Settings</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Account Privacy */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-4">Account Privacy</h3>
            <div className="space-y-3">
              {accountOptions.map(({ type, title, description, icon: Icon }) => (
                <div
                  key={type}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    accountType === type 
                      ? 'border-orange-300 bg-orange-50' 
                      : 'border-gray-200 hover:border-orange-200 hover:bg-orange-25'
                  }`}
                  onClick={() => setAccountType(type)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      accountType === type ? 'bg-orange-200' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        accountType === type ? 'text-orange-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-800">{title}</h4>
                        {accountType === type && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-100">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
