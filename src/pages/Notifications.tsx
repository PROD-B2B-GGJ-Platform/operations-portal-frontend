import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Target,
  Calendar,
  DollarSign,
  MessageSquare,
  Filter,
  Check,
  Trash2,
} from 'lucide-react';
import { notificationAPI } from '../services/OperationsAPIService';
import toast from 'react-hot-toast';

const categoryIcons: Record<string, any> = {
  performance: Target,
  calendar: Calendar,
  compensation: DollarSign,
  message: MessageSquare,
  system: Bell,
  PERFORMANCE: Target,
  CALENDAR: Calendar,
  COMPENSATION: DollarSign,
  MESSAGE: MessageSquare,
  SYSTEM: Bell,
};

const typeStyles: Record<string, any> = {
  info: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: Info },
  success: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: CheckCircle },
  warning: { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: AlertCircle },
  error: { bg: 'bg-red-500/10', text: 'text-red-400', icon: XCircle },
  INFO: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: Info },
  SUCCESS: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: CheckCircle },
  WARNING: { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: AlertCircle },
  ERROR: { bg: 'bg-red-500/10', text: 'text-red-400', icon: XCircle },
};

export default function Notifications() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications', filter],
    queryFn: async () => {
      const response = filter === 'unread' 
        ? await notificationAPI.getUnread()
        : await notificationAPI.getAll();
      return response.data;
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationAPI.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notification marked as read');
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationAPI.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('All notifications marked as read');
    },
  });

  const filteredNotifications = categoryFilter === 'all'
    ? notifications
    : notifications.filter((n: any) => n.category?.toLowerCase() === categoryFilter);

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-slate-400 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => markAllAsReadMutation.mutate()}
          disabled={unreadCount === 0}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          Mark All as Read
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-400">Filter:</span>
        </div>

        <div className="flex gap-2">
          {['all', 'unread'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-slate-700" />

        <div className="flex gap-2">
          {['all', 'performance', 'calendar', 'compensation', 'message', 'system'].map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                categoryFilter === category
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-slate-400 mt-4">Loading notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No notifications found</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredNotifications.map((notification: any, index: number) => {
              const typeStyle = typeStyles[notification.type] || typeStyles.info;
              const CategoryIcon = categoryIcons[notification.category] || Bell;
              const TypeIcon = typeStyle.icon;

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-slate-600/50 transition-all ${
                    !notification.read ? 'border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${typeStyle.bg}`}>
                      <CategoryIcon className={`w-5 h-5 ${typeStyle.text}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-medium">{notification.title}</h3>
                            {!notification.read && (
                              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm">{notification.message}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-slate-500">{notification.time || 'Just now'}</span>
                            <span className={`flex items-center gap-1 text-xs ${typeStyle.text}`}>
                              <TypeIcon className="w-3 h-3" />
                              {notification.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => markAsReadMutation.mutate(notification.id)}
                              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4 text-emerald-400" />
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
