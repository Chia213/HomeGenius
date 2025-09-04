import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types/index';
import { MapPin, Bed, Bath, Square, Star } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext';
import { formatPrice, formatArea, getLocalizedText } from '../utils/localization';

interface PropertyCardProps {
  property: Property;
  showAI?: boolean;
  aiAnalysis?: any;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, showAI = false, aiAnalysis }) => {
  const { currentLocale } = useLocale();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Property Image */}
      <div className="relative h-56 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            <Square className="h-12 w-12" />
          </div>
        )}
        
        {/* AI Analysis Badge */}
        {showAI && aiAnalysis && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
            AI Analyzed
          </div>
        )}
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {property.title}
          </h3>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {formatPrice(property.price, currentLocale)}
          </span>
        </div>

        {/* Location */}
        {property.address && (
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            <span className="truncate">{property.address}</span>
          </div>
        )}

        {/* Property Features */}
        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          {property.rooms && (
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <Bed className="h-4 w-4 mr-2 text-blue-500" />
              <span className="font-medium">{property.rooms} {getLocalizedText('rooms', currentLocale)}</span>
            </div>
          )}
          {property.bedrooms && (
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <span className="mr-2">🛏️</span>
              <span className="font-medium">{property.bedrooms} {getLocalizedText('bedrooms', currentLocale)}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <Bath className="h-4 w-4 mr-2 text-blue-500" />
              <span className="font-medium">{property.bathrooms} {getLocalizedText('bathrooms', currentLocale)}</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              <Square className="h-4 w-4 mr-2 text-blue-500" />
              <span className="font-medium">{formatArea(property.area, currentLocale)}</span>
            </div>
          )}
        </div>

        {/* AI Analysis Results */}
        {showAI && aiAnalysis && (
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            {aiAnalysis.predicted_price && (
              <div className="text-sm mb-2">
                <span className="font-semibold text-blue-800 dark:text-blue-300">Predicted Price: </span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {formatPrice(aiAnalysis.predicted_price, currentLocale)}
                </span>
                {aiAnalysis.price_confidence && (
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    ({Math.round(aiAnalysis.price_confidence * 100)}% confidence)
                  </span>
                )}
              </div>
            )}
            {aiAnalysis.detected_styles && aiAnalysis.detected_styles.length > 0 && (
              <div className="text-sm">
                <span className="font-semibold text-blue-800 dark:text-blue-300">Style: </span>
                <span className="text-blue-600 dark:text-blue-400">
                  {aiAnalysis.detected_styles
                    .map((style: any) => style.style)
                    .join(', ')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Property Type and Condition */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex flex-wrap gap-2">
            {property.property_type && (
              <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                {property.property_type}
              </span>
            )}
            {property.condition && (
              <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                {property.condition}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/property/${property.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
