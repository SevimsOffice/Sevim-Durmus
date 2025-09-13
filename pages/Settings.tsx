
import React, { useContext } from 'react';
import PageHeader from '../components/PageHeader';
import { AuthContext } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account and preferences." />
      <div className="p-6 space-y-8">
        {/* Account Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-brand-charcoal border-b pb-2">Account</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email</span>
            <span className="font-semibold">{user?.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Your Partner</span>
            <span className="font-semibold">{user?.partnerName}</span>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-brand-charcoal border-b pb-2">Subscription</h3>
          <div className="p-4 bg-brand-teal-light/30 rounded-lg text-center">
              <p className="font-bold text-brand-teal">You are on the HeartSync Plus plan.</p>
              <p className="text-sm text-gray-600">Renews on Jan 1, 2025.</p>
              <button className="mt-2 text-sm text-brand-purple-dark font-semibold hover:underline">
                  Manage Subscription
              </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-brand-charcoal border-b pb-2">Notifications</h3>
          <div className="flex justify-between items-center">
            <label htmlFor="daily-ritual-toggle" className="text-gray-600">Daily Ritual Reminders</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="daily-ritual-toggle" className="sr-only peer" defaultChecked/>
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-purple-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-purple"></div>
            </label>
          </div>
           <div className="flex justify-between items-center">
            <label htmlFor="weekly-checkin-toggle" className="text-gray-600">Weekly Check-in Reminders</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="weekly-checkin-toggle" className="sr-only peer" defaultChecked/>
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-purple-light peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-purple"></div>
            </label>
          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-4">
          <button
            onClick={logout}
            className="w-full bg-white border border-brand-error text-brand-error font-bold py-3 px-4 rounded-lg hover:bg-red-50 transition duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;