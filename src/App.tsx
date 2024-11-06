import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TeamProvider } from './contexts/TeamContext';
import { OfficialProvider } from './contexts/OfficialContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { FanProvider } from './contexts/FanContext';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import PublicScores from './pages/public/PublicScores';
import PublicSchedule from './pages/public/PublicSchedule';
import PublicStandings from './pages/public/PublicStandings';
import PublicTeams from './pages/public/PublicTeams';
import PublicPlayers from './pages/public/PublicPlayers';

// Auth Components
import LoginForm from './components/auth/LoginForm';
import PrivateRoute from './components/auth/PrivateRoute';

// Admin Pages
import AdminLayout from './components/Layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import TeamManagement from './pages/admin/TeamManagement';
import FixturesManagement from './pages/admin/FixturesManagement';
import OfficialsManagement from './pages/admin/OfficialsManagement';
import LeaguesManagement from './pages/admin/LeaguesManagement';
import MembershipManagement from './pages/admin/MembershipManagement';
import Settings from './pages/admin/Settings';

// Team Pages
import TeamLayout from './components/Layout/TeamLayout';
import TeamDashboard from './pages/team/TeamDashboard';
import TeamRoster from './pages/team/TeamRoster';
import TeamSchedule from './pages/team/TeamSchedule';
import TeamStatistics from './pages/team/TeamStatistics';
import TeamMemberships from './pages/team/TeamMemberships';
import TeamSettings from './pages/team/TeamSettings';

// Official Pages
import OfficialLayout from './components/Layout/OfficialLayout';
import OfficialDashboard from './pages/official/OfficialDashboard';
import OfficialFixtures from './pages/official/OfficialFixtures';
import OfficialAssignments from './pages/official/OfficialAssignments';
import OfficialResults from './pages/official/OfficialResults';
import OfficialSettings from './pages/official/OfficialSettings';

// Player Pages
import PlayerLayout from './components/Layout/PlayerLayout';
import PlayerDashboard from './pages/player/PlayerDashboard';
import PlayerProfile from './pages/player/PlayerProfile';
import PlayerSchedule from './pages/player/PlayerSchedule';
import PlayerTeam from './pages/player/PlayerTeam';
import PlayerSettings from './pages/player/PlayerSettings';

// Fan Pages
import FanLayout from './components/Layout/FanLayout';
import FanDashboard from './pages/fan/FanDashboard';
import FanTeams from './pages/fan/FanTeams';
import FanMatches from './pages/fan/FanMatches';
import FanProfile from './pages/fan/FanProfile';
import FanSettings from './pages/fan/FanSettings';

function App() {
  return (
    <AuthProvider>
      <TeamProvider>
        <OfficialProvider>
          <PlayerProvider>
            <FanProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/scores" element={<PublicScores />} />
                  <Route path="/schedule" element={<PublicSchedule />} />
                  <Route path="/standings" element={<PublicStandings />} />
                  <Route path="/teams" element={<PublicTeams />} />
                  <Route path="/players" element={<PublicPlayers />} />
                  
                  {/* Auth Routes */}
                  <Route path="/login/:userType" element={<LoginForm />} />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <PrivateRoute userRole="admin">
                        <AdminLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="teams" element={<TeamManagement />} />
                    <Route path="fixtures" element={<FixturesManagement />} />
                    <Route path="officials" element={<OfficialsManagement />} />
                    <Route path="leagues" element={<LeaguesManagement />} />
                    <Route path="memberships" element={<MembershipManagement />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>

                  {/* Team Routes */}
                  <Route
                    path="/team"
                    element={
                      <PrivateRoute userRole="team">
                        <TeamLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<TeamDashboard />} />
                    <Route path="roster" element={<TeamRoster />} />
                    <Route path="schedule" element={<TeamSchedule />} />
                    <Route path="statistics" element={<TeamStatistics />} />
                    <Route path="memberships" element={<TeamMemberships />} />
                    <Route path="settings" element={<TeamSettings />} />
                  </Route>

                  {/* Official Routes */}
                  <Route
                    path="/official"
                    element={
                      <PrivateRoute userRole="official">
                        <OfficialLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<OfficialDashboard />} />
                    <Route path="fixtures" element={<OfficialFixtures />} />
                    <Route path="assignments" element={<OfficialAssignments />} />
                    <Route path="results" element={<OfficialResults />} />
                    <Route path="settings" element={<OfficialSettings />} />
                  </Route>

                  {/* Player Routes */}
                  <Route
                    path="/player"
                    element={
                      <PrivateRoute userRole="player">
                        <PlayerLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<PlayerDashboard />} />
                    <Route path="profile" element={<PlayerProfile />} />
                    <Route path="schedule" element={<PlayerSchedule />} />
                    <Route path="team" element={<PlayerTeam />} />
                    <Route path="settings" element={<PlayerSettings />} />
                  </Route>

                  {/* Fan Routes */}
                  <Route
                    path="/fan"
                    element={
                      <PrivateRoute userRole="fan">
                        <FanLayout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<FanDashboard />} />
                    <Route path="teams" element={<FanTeams />} />
                    <Route path="matches" element={<FanMatches />} />
                    <Route path="profile" element={<FanProfile />} />
                    <Route path="settings" element={<FanSettings />} />
                  </Route>

                  {/* Fallback route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </BrowserRouter>
            </FanProvider>
          </PlayerProvider>
        </OfficialProvider>
      </TeamProvider>
    </AuthProvider>
  );
}

export default App;