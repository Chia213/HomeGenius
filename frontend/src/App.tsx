import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './contexts/PropertyContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { LocaleProvider } from './contexts/LocaleContext.tsx';
import Navbar from './components/Navbar.tsx';
import HomePage from './pages/HomePage.tsx';
import PropertySearch from './pages/PropertySearch.tsx';
import PropertyDetail from './pages/PropertyDetail.tsx';
import AIAnalysis from './pages/AIAnalysis.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Profile from './pages/Profile.tsx';

function App() {
  return (
    <LocaleProvider>
      <AuthProvider>
        <PropertyProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<PropertySearch />} />
                  <Route path="/property/:id" element={<PropertyDetail />} />
                  <Route path="/ai-analysis" element={<AIAnalysis />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
          </Router>
        </PropertyProvider>
      </AuthProvider>
    </LocaleProvider>
  );
}

export default App;