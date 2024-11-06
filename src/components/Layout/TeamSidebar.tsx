import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  Calendar,
  LayoutDashboard,
  ChevronLeft,
  Menu,
  Activity,
  Settings,
  CreditCard
} from 'lucide-react';
import { cn } from '../../lib/utils';

const TeamSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/team' },
    { icon: Users, label: 'Team Roster', path: '/team/roster' },
    { icon: Calendar, label: 'Schedule', path: '/team/schedule' },
    { icon: Activity, label: 'Statistics', path: '/team/statistics' },
    { icon: CreditCard, label: 'Memberships', path: '/team/memberships' },
    { icon: Settings, label: 'Settings', path: '/team/settings' },
  ];

  return (
    <aside
      className={cn(
        'h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <span className="text-xl font-bold">Team Manager</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1.5 hover:bg-gray-800"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-4 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-colors',
                'hover:bg-gray-800 hover:text-white',
                isActive && 'bg-gray-800 text-white',
                collapsed && 'justify-center'
              )
            }
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default TeamSidebar;