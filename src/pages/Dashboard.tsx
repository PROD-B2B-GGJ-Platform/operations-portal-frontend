import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  Target,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import { compensationAPI, performanceAPI, workflowAPI } from '../services/OperationsAPIService';

export default function Dashboard() {
  const { data: compensationStats } = useQuery({
    queryKey: ['compensationStats'],
    queryFn: () => compensationAPI.getStats().then(res => res.data),
  });

  const { data: performanceStats } = useQuery({
    queryKey: ['performanceStats'],
    queryFn: () => performanceAPI.getStats().then(res => res.data),
  });

  const { data: pendingTasks } = useQuery({
    queryKey: ['pendingTasks'],
    queryFn: () => workflowAPI.getPendingTasks().then(res => res.data),
  });

  const stats = [
    { name: 'Active Employees', value: compensationStats?.totalEmployees || '0', change: '+12%', trend: 'up', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { name: 'Goals In Progress', value: performanceStats?.activeGoals || '0', change: '+8%', trend: 'up', icon: Target, color: 'from-violet-500 to-purple-500' },
    { name: 'Pending Approvals', value: pendingTasks?.length || '0', change: 'Action required', trend: 'down', icon: Clock, color: 'from-amber-500 to-orange-500' },
    { name: 'Total Compensation', value: compensationStats?.totalPayroll || '$0', change: compensationStats?.totalPayrollChange || '+15%', trend: 'up', icon: DollarSign, color: 'from-emerald-500 to-green-500' },
  ];

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

      {/* More detailed insights will be added here when additional APIs are ready */}
    </div>
  );
}



