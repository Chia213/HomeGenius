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
      {/* Hero Section - Luxury Presence Style */}
      <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 mb-8">
              <Star className="h-4 w-4 mr-2 text-yellow-500" />
              Trusted by 30% of Sweden's Top Real Estate Agents
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              The AI platform to grow your
              <span className="block text-blue-600 dark:text-blue-400">real estate business</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Launch a stunning property platform, attract more leads, and deliver five-star experiences with the modern AI-powered platform top producers rely on to turn prospects into lifelong clients.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/search"
                className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/ai-analysis"
                className="border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors duration-200 text-lg"
              >
                Tour Our Platform
              </Link>
            </div>

            {/* Enhanced Search Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-6xl mx-auto border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Find Your Perfect Property
              </h3>
              
              <form onSubmit={handleSearch} className="space-y-6">
                {/* Main Search Bar */}
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                  <input
                    type="text"
                    placeholder="Search by location, property type, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                {/* Quick Filters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <select className="px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium">
                    <option>Property Type</option>
                    <option>Apartment</option>
                    <option>House</option>
                    <option>Condo</option>
                    <option>Townhouse</option>
                  </select>
                  
                  <select className="px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium">
                    <option>Price Range</option>
                    <option>Under 500k</option>
                    <option>500k - 1M</option>
                    <option>1M - 2M</option>
                    <option>Over 2M</option>
                  </select>
                  
                  <select className="px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-medium">
                    <option>Rooms</option>
                    <option>1+ rooms</option>
                    <option>2+ rooms</option>
                    <option>3+ rooms</option>
                    <option>4+ rooms</option>
                  </select>
                  
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center text-lg"
                  >
                    Search Properties
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>

                {/* Popular Searches */}
                <div className="flex flex-wrap gap-3 justify-center pt-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Popular searches:</span>
                  {['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Västerås'].map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setSearchQuery(city)}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section - Luxury Presence Style */}
      <div className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by Sweden's Top Real Estate Professionals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how leading agents and teams are using HomeGenius to grow their business and deliver exceptional results
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">AM</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Anna Magnusson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">#1 Agent in Stockholm</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                "HomeGenius was the #1 reason for my record-breaking year. My clients are always telling me that they found me from my website. It's very important that you're out there and can be seen."
              </p>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">EL</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Erik Larsson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Top Team in Gothenburg</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                "Success in the luxury market comes down to great branding and marketing. HomeGenius builds some of the best platforms in the industry and is a trusted partner for many top agents."
              </p>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">MN</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Maria Nilsson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">#1 Team in Malmö</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                "Working with HomeGenius was the most seamless experience I've ever had creating a platform, and it offered far more depth for our clients than we've ever had before."
              </p>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                We drive more growth and ROI for our customers
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">$300B</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Transaction volume closed by our customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">40,000</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Active websites managed on our platform</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">2x</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Our clients grow twice as fast as their peers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">4x</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Sales volume of HomeGenius agents vs others</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Luxury Presence Style */}
      <div className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              The growth platform to fuel your real estate success
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Build your brand, scale your business, and amaze your clients with our comprehensive AI-powered platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-800 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Home className="h-12 w-12 text-gray-900 dark:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Build your brand
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Establish a memorable brand that resonates with your ideal clients, showcases your unique value, and sets you apart from the competition.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-800 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <TrendingUp className="h-12 w-12 text-gray-900 dark:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Scale your business
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Accelerate your growth with innovative tools and solutions that generate leads, engage clients, and nurture lasting relationships.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-800 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Star className="h-12 w-12 text-gray-900 dark:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Amaze your clients
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Deliver seamless, elevated experiences that ensure your clients feel valued, informed, and impressed at every interaction.
              </p>
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Smart solutions for agents, teams, and brokerages
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Solo agents</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Make your mark on the market</p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Celebrity agents</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Keep the spotlight on your brand</p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Growing teams</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Accelerate your team's growth</p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Brokerages</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Command your brand at scale</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Properties
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Handpicked premium properties with AI-powered insights
              </p>
            </div>
            <Link
              to="/search"
              className="mt-6 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center"
            >
              View All Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Property Type Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['All', 'Apartments', 'Houses', 'Condos', 'Townhouses'].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  type === 'All' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
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
        <div className="py-20 bg-blue-600 dark:bg-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Property Search Today
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Join thousands of users who found their perfect home with our AI-powered platform
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Create Free Account
              </Link>
              <Link
                to="/search"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
