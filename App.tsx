
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Conflict from './pages/Conflict';
import Journal from './pages/Journal';
import Library from './pages/Library';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import BottomNav from './components/BottomNav';
import { AuthContext, mockUser } from './contexts/AuthContext';
import type { User } from './types';

type AppState = 'onboarding' | 'preview' | 'login' | 'authed';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [onboardingProfile, setOnboardingProfile] = useState<User['profile'] | null>(null);

  const login = useCallback(() => {
    // In a real app, we'd merge onboardingProfile with the new user account.
    // For this mock, we'll just use the mockUser.
    setUser(mockUser);
    setAppState('authed');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOnboardingProfile(null);
    setAppState('onboarding'); // Back to the start
  }, []);

  const handleOnboardingComplete = useCallback((answers: string[]) => {
    const profile: User['profile'] = {
        communicationStyle: answers[0],
        // The second question is about affection, not directly attachment style.
        // Defaulting attachmentType for the demo.
        attachmentType: 'Secure', 
        sharedGoals: [answers[2]],
    };
    setOnboardingProfile(profile);
    setAppState('preview');
  }, []);

  const authContextValue = { user, login, logout };

  const renderContent = () => {
    switch (appState) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'preview':
        return <Dashboard previewProfile={onboardingProfile} onSignUp={() => setAppState('login')} />;
      case 'login':
        return <Login />;
      case 'authed':
        return (
          <main className="pb-20">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/conflict" element={<Conflict />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/library" element={<Library />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <BottomNav />
          </main>
        );
      default:
        return <Onboarding onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className="w-full min-h-screen font-sans bg-brand-cream text-brand-charcoal">
        <div className="max-w-md mx-auto h-full bg-white shadow-lg">
          <HashRouter>
            {renderContent()}
          </HashRouter>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
