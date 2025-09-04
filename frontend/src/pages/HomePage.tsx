import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../contexts/PropertyContext';
import { useAuth } from '../contexts/AuthContext';
import { useDarkMode } from '../contexts/DarkModeContext';
import PropertyCard from '../components/PropertyCard';
import { Search, Brain, TrendingUp, Star, ArrowRight, Sparkles, Home, Shield, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  const { featuredProperties, getFeaturedProperties, loading } = useProperties();
  const { user } = useAuth();
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getFeaturedProperties();
  }, [getFeaturedProperties]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-400/10 dark:to-purple-400/10"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-300/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-300/20 rounded-full animate-bounce-slow delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-full text-sm font-medium mb-6 animate-slide-up">
              <Sparkles className="h-4 w-4 mr-2 text-yellow-300" />
              Powered by Advanced AI Technology
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
              Find Your Dream Home with
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent animate-pulse-slow">
                AI Intelligence
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed animate-slide-up">
              Discover properties with AI-powered price predictions, style analysis, and personalized recommendations that understand your unique preferences
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto animate-slide-up">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5 group-focus-within:text-blue-500 transition-colors duration-200" />
                  <input
                    type="text"
                    placeholder="Search for properties, locations, or styles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 dark:text-white bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:focus:ring-blue-400 focus:border-transparent shadow-lg transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-yellow-500 dark:to-orange-500 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold hover:from-yellow-300 hover:to-orange-300 dark:hover:from-yellow-400 dark:hover:to-orange-400 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  Search
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Advanced AI Technology
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of real estate with intelligent analysis and recommendations that revolutionize how you find your perfect home
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Price Prediction
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Get accurate price predictions based on comprehensive market analysis, property features, and real-time market trends
              </p>
            </div>

            <div className="group text-center p-8 bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up delay-100">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Style Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Identify interior and architectural styles from images using cutting-edge computer vision technology and AI
              </p>
            </div>

            <div className="group text-center p-8 bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up delay-200">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Smart Recommendations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Receive personalized property recommendations based on your preferences, behavior, and lifestyle patterns
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
              <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Property Matching</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered matching algorithm</p>
              </div>
            </div>
            <div className="flex items-center p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
              <div className="bg-green-100 dark:bg-green-900/50 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Secure & Reliable</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Bank-level security for all data</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Properties
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Discover our handpicked selection of premium properties
              </p>
            </div>
            <Link
              to="/search"
              className="mt-6 sm:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              View All Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-56 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.slice(0, 6).map((property, index) => (
                <div key={property.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}

          {!loading && featuredProperties.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg">
                <Home className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">No featured properties available at the moment.</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Check back later for new listings!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="py-20 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-400/10 dark:to-purple-400/10"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Find Your Perfect Home?
              </h2>
              <p className="text-xl text-blue-100 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join thousands of users who have found their dream properties with AI assistance. Start your journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/search"
                  className="border-2 border-white text-white px-10 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
