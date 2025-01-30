import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCircleIcon, 
  CalendarIcon, 
  KeyIcon, 
  BellIcon,
  CreditCardIcon,
  GlobeAltIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

// Mock data for bookings
const mockBookings = [
  {
    id: 'B001',
    type: 'room',
    name: 'Ocean View Villa',
    startDate: '2025-02-15',
    endDate: '2025-02-20',
    status: 'upcoming',
    price: 2995
  },
  {
    id: 'B002',
    type: 'experience',
    name: 'Sunset Sailing',
    startDate: '2025-02-16',
    time: '17:00',
    status: 'upcoming',
    price: 299
  },
  {
    id: 'B003',
    type: 'dining',
    name: 'Ocean Vista Restaurant',
    date: '2025-02-16',
    time: '19:30',
    status: 'upcoming',
    guests: 2
  }
];

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    preferences: {
      newsletter: true,
      notifications: true,
      language: 'English',
      currency: 'USD'
    }
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'bookings', name: 'My Bookings', icon: CalendarIcon },
    { id: 'preferences', name: 'Preferences', icon: GlobeAltIcon },
    { id: 'security', name: 'Security', icon: KeyIcon },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <UserCircleIcon className="w-12 h-12 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Member since January 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            {mockBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {booking.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Booking ID: {booking.id}
                    </p>
                  </div>
                  <div className="text-right">
                    {booking.type === 'room' && (
                      <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        ${booking.price}
                      </p>
                    )}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {booking.type === 'room' ? (
                    <>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Check-in</p>
                        <p className="font-medium">{booking.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Check-out</p>
                        <p className="font-medium">{booking.endDate}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                        <p className="font-medium">{booking.startDate || booking.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
                        <p className="font-medium">{booking.time}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4 flex gap-4">
                  <button className="btn-secondary text-sm">
                    Modify Booking
                  </button>
                  <button className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                    Cancel Booking
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={profile.preferences.language}
                  onChange={(e) => setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, language: e.target.value }
                  })}
                  className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={profile.preferences.currency}
                  onChange={(e) => setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, currency: e.target.value }
                  })}
                  className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Newsletter</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive updates about special offers and events
                  </p>
                </div>
                <button
                  onClick={() => setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, newsletter: !profile.preferences.newsletter }
                  })}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    profile.preferences.newsletter ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      profile.preferences.newsletter ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive booking reminders and updates
                  </p>
                </div>
                <button
                  onClick={() => setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, notifications: !profile.preferences.notifications }
                  })}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    profile.preferences.notifications ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      profile.preferences.notifications ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="btn-primary">
                Save Preferences
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button className="btn-primary">
                  Update Password
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Two-Factor Authentication
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add an extra layer of security to your account
              </p>
              <button className="btn-secondary">
                Enable 2FA
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 pt-24">
      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.name}
                </button>
              ))}
            </nav>

            <div className="mt-8 space-y-4">
              <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-4">
                <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400">
                  <ChatBubbleLeftIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Need Help?</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Our support team is here 24/7
                </p>
                <button className="mt-3 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
