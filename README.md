# HomeGenius - AI-Powered Real Estate Platform

An intelligent real estate platform that combines traditional property search with advanced AI capabilities for price prediction, style analysis, and personalized recommendations. **Built for global markets** with support for multiple countries, currencies, and languages.

## 🌍 International Support

HomeGenius is designed to work globally with built-in support for:

- **🇸🇪 Sweden** (SEK) - Swedish language
- **🇺🇸 United States** (USD) - English (US)
- **🇬🇧 United Kingdom** (GBP) - English (UK)
- **🇩🇪 Germany** (EUR) - German language
- **🇫🇷 France** (EUR) - French language

### Easy Localization
- Automatic language detection based on browser settings
- Currency formatting for each supported market
- Localized property terminology (rooms, bedrooms, bathrooms)
- Country-specific area measurements (m², sq ft)
- Customizable city placeholders and search suggestions

## Features

### 🤖 AI-Powered Analysis
- **Price Prediction**: ML models predict property prices based on comprehensive market data
- **Style Analysis**: Computer vision identifies interior and architectural styles from images
- **Personal Recommendations**: AI recommends properties based on user behavior and preferences
- **Multi-language AI**: Analysis results adapt to user's language preference

### 🏠 Property Management
- Advanced property search with international filtering
- High-quality property images and details
- Interactive property comparison
- Global property type support (apartments, houses, condos, townhouses)

### 🎨 Style Matching
- Upload inspiration images to find similar properties
- Visual style analysis and categorization
- Style-based property recommendations
- Cross-cultural style recognition

### 🌐 Global Features
- **Multi-currency Support**: Automatic price formatting in local currency
- **Language Switching**: Real-time language changes without page reload
- **Localized Search**: Country-specific search suggestions and filters
- **Cultural Adaptation**: Property terminology adapted to local markets

## Tech Stack

### Backend
- **FastAPI**: High-performance API framework with international support
- **PostgreSQL**: Robust database for property and user data
- **PyTorch/TensorFlow**: AI/ML model implementation
- **Pydantic**: Data validation and serialization

### Frontend
- **React**: Modern UI framework with TypeScript
- **Tailwind CSS**: Utility-first styling
- **Internationalization**: Built-in i18n support with context providers

### AI/ML
- **Computer Vision**: Style analysis from images
- **Regression Models**: Price prediction with market-specific training
- **Recommendation Systems**: Personalized suggestions
- **Multi-language NLP**: Text analysis in multiple languages

## Project Structure

```
HomeGenius/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── api/               # API endpoints
│   │   ├── models/            # Database models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   └── core/              # Configuration
│   └── requirements.txt
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── contexts/         # React contexts
│   │   ├── utils/            # Utilities (including i18n)
│   │   └── services/         # API services
│   └── package.json
├── ai_models/                 # ML models and training
├── database/                  # Database schemas and migrations
└── docs/                     # Documentation
```

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- Git

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Database Setup
```bash
# Create PostgreSQL database
createdb homegenius

# Update database URL in backend/app/core/config.py
DATABASE_URL = "postgresql://username:password@localhost/homegenius"
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Running the Application
```bash
# Terminal 1 - Backend
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 - Frontend
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Internationalization

### Adding New Countries/Languages

1. **Add locale configuration** in `frontend/src/utils/localization.ts`:
```typescript
'ja-JP': {
  country: 'Japan',
  currency: 'JPY',
  currencyCode: 'JPY',
  language: 'ja-JP',
  // ... other configuration
}
```

2. **Update database models** to support new property types or features specific to the market

3. **Train AI models** with country-specific data for better accuracy

### Supported Markets

| Country | Language | Currency | Area Unit | Property Types |
|---------|----------|----------|-----------|----------------|
| Sweden | Svenska | SEK | m² | Lägenhet, Villa, Radhus |
| USA | English | USD | sq ft | Apartment, House, Condo |
| UK | English | GBP | sq ft | Flat, House, Maisonette |
| Germany | Deutsch | EUR | m² | Wohnung, Haus, Reihenhaus |
| France | Français | EUR | m² | Appartement, Maison, Loft |

## AI Models

### Price Prediction
- **Input**: Property features, location, market data
- **Output**: Predicted price with confidence score
- **Training**: Country-specific market data

### Style Analysis
- **Input**: Property images
- **Output**: Detected styles with confidence scores
- **Features**: Color analysis, material detection, architectural style

### Recommendations
- **Input**: User preferences, search history, property features
- **Output**: Ranked property recommendations
- **Algorithm**: Collaborative filtering + content-based filtering

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Roadmap

- [ ] Additional country support (Spain, Italy, Netherlands)
- [ ] Advanced AI model training with more data
- [ ] Mobile app development
- [ ] Real-time property updates
- [ ] Integration with local real estate APIs
- [ ] Advanced analytics dashboard
