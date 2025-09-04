import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';
import { User, Settings, Heart, Search, Brain } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { config } = useLocale();
  const [preferences, setPreferences] = useState({
    price_range: [0, 1000000],
    property_types: [] as string[],
    cities: [],
    preferred_styles: [],
    min_rooms: 1,
    min_bedrooms: 1,
    min_bathrooms: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.preferences) {
      setPreferences({ ...preferences, ...user.preferences });
    }
  }, [user]);

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      await updateUser(preferences);
    } catch (error) {
      console.error('Error updating preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h1>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.full_name || user.username}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                Member since {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Preferences */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="h-6 w-6 mr-2 text-blue-600" />
                Preferences
              </h2>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range ({config.currency})
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Min Price</label>
                      <input
                        type="number"
                        value={preferences.price_range[0]}
                        onChange={(e) => handlePreferenceChange('price_range', [
                          parseInt(e.target.value) || 0,
                          preferences.price_range[1]
                        ])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Max Price</label>
                      <input
                        type="number"
                        value={preferences.price_range[1]}
                        onChange={(e) => handlePreferenceChange('price_range', [
                          preferences.price_range[0],
                          parseInt(e.target.value) || 1000000
                        ])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Types */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Types
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['apartment', 'house', 'condo', 'townhouse'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.property_types.includes(type)}
                          onChange={(e) => {
                            const newTypes = e.target.checked
                              ? [...preferences.property_types, type]
                              : preferences.property_types.filter(t => t !== type);
                            handlePreferenceChange('property_types', newTypes);
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Cities
                  </label>
                  <input
                    type="text"
                    placeholder="Enter cities separated by commas"
                    value={preferences.cities.join(', ')}
                    onChange={(e) => handlePreferenceChange('cities', 
                      e.target.value.split(',').map(c => c.trim()).filter(c => c)
                    )}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Room Requirements */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Requirements
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Min Rooms</label>
                      <input
                        type="number"
                        min="1"
                        value={preferences.min_rooms}
                        onChange={(e) => handlePreferenceChange('min_rooms', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Min Bedrooms</label>
                      <input
                        type="number"
                        min="1"
                        value={preferences.min_bedrooms}
                        onChange={(e) => handlePreferenceChange('min_bedrooms', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Min Bathrooms</label>
                      <input
                        type="number"
                        min="1"
                        value={preferences.min_bathrooms}
                        onChange={(e) => handlePreferenceChange('min_bathrooms', parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSavePreferences}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Search className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Searches</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-red-600 mr-2" />
                    <span className="text-sm text-gray-600">Favorites</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="h-4 w-4 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-600">AI Analyses</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">0</span>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
              <p className="text-sm text-gray-600 mb-4">
                Based on your preferences and activity, our AI can provide personalized recommendations.
              </p>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                Get AI Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
