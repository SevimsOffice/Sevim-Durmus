
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ConflictIcon, JournalIcon, LibraryIcon, SettingsIcon } from './icons';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: HomeIcon },
  { path: '/conflict', label: 'Conflict', icon: ConflictIcon },
  { path: '/journal', label: 'Journal', icon: JournalIcon },
  { path: '/library', label: 'Library', icon: LibraryIcon },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
];

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-t-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full text-sm font-medium transition-colors duration-200 ${
                isActive ? 'text-brand-purple-dark' : 'text-gray-400 hover:text-brand-purple'
              }`
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
