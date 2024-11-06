import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

const FeaturedMatch = () => {
  const featuredMatch = {
    id: '1',
    homeTeam: {
      name: 'Ulinzi Warriors',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
    },
    awayTeam: {
      name: 'Thunder',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=100&h=100&fit=crop',
    },
    date: '2024-03-20',
    time: '19:00',
    venue: 'Nyayo Stadium',
    league: "Men's Premier League",
  };

  return (
    <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[4px] bg-white/10 p-6 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-orange-300">Featured Match</span>
            <h2 className="text-2xl font-bold text-white">{featuredMatch.league}</h2>
          </div>
          <div className="flex items-center gap-4 text-sm text-white">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{featuredMatch.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{featuredMatch.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{featuredMatch.venue}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={featuredMatch.homeTeam.logo}
              alt={featuredMatch.homeTeam.name}
              className="h-16 w-16 rounded-[4px] bg-white object-cover"
            />
            <span className="text-xl font-bold text-white">
              {featuredMatch.homeTeam.name}
            </span>
          </div>
          <span className="text-2xl font-bold text-white">VS</span>
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-white">
              {featuredMatch.awayTeam.name}
            </span>
            <img
              src={featuredMatch.awayTeam.logo}
              alt={featuredMatch.awayTeam.name}
              className="h-16 w-16 rounded-[4px] bg-white object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMatch;