import { motion } from 'framer-motion';
import {
  Users,
  Target,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const stats = [
  { name: 'Active Employees', value: '1,284', change: '+12%', trend: 'up', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { name: 'Goals In Progress', value: '342', change: '+8%', trend: 'up', icon: Target, color: 'from-violet-500 to-purple-500' },
  { name: 'Pending Reviews', value: '28', change: '-5%', trend: 'down', icon: Clock, color: 'from-amber-500 to-orange-500' },
  { name: 'Total Compensation', value: '$12.4M', change: '+15%', trend: 'up', icon: DollarSign, color: 'from-emerald-500 to-green-500' },
];

const performanceData = [
  { month: 'Jan', goals: 85, reviews: 92 },
  { month: 'Feb', goals: 88, reviews: 85 },
  { month: 'Mar', goals: 82, reviews: 88 },
  { month: 'Apr', goals: 90, reviews: 91 },
  { month: 'May', goals: 87, reviews: 89 },
  { month: 'Jun', goals: 93, reviews: 94 },
];

const departmentData = [
  { name: 'Engineering', employees: 320, performance: 92 },
  { name: 'Sales', employees: 180, performance: 88 },
  { name: 'Marketing', employees: 95, performance: 85 },
  { name: 'HR', employees: 45, performance: 94 },
  { name: 'Finance', employees: 60, performance: 91 },
];

const recentActivity = [
  { id: 1, type: 'goal', message: 'Sarah completed Q4 Sales Target', time: '5 min ago', icon: CheckCircle, color: 'text-emerald-400' },
  { id: 2, type: 'review', message: 'Performance review pending for Mike', time: '15 min ago', icon: AlertCircle, color: 'text-amber-400' },
  { id: 3, type: 'compensation', message: 'Salary adjustment approved for Team Alpha', time: '1 hour ago', icon: DollarSign, color: 'text-violet-400' },
  { id: 4, type: 'calendar', message: 'Team meeting scheduled for tomorrow', time: '2 hours ago', icon: Calendar, color: 'text-blue-400' },
  { id: 5, type: 'notification', message: 'New training program available', time: '3 hours ago', icon: Bell, color: 'text-cyan-400' },
];

const upcomingEvents = [
  { id: 1, title: 'Quarterly Review Meeting', time: '10:00 AM', date: 'Today', type: 'meeting' },
  { id: 2, title: 'Performance Calibration', time: '2:00 PM', date: 'Today', type: 'review' },
  { id: 3, title: 'Team Standup', time: '9:00 AM', date: 'Tomorrow', type: 'meeting' },
  { id: 4, title: 'Compensation Committee', time: '11:00 AM', date: 'Dec 10', type: 'compensation' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Operations Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              {stat.trend === 'up' ? (
                <TrendingUp size={16} className="text-emerald-400" />
              ) : (
                <TrendingDown size={16} className="text-red-400" />
              )}
              <span className={stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}>
                {stat.change}
              </span>
              <span className="text-slate-500 text-sm ml-1">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="goalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="reviewGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="goals"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#goalGradient)"
                name="Goal Completion %"
              />
              <Area
                type="monotone"
                dataKey="reviews"
                stroke="#06b6d4"
                fillOpacity={1}
                fill="url(#reviewGradient)"
                name="Review Completion %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Department Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="name" type="category" stroke="#64748b" width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="employees" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Employees" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Activity and Events Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-slate-800/50 ${activity.color}`}>
                  <activity.icon size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.message}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
                  <Calendar size={20} className="text-violet-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{event.title}</p>
                  <p className="text-xs text-slate-400">{event.time} · {event.date}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300 capitalize">
                  {event.type}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}



