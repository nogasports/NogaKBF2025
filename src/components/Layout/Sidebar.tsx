import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  Calendar,
  Award,
  UserCheck,
  Settings,
  ChevronLeft,
  LayoutDashboard,
  Trophy,
  Menu,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Team Management', path: '/admin/teams' },
    { icon: Calendar, label: 'Fixtures', path: '/admin/fixtures' },
    { icon: Award, label: 'Officials', path: '/admin/officials' },
    { icon: Trophy, label: 'Leagues', path: '/admin/leagues' },
    { icon: UserCheck, label: 'Memberships', path: '/admin/memberships' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside
      className={cn(
        'h-screen bg-primary-900 text-white transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <span className="text-xl font-bold">KBF League</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1.5 hover:bg-primary-800"
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
                'hover:bg-primary-800 hover:text-white',
                isActive && 'bg-primary-800 text-white',
                collapsed && 'justify-center'
              )
            }
          >
            <item.icon size={20} />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;