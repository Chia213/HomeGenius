import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types/index.ts';
import { MapPin, Bed, Bath, Square, Star } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext.tsx';
import { formatPrice, formatArea, getLocalizedText } from '../utils/localization.ts';

interface PropertyCardProps {
  property: Property;
  showAI?: boolean;
  aiAnalysis?: any;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, showAI = false, aiAnalysis }) => {
  const { currentLocale } = useLocale();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Property Image */}
      <div className="relative h-48 bg-gray-200">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <Square className="h-12 w-12" />
          </div>
        )}
        
        {/* AI Analysis Badge */}
        {showAI && aiAnalysis && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            AI Analyzed
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {property.title}
          </h3>
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(property.price, currentLocale)}
          </span>
        </div>

        {/* Location */}
        {property.address && (
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="truncate">{property.address}</span>
          </div>
        )}

        {/* Property Features */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          {property.rooms && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.rooms} {getLocalizedText('rooms', currentLocale)}</span>
            </div>
          )}
          {property.bedrooms && (
            <div className="flex items-center">
              <span className="mr-1">🛏️</span>
              <span>{property.bedrooms} {getLocalizedText('bedrooms', currentLocale)}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms} {getLocalizedText('bathrooms', currentLocale)}</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{formatArea(property.area, currentLocale)}</span>
            </div>
          )}
        </div>

        {/* AI Analysis Results */}
        {showAI && aiAnalysis && (
          <div className="mb-3 p-2 bg-blue-50 rounded-md">
            {aiAnalysis.predicted_price && (
              <div className="text-sm">
                <span className="font-medium text-blue-800">Predicted Price: </span>
                <span className="text-blue-600">
                  {formatPrice(aiAnalysis.predicted_price, currentLocale)}
                </span>
                {aiAnalysis.price_confidence && (
                  <span className="text-gray-600 ml-2">
                    ({Math.round(aiAnalysis.price_confidence * 100)}% confidence)
                  </span>
                )}
              </div>
            )}
            {aiAnalysis.detected_styles && aiAnalysis.detected_styles.length > 0 && (
              <div className="text-sm mt-1">
                <span className="font-medium text-blue-800">Style: </span>
                <span className="text-blue-600">
                  {aiAnalysis.detected_styles
                    .map((style: any) => style.style)
                    .join(', ')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Property Type and Condition */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex space-x-2">
            {property.property_type && (
              <span className="bg-gray-100 px-2 py-1 rounded">
                {property.property_type}
              </span>
            )}
            {property.condition && (
              <span className="bg-gray-100 px-2 py-1 rounded">
                {property.condition}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/property/${property.id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
