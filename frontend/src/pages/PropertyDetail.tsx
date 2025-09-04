import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperties } from '../contexts/PropertyContext.tsx';
import { aiApi } from '../services/api.ts';
import { Property, AIAnalysis } from '../types/index.ts';
import { MapPin, Bed, Bath, Square, Calendar, ArrowLeft, Brain, TrendingUp, Star } from 'lucide-react';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById } = useProperties();
  const [property, setProperty] = useState<Property | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        const propertyData = await getPropertyById(parseInt(id));
        setProperty(propertyData);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, getPropertyById]);

  const handleAnalyze = async () => {
    if (!property) return;

    setAnalyzing(true);
    try {
      const analysis = await aiApi.analyzeProperty(property.id, 'combined');
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing property:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatArea = (area: number) => {
    return `${area} m²`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Link
            to="/search"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/search"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              {property.images && property.images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  {property.images.slice(1, 3).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.title} ${index + 2}`}
                      className="w-full h-32 md:h-40 object-cover"
                    />
                  ))}
                </div>
              ) : (
                <div className="h-64 md:h-80 bg-gray-200 flex items-center justify-center">
                  <Square className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {formatPrice(property.price)}
                  </div>
                  {aiAnalysis?.predicted_price && (
                    <div className="text-sm text-gray-500 mt-1">
                      AI Predicted: {formatPrice(aiAnalysis.predicted_price)}
                    </div>
                  )}
                </div>
              </div>

              {property.description && (
                <p className="text-gray-700 mb-6">{property.description}</p>
              )}

              {/* Property Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {property.rooms && (
                  <div className="flex items-center text-gray-600">
                    <Bed className="h-5 w-5 mr-2" />
                    <span>{property.rooms} rooms</span>
                  </div>
                )}
                {property.bedrooms && (
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🛏️</span>
                    <span>{property.bedrooms} bedrooms</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center text-gray-600">
                    <Bath className="h-5 w-5 mr-2" />
                    <span>{property.bathrooms} bathrooms</span>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center text-gray-600">
                    <Square className="h-5 w-5 mr-2" />
                    <span>{formatArea(property.area)}</span>
                  </div>
                )}
              </div>

              {/* Property Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.address && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">{property.address}</p>
                    </div>
                  </div>
                )}

                {property.year_built && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">Year Built</p>
                      <p className="text-gray-600">{property.year_built}</p>
                    </div>
                  </div>
                )}

                {property.property_type && (
                  <div>
                    <p className="font-medium text-gray-900">Property Type</p>
                    <p className="text-gray-600 capitalize">{property.property_type}</p>
                  </div>
                )}

                {property.condition && (
                  <div>
                    <p className="font-medium text-gray-900">Condition</p>
                    <p className="text-gray-600 capitalize">{property.condition}</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Analysis Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Brain className="h-6 w-6 mr-2 text-blue-600" />
                  AI Analysis
                </h2>
                {!aiAnalysis && (
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
                  >
                    {analyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Analyze Property
                      </>
                    )}
                  </button>
                )}
              </div>

              {aiAnalysis ? (
                <div className="space-y-4">
                  {/* Price Prediction */}
                  {aiAnalysis.predicted_price && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Price Prediction
                      </h3>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(aiAnalysis.predicted_price)}
                      </div>
                      {aiAnalysis.price_confidence && (
                        <p className="text-sm text-blue-700 mt-1">
                          Confidence: {Math.round(aiAnalysis.price_confidence * 100)}%
                        </p>
                      )}
                      {aiAnalysis.price_factors && (
                        <div className="mt-2 text-sm text-blue-800">
                          <p className="font-medium">Key Factors:</p>
                          <ul className="list-disc list-inside mt-1">
                            {Object.entries(aiAnalysis.price_factors).map(([key, value]) => (
                              <li key={key}>
                                {key.replace('_', ' ')}: {typeof value === 'number' ? formatPrice(value) : value}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Style Analysis */}
                  {aiAnalysis.detected_styles && aiAnalysis.detected_styles.length > 0 && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
                        <Star className="h-5 w-5 mr-2" />
                        Style Analysis
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalysis.detected_styles.map((style, index) => (
                          <span
                            key={index}
                            className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {style.style} ({Math.round(style.confidence * 100)}%)
                          </span>
                        ))}
                      </div>
                      {aiAnalysis.style_features && (
                        <div className="mt-3 text-sm text-purple-800">
                          <p className="font-medium">Features:</p>
                          <div className="mt-1">
                            {Object.entries(aiAnalysis.style_features).map(([key, value]) => (
                              <span key={key} className="mr-4">
                                <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quality Score */}
                  {aiAnalysis.quality_score && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-900 mb-2">Image Quality</h3>
                      <div className="flex items-center">
                        <div className="flex-1 bg-green-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${aiAnalysis.quality_score * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-green-800 font-medium">
                          {Math.round(aiAnalysis.quality_score * 100)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Click "Analyze Property" to get AI-powered insights about this property.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact/Inquiry Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interested in this property?</h3>
              <p className="text-gray-600 mb-4">
                Get in touch with our AI-powered recommendations or contact us directly.
              </p>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
                Get Recommendations
              </button>
            </div>

            {/* Similar Properties */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Properties</h3>
              <p className="text-gray-500 text-sm">
                Our AI will find similar properties based on your preferences and this property's features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
