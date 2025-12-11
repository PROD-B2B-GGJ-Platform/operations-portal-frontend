import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Bell,
  Calendar,
  Target,
  DollarSign,
  MessageSquare,
  GitBranch,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Search,
  Menu,
} from 'lucide-react';
import clsx from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Notifications', href: '/notifications', icon: Bell, badge: 3 },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Performance', href: '/performance', icon: Target },
  { name: 'Compensation', href: '/compensation', icon: DollarSign },
  { name: 'Messaging', href: '/messaging', icon: MessageSquare, badge: 5 },
  { name: 'Workflows', href: '/workflows', icon: GitBranch },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        className={clsx(
          'fixed inset-y-0 left-0 z-50 flex flex-col',
          'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950',
          'border-r border-slate-800/50',
          'hidden lg:flex'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/50">
          <motion.div
            initial={false}
            animate={{ opacity: collapsed ? 0 : 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-white font-semibold">Operations</h1>
                <p className="text-xs text-slate-400">HR Portal</p>
              </div>
            )}
          </motion.div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-white border border-violet-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                )}
              >
                <item.icon size={20} className={isActive ? 'text-violet-400' : ''} />
                {!collapsed && (
                  <>
                    <span className="flex-1 font-medium">{item.name}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-violet-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-slate-800/50">
          <div className={clsx(
            'flex items-center gap-3',
            collapsed ? 'justify-center' : ''
          )}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-slate-400">HR Manager</p>
              </div>
            )}
            {!collapsed && (
              <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800/50 z-40 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="text-white font-semibold">Operations</span>
        </div>
        <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400">
          <Bell size={20} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              className="w-72 h-full bg-slate-900 border-r border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-16 flex items-center px-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">O</span>
                </div>
                <div className="ml-3">
                  <h1 className="text-white font-semibold">Operations</h1>
                  <p className="text-xs text-slate-400">HR Portal</p>
                </div>
              </div>
              <nav className="p-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname.startsWith(item.href);
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={clsx(
                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                        isActive
                          ? 'bg-violet-500/20 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      )}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.name}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 text-xs bg-violet-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={clsx(
          'flex-1 transition-all duration-300',
          'lg:ml-[280px]',
          collapsed && 'lg:ml-20',
          'pt-16 lg:pt-0'
        )}
      >
        {/* Top Bar */}
        <header className="hidden lg:flex h-16 items-center justify-between px-6 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-80 pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-slate-400">HR Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}



