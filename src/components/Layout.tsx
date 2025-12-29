import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
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
} from 'lucide-react';
import { TopNavBar } from './TopNavBar';

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
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0F1419] flex flex-col">
      {/* Top Navigation Bar */}
      <TopNavBar userName="Admin" />
      
      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            collapsed ? 'w-16' : 'w-64'
          } bg-[#181818] border-r border-[#2a2a2a] transition-all duration-300 flex flex-col`}
        >
          {/* Sidebar Header */}
          <div className="h-12 flex items-center justify-between px-4 border-b border-[#2a2a2a]">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white">Operations Portal</p>
                  <p className="text-[9px] text-gray-400">HR Management</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded hover:bg-[#2a2a2a] text-gray-400 hover:text-white"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                    isActive
                      ? 'bg-violet-500/20 text-violet-400'
                      : 'text-gray-400 hover:text-white hover:bg-[#2a2a2a]'
                  }`}
                >
                  <item.icon size={18} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-[11px] font-medium">{item.name}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-medium bg-violet-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
