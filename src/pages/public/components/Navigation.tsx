import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface NavigationProps {
  selectedLeague: string;
  onLeagueChange: (league: string) => void;
}

const Navigation: React.FC<NavigationProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Scores', path: '/scores' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Standings', path: '/standings' },
    { label: 'Teams', path: '/teams' },
    { label: 'Players', path: '/players' },
  ];

  const handleLogin = () => {
    navigate('/login/player');
  };

  return (
    <nav className="relative z-10 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/kbf-logo.png"
                alt="KBF Logo"
                className="h-12 w-12"
              />
              <span className="ml-2 text-xl font-bold text-white">
                Kenya Basketball Federation
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-3 py-2 text-sm font-bold text-white transition-colors hover:text-primary-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20">
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={handleLogin}
              className="flex items-center gap-2 rounded-[4px] bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              <User className="h-4 w-4" />
              Sign In
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block rounded-[4px] px-3 py-2 text-base font-bold text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;