import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Check,
} from 'lucide-react';
import clsx from 'clsx';

const tabs = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'appearance', name: 'Appearance', icon: Palette },
  { id: 'language', name: 'Language', icon: Globe },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <SettingsIcon className="text-violet-400" />
          Settings
        </h1>
        <p className="text-slate-400 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="lg:w-64 bg-slate-900/50 border border-slate-800/50 rounded-2xl p-4 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left',
                  activeTab === tab.id
                    ? 'bg-violet-500/20 text-white border border-violet-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                )}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'text-violet-400' : ''} />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6"
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Profile Settings</h2>
                
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">JD</span>
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-violet-500 text-white rounded-lg text-sm font-medium hover:bg-violet-600 transition-colors">
                      Change Photo
                    </button>
                    <p className="text-sm text-slate-500 mt-2">JPG, GIF or PNG. Max size 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john.doe@company.com"
                      className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                    <input
                      type="text"
                      defaultValue="HR Manager"
                      disabled
                      className="w-full px-4 py-2 bg-slate-800/30 border border-slate-700/50 rounded-lg text-slate-400"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button className="px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { title: 'Performance Updates', desc: 'Get notified about goal progress and reviews', email: true, push: true },
                    { title: 'Compensation Changes', desc: 'Alerts for salary adjustments and bonuses', email: true, push: false },
                    { title: 'Calendar Reminders', desc: 'Meeting and event reminders', email: false, push: true },
                    { title: 'Workflow Updates', desc: 'Status changes in workflows', email: true, push: true },
                    { title: 'Team Messages', desc: 'New messages from team members', email: false, push: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl">
                      <div>
                        <p className="text-white font-medium">{item.title}</p>
                        <p className="text-sm text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked={item.email} className="sr-only peer" />
                          <div className="w-10 h-6 bg-slate-700 rounded-full peer peer-checked:bg-violet-500 transition-colors relative">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
                          </div>
                          <span className="text-sm text-slate-400">Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked={item.push} className="sr-only peer" />
                          <div className="w-10 h-6 bg-slate-700 rounded-full peer peer-checked:bg-violet-500 transition-colors relative">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
                          </div>
                          <span className="text-sm text-slate-400">Push</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Key size={20} className="text-violet-400" />
                        <div>
                          <p className="text-white font-medium">Change Password</p>
                          <p className="text-sm text-slate-400">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-800/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone size={20} className="text-emerald-400" />
                        <div>
                          <p className="text-white font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-slate-400">Add an extra layer of security</p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                        <Check size={12} />
                        Enabled
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-slate-800/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail size={20} className="text-blue-400" />
                        <div>
                          <p className="text-white font-medium">Recovery Email</p>
                          <p className="text-sm text-slate-400">john.doe.backup@gmail.com</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Appearance</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {darkMode ? <Moon size={20} className="text-violet-400" /> : <Sun size={20} className="text-amber-400" />}
                        <div>
                          <p className="text-white font-medium">Dark Mode</p>
                          <p className="text-sm text-slate-400">Use dark theme across the application</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={clsx(
                          'w-12 h-7 rounded-full transition-colors relative',
                          darkMode ? 'bg-violet-500' : 'bg-slate-600'
                        )}
                      >
                        <div className={clsx(
                          'absolute top-1 w-5 h-5 bg-white rounded-full transition-all',
                          darkMode ? 'left-6' : 'left-1'
                        )} />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-slate-300 mb-3">Accent Color</p>
                    <div className="flex items-center gap-3">
                      {['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'].map((color) => (
                        <button
                          key={color}
                          className={clsx(
                            'w-10 h-10 rounded-xl transition-transform hover:scale-110',
                            color === '#8b5cf6' && 'ring-2 ring-offset-2 ring-offset-slate-900 ring-white'
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'language' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Language & Region</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
                    <select className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Timezone</label>
                    <select className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                      <option>Asia/Kolkata (IST)</option>
                      <option>America/New_York (EST)</option>
                      <option>America/Los_Angeles (PST)</option>
                      <option>Europe/London (GMT)</option>
                      <option>Europe/Paris (CET)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Date Format</label>
                    <select className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
                    <select className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>INR (₹)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button className="px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}



