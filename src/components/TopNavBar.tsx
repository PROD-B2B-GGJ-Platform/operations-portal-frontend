// Adapted from main platform TopNavigationBar for Operations Portal
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Zap } from 'lucide-react';
import { useTenant } from '../contexts/TenantContext';

interface TopNavBarProps {
  userName?: string;
  userEmail?: string;
}

export function TopNavBar({ userName = 'Admin', userEmail = '' }: TopNavBarProps) {
  const navigate = useNavigate();
  const { tenantName, currentTenantId, availableTenants, switchTenant } = useTenant();
  const [showMessageTray, setShowMessageTray] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showTenantSwitcher, setShowTenantSwitcher] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  // Refs for button positions
  const notificationRef = useRef<HTMLButtonElement>(null);
  const recentRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const tenantSwitcherRef = useRef<HTMLButtonElement>(null);

  // Get dropdown position based on ref
  const getDropdownPosition = (ref: React.RefObject<HTMLElement>) => {
    if (!ref.current) return { top: 50, left: 0 };
    const rect = ref.current.getBoundingClientRect();
    return {
      top: rect.bottom + 2,
      left: rect.left
    };
  };

  return (
    <nav className="bg-[#181818] border-b border-[#2a2a2a]">
      {/* Single Row: Logo | Notification icon + Recent + Navigation + Search + Help + User + LogOff */}
      <div className="h-14 px-4 flex items-center justify-between">
        {/* Left: Logo + Tenant Switcher */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-90">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, rgb(108, 71, 255) 0%, rgb(91, 141, 255) 100%)' }}>
              <Zap className="w-5 h-5 text-white fill-white" strokeWidth={0} />
            </div>
            <div className="flex flex-col items-start justify-center -space-y-0.5">
              <span className="text-[14px] font-bold text-white leading-none">GoGrabJob</span>
              <span className="text-[8px] font-medium text-gray-400 leading-none">Operations Portal</span>
            </div>
          </Link>
          
          {/* Tenant Switcher */}
          <button
            ref={tenantSwitcherRef}
            onClick={() => {
              setShowTenantSwitcher(!showTenantSwitcher);
              setShowRecent(false);
              setShowNavigation(false);
              setShowSearch(false);
              setShowMessageTray(false);
            }}
            className="px-3 py-1.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#3a3a3a] rounded text-[11px] font-medium text-white flex items-center gap-2"
          >
            <span>🏢 {tenantName}</span>
            <span className="text-[9px]">▼</span>
          </button>
        </div>

        {/* Right: All nav items including notification */}
        <div className="flex items-center gap-3">
            {/* Notification Icon */}
            <button 
              ref={notificationRef}
              onClick={() => setShowMessageTray(!showMessageTray)}
              className="relative p-1.5 hover:bg-[#2a2a2a] rounded"
            >
              <Bell className="w-4 h-4 text-white" />
              <span className="absolute -top-0.5 -right-0.5 bg-[#6b4b9e] text-white text-[7px] font-medium rounded-full h-3 w-3 flex items-center justify-center">3</span>
            </button>

            {/* Recent Dropdown */}
            <button 
              ref={recentRef}
              onClick={() => {
                setShowRecent(!showRecent);
                setShowNavigation(false);
                setShowSearch(false);
                setShowMessageTray(false);
              }}
              className="px-2 py-1 text-[11px] font-medium text-white hover:bg-[#2a2a2a] rounded flex items-center gap-1"
            >
              Recent
              <span className="text-[9px]">▼</span>
            </button>

            {/* Navigation Dropdown */}
            <button 
              ref={navigationRef}
              onClick={() => {
                setShowNavigation(!showNavigation);
                setShowRecent(false);
                setShowSearch(false);
                setShowMessageTray(false);
              }}
              className="px-2 py-1 text-[11px] font-medium text-white hover:bg-[#2a2a2a] rounded flex items-center gap-1"
            >
              Navigation
              <span className="text-[9px]">▼</span>
            </button>

            {/* Search */}
            <div ref={searchRef} className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                onClick={() => {
                  setShowSearch(!showSearch);
                  setShowRecent(false);
                  setShowNavigation(false);
                  setShowMessageTray(false);
                }}
                className="w-32 h-7 pl-7 pr-6 bg-[#0F1419] border border-[#2a2a2a] text-[10px] text-white placeholder-gray-400 focus:outline-none focus:border-[#A855F7] cursor-pointer"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 pointer-events-none">▼</span>
            </div>

          {/* Help */}
          <button className="px-2 py-1 text-[11px] font-medium text-white hover:bg-[#2a2a2a] rounded">
            Help
          </button>

          {/* User Name */}
          <button 
            onClick={() => navigate('/settings')}
            className="px-2 py-1 text-[11px] font-medium text-blue-400 hover:bg-[#2a2a2a] rounded hover:underline"
            title="Click to view profile"
          >
            {userName}
          </button>

          {/* Log Off */}
          <button 
            onClick={() => window.location.href = 'http://localhost:3005/login'}
            className="px-2 py-1 text-[11px] font-medium text-white hover:bg-[#2a2a2a] rounded"
          >
            Log Off
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {(showRecent || showNavigation || showSearch || showMessageTray || showTenantSwitcher) && (
        <div className="fixed inset-0 z-40" onClick={() => {
          setShowRecent(false);
          setShowNavigation(false);
          setShowSearch(false);
          setShowMessageTray(false);
          setShowTenantSwitcher(false);
        }} />
      )}

      {/* Tenant Switcher Dropdown */}
      {showTenantSwitcher && (() => {
        const pos = getDropdownPosition(tenantSwitcherRef);
        return (
          <div style={{ position: 'fixed', top: `${pos.top}px`, left: `${pos.left}px` }} className="w-64 bg-[#1a1a1a] border border-[#2a2a2a] shadow-xl z-50 max-h-[60vh] overflow-y-auto">
            <div className="px-3 py-2 border-b border-[#2a2a2a] bg-[#181818]">
              <h3 className="text-[10px] font-semibold text-[#e0e0e0]">Switch Tenant</h3>
              <p className="text-[9px] text-gray-500 mt-0.5">Select a tenant to manage</p>
            </div>
            <div className="py-1">
              {availableTenants.map((tenant) => (
                <button
                  key={tenant.id}
                  onClick={() => {
                    switchTenant(tenant.id);
                    setShowTenantSwitcher(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-[11px] hover:bg-[#2a2a2a] flex items-center justify-between ${
                    tenant.id === currentTenantId ? 'bg-violet-500/10 text-violet-400' : 'text-white'
                  }`}
                >
                  <div>
                    <div className="font-medium">{tenant.name}</div>
                    <div className="text-[9px] text-gray-500">{tenant.id}</div>
                  </div>
                  {tenant.id === currentTenantId && (
                    <span className="text-violet-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Recent Dropdown */}
      {showRecent && (() => {
        const pos = getDropdownPosition(recentRef);
        return (
          <div style={{ position: 'fixed', top: `${pos.top}px`, left: `${pos.left}px` }} className="w-64 bg-[#1a1a1a] border border-[#2a2a2a] shadow-xl z-50 max-h-[70vh] overflow-y-auto">
            <div className="px-3 py-2 border-b border-[#2a2a2a] bg-[#181818]">
              <h3 className="text-[10px] font-semibold text-[#e0e0e0]">Recent Items</h3>
            </div>
            <div className="py-1">
              <Link to="/dashboard" onClick={() => setShowRecent(false)} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Dashboard</Link>
              <Link to="/compensation" onClick={() => setShowRecent(false)} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Compensation</Link>
              <Link to="/performance" onClick={() => setShowRecent(false)} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Performance</Link>
              <Link to="/notifications" onClick={() => setShowRecent(false)} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Notifications</Link>
              <Link to="/calendar" onClick={() => setShowRecent(false)} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Calendar</Link>
            </div>
          </div>
        );
      })()}

      {/* Navigation Dropdown with Flyouts */}
      {showNavigation && (() => {
        const pos = getDropdownPosition(navigationRef);
        const navDropdownLeft = pos.left;
        const navDropdownWidth = 224; // w-56 = 14rem = 224px
        
        return (
          <div style={{ position: 'fixed', top: `${pos.top}px`, left: `${pos.left}px` }} className="w-56 bg-[#1a1a1a] border border-[#2a2a2a] shadow-xl z-50 max-h-[95vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <div className="px-3 py-2 border-b border-[#2a2a2a] bg-[#181818]">
              <h3 className="text-[10px] font-semibold text-[#e0e0e0]">Operations Portal</h3>
            </div>
            <div className="py-1">
              {/* Core Operations */}
              <div 
                onMouseEnter={() => setHoveredCategory('core')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a] cursor-pointer flex items-center justify-between">
                  <span>Core Operations</span>
                  <span className="text-[8px]">▶</span>
                </div>
              </div>

              {/* HR Management */}
              <div 
                onMouseEnter={() => setHoveredCategory('hr')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a] cursor-pointer flex items-center justify-between">
                  <span>HR Management</span>
                  <span className="text-[8px]">▶</span>
                </div>
              </div>

              {/* Communication */}
              <div 
                onMouseEnter={() => setHoveredCategory('communication')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a] cursor-pointer flex items-center justify-between">
                  <span>Communication</span>
                  <span className="text-[8px]">▶</span>
                </div>
              </div>

              {/* Back to Main Platform */}
              <div className="border-t border-[#2a2a2a] mt-1 pt-1">
                <a 
                  href="http://localhost:3005/dashboard/home" 
                  className="px-3 py-1.5 text-[10px] text-violet-400 hover:bg-[#2a2a2a] flex items-center justify-between"
                >
                  <span>← Back to Platform</span>
                </a>
              </div>
            </div>

            {/* Flyout Panels */}
            {hoveredCategory === 'core' && (
              <div 
                style={{ position: 'fixed', top: `${pos.top + 40}px`, left: `${navDropdownLeft + navDropdownWidth}px` }}
                className="w-52 bg-[#1a1a1a] border border-[#2a2a2a] shadow-xl z-[60]"
                onMouseEnter={() => setHoveredCategory('core')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link to="/dashboard" onClick={() => { setShowNavigation(false); setHoveredCategory(null); }} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Dashboard</Link>
                <Link to="/compensation" onClick={() => { setShowNavigation(false); setHoveredCategory(null); }} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Compensation</Link>
                <Link to="/performance" onClick={() => { setShowNavigation(false); setHoveredCategory(null); }} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Performance</Link>
                <Link to="/workflows" onClick={() => { setShowNavigation(false); setHoveredCategory(null); }} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Workflows</Link>
              </div>
            )}
            {hoveredCategory === 'hr' && (
              <div 
                style={{ position: 'fixed', top: `${pos.top + 40 + 28}px`, left: `${navDropdownLeft + navDropdownWidth}px` }}
                className="w-52 bg-[#1a1a1a] border border-[#2a2a2a] shadow-xl z-[60]"
                onMouseEnter={() => setHoveredCategory('hr')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link to="/calendar" onClick={() => { setShowNavigation(false); setHoveredCategory(null); }} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Calendar & Events</Link>
                <Link to="/notifications" onClick={() => { setShowNavigation(false); setHoveredCategory(null); }} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Notifications</Link>
                <Link to="/settings" onClick={() => { setShowNavigation(false); setHoveredCategory(null); }} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Settings</Link>
              </div>
            )}
            {hoveredCategory === 'communication' && (
              <div 
                style={{ position: 'fixed', top: `${pos.top + 40 + 28 + 28}px`, left: `${navDropdownLeft + navDropdownWidth}px` }}
                className="w-52 bg-[#1a1a1a] border border-[#2a2a2a] shadow-xl z-[60]"
                onMouseEnter={() => setHoveredCategory('communication')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Link to="/messaging" onClick={() => { setShowNavigation(false); setHoveredCategory(null); }} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Messaging</Link>
                <Link to="/notifications" onClick={() => { setShowNavigation(false); setHoveredCategory(null); }} className="block px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Notifications Center</Link>
              </div>
            )}
          </div>
        );
      })()}

      {/* Search Dropdown */}
      {showSearch && (() => {
        const pos = getDropdownPosition(searchRef);
        return (
          <div style={{ position: 'fixed', top: `${pos.top}px`, left: `${pos.left}px` }} className="w-64 bg-[#1a1a1a] border border-[#2a2a2a] shadow-xl z-50">
            <div className="px-3 py-2 border-b border-[#2a2a2a] bg-[#181818]">
              <h3 className="text-[10px] font-semibold text-[#e0e0e0]">Search Options</h3>
            </div>
            <div className="py-1">
              <button onClick={() => setShowSearch(false)} className="w-full text-left px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Search Employees</button>
              <button onClick={() => setShowSearch(false)} className="w-full text-left px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Search Compensation</button>
              <button onClick={() => setShowSearch(false)} className="w-full text-left px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Search Performance Reviews</button>
              <button onClick={() => setShowSearch(false)} className="w-full text-left px-3 py-1.5 text-[10px] text-white hover:bg-[#2a2a2a]">Search Events</button>
              <div className="border-t border-[#2a2a2a] my-1"></div>
              <button onClick={() => setShowSearch(false)} className="w-full text-left px-3 py-1.5 text-[10px] text-[#A78BFA] hover:bg-[#2a2a2a]">Advanced Search</button>
            </div>
          </div>
        );
      })()}

      {/* Notification Dropdown */}
      {showMessageTray && (() => {
        const pos = getDropdownPosition(notificationRef);
        return (
          <div style={{ position: 'fixed', top: `${pos.top}px`, left: `${pos.left}px` }} className="w-72 bg-[#1a1a1a] border border-[#2a2a2a] shadow-xl z-50 max-h-[60vh] overflow-y-auto">
            <div className="px-3 py-2 border-b border-[#2a2a2a] bg-[#181818] flex items-center justify-between">
              <h3 className="text-[11px] font-semibold text-[#e0e0e0]">Notifications</h3>
              <span className="text-[9px] text-violet-400">{tenantName}</span>
            </div>
            <div className="p-2">
              <div className="p-2 hover:bg-[#2a2a2a] text-[10px] text-white mb-1 border-b border-[#2a2a2a] cursor-pointer">
                <div className="font-medium">Performance review due</div>
                <div className="text-[9px] text-gray-400 mt-0.5">5 minutes ago</div>
              </div>
              <div className="p-2 hover:bg-[#2a2a2a] text-[10px] text-white mb-1 border-b border-[#2a2a2a] cursor-pointer">
                <div className="font-medium">Compensation approval pending</div>
                <div className="text-[9px] text-gray-400 mt-0.5">1 hour ago</div>
              </div>
              <div className="p-2 hover:bg-[#2a2a2a] text-[10px] text-white cursor-pointer">
                <div className="font-medium">New calendar event added</div>
                <div className="text-[9px] text-gray-400 mt-0.5">2 hours ago</div>
              </div>
            </div>
            <div className="px-3 py-2 border-t border-[#2a2a2a] bg-[#181818]">
              <Link to="/notifications" onClick={() => setShowMessageTray(false)} className="text-[10px] text-violet-400 hover:underline">View all notifications →</Link>
            </div>
          </div>
        );
      })()}
    </nav>
  );
}
