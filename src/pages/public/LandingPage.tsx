import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trophy, Star, Calendar, Users } from 'lucide-react';
import Navigation from './components/Navigation';
import FeaturedMatch from './components/FeaturedMatch';
import StandingsSection from './components/StandingsSection';
import TopPlayersSection from './components/TopPlayersSection';
import FixturesSection from './components/FixturesSection';
import TeamsSection from './components/TeamsSection';
import Footer from './components/Footer';
import { cn } from '../../lib/utils';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState<'standings' | 'players' | 'fixtures' | 'teams'>('standings');
  const [selectedLeague, setSelectedLeague] = useState('mens-premier');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Kenyan Colors */}
      <div className="relative h-[500px] bg-gradient-to-r from-[#000000] via-[#FF0000] to-[#228B22]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <Navigation 
          selectedLeague={selectedLeague} 
          onLeagueChange={setSelectedLeague}
        />
        <FeaturedMatch />
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex gap-6">
            <button
              onClick={() => setActiveTab('standings')}
              className={cn(
                'flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium',
                activeTab === 'standings'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              <Trophy size={20} />
              Standings
            </button>
            <button
              onClick={() => setActiveTab('players')}
              className={cn(
                'flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium',
                activeTab === 'players'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              <Star size={20} />
              Top Players
            </button>
            <button
              onClick={() => setActiveTab('fixtures')}
              className={cn(
                'flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium',
                activeTab === 'fixtures'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              <Calendar size={20} />
              Fixtures & Results
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className={cn(
                'flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium',
                activeTab === 'teams'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              <Users size={20} />
              Teams
            </button>
          </nav>
        </div>

        {/* Dynamic Content Based on Active Tab */}
        {activeTab === 'standings' && <StandingsSection />}
        {activeTab === 'players' && <TopPlayersSection />}
        {activeTab === 'fixtures' && <FixturesSection />}
        {activeTab === 'teams' && <TeamsSection />}
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;