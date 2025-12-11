import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Calendar,
  Target,
  DollarSign,
  MessageSquare,
  AlertCircle,
  Info,
  CheckCircle,
} from 'lucide-react';
import clsx from 'clsx';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'performance' | 'calendar' | 'compensation' | 'message' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    category: 'performance',
    title: 'Performance Review Due',
    message: 'Q4 performance review for your team is due in 3 days.',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    category: 'calendar',
    title: 'Meeting Reminder',
    message: 'Quarterly planning meeting starts in 30 minutes.',
    time: '30 minutes ago',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    category: 'compensation',
    title: 'Salary Adjustment Approved',
    message: 'The salary adjustment for Engineering team has been approved.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '4',
    type: 'info',
    category: 'message',
    title: 'New Message',
    message: 'Sarah from HR sent you a message about the onboarding process.',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'success',
    category: 'performance',
    title: 'Goal Completed',
    message: 'Michael completed the Q4 Sales Target goal.',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '6',
    type: 'error',
    category: 'system',
    title: 'Action Required',
    message: '5 pending approvals require your attention.',
    time: '4 hours ago',
    read: false,
  },
];

const categoryIcons = {
  performance: Target,
  calendar: Calendar,
  compensation: DollarSign,
  message: MessageSquare,
  system: Bell,
};

const typeStyles = {
  info: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: Info, iconColor: 'text-blue-400' },
  success: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: CheckCircle, iconColor: 'text-emerald-400' },
  warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: AlertCircle, iconColor: 'text-amber-400' },
  error: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: AlertCircle, iconColor: 'text-red-400' },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread' && n.read) return false;
    if (categoryFilter !== 'all' && n.category !== categoryFilter) return false;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Bell className="text-violet-400" />
            Notifications
          </h1>
          <p className="text-slate-400 mt-1">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors"
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-lg p-1">
          {['all', 'unread'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as 'all' | 'unread')}
              className={clsx(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize',
                filter === f
                  ? 'bg-violet-500 text-white'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="all">All Categories</option>
            <option value="performance">Performance</option>
            <option value="calendar">Calendar</option>
            <option value="compensation">Compensation</option>
            <option value="message">Messages</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <Bell size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">No notifications to show</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => {
            const style = typeStyles[notification.type];
            const CategoryIcon = categoryIcons[notification.category];
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={clsx(
                  'p-4 rounded-xl border transition-colors',
                  notification.read
                    ? 'bg-slate-900/30 border-slate-800/50'
                    : `${style.bg} ${style.border}`
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={clsx(
                    'p-2 rounded-lg',
                    notification.read ? 'bg-slate-800' : style.bg
                  )}>
                    <CategoryIcon size={20} className={notification.read ? 'text-slate-400' : style.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={clsx(
                          'font-medium',
                          notification.read ? 'text-slate-300' : 'text-white'
                        )}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-slate-400 mt-0.5">{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">{notification.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                        title="Mark as read"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}



