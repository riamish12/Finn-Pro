import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import RiskAssessment from './components/Onboarding/RiskAssessment';
import ProfileSummary from './components/ProfileSummary/ProfileSummary';
import ModeSelection from './components/Trendsetter/ModeSelection';
import TrendsetterQuiz from './components/Trendsetter/TrendsetterQuiz';
import TrendsetterResult from './components/Trendsetter/TrendsetterResult';
import { UserProvider } from './context/UserContext';
import { TrendsetterType } from './components/Trendsetter/TrendsetterQuiz';
type Step = 'mode-selection' | 'assessment' | 'trendsetter-quiz' | 'trendsetter-result' | 'profile' | 'dashboard';
export function App() {
  const [currentStep, setCurrentStep] = useState<Step>('mode-selection');
  const [trendsetterType, setTrendsetterType] = useState<TrendsetterType | null>(null);
  const handleModeSelect = (mode: 'legacy' | 'trendsetter') => {
    if (mode === 'legacy') {
      setCurrentStep('assessment');
    } else {
      setCurrentStep('trendsetter-quiz');
    }
  };
  const handleTrendsetterComplete = (result: TrendsetterType) => {
    setTrendsetterType(result);
    setCurrentStep('trendsetter-result');
  };
  return <UserProvider>
      <div className="flex flex-col min-h-screen bg-slate-900 text-white">
        <Header />
        <div className="flex flex-1">
          <main className="flex-1 p-6">
            {currentStep === 'mode-selection' && <ModeSelection onSelectMode={handleModeSelect} />}
            {currentStep === 'assessment' && <RiskAssessment onComplete={() => setCurrentStep('profile')} />}
            {currentStep === 'trendsetter-quiz' && <TrendsetterQuiz onComplete={handleTrendsetterComplete} />}
            {currentStep === 'trendsetter-result' && trendsetterType && <TrendsetterResult type={trendsetterType} onContinue={() => setCurrentStep('dashboard')} />}
            {currentStep === 'profile' && <ProfileSummary onComplete={() => setCurrentStep('dashboard')} />}
            {currentStep === 'dashboard' && <>
                <Sidebar />
                <div className="flex-1 p-6 overflow-auto">
                  <Dashboard />
                </div>
              </>}
          </main>
        </div>
      </div>
    </UserProvider>;
}