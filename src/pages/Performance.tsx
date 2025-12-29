import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  Target,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Plus,
  Filter,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import clsx from 'clsx';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { performanceAPI } from '../services/OperationsAPIService';

// Mock chart data removed - using real API data

const goals = [
  {
    id: '1',
    title: 'Complete Q4 Product Launch',
    employee: 'Sarah Johnson',
    department: 'Product',
    progress: 85,
    status: 'on-track',
    dueDate: 'Dec 31, 2024',
    type: 'individual',
  },
  {
    id: '2',
    title: 'Increase Team Velocity by 20%',
    employee: 'Mike Chen',
    department: 'Engineering',
    progress: 60,
    status: 'on-track',
    dueDate: 'Dec 15, 2024',
    type: 'team',
  },
  {
    id: '3',
    title: 'AWS Certification',
    employee: 'Emily Davis',
    department: 'Engineering',
    progress: 100,
    status: 'completed',
    dueDate: 'Nov 30, 2024',
    type: 'development',
  },
  {
    id: '4',
    title: 'Customer Satisfaction Score > 90%',
    employee: 'John Smith',
    department: 'Support',
    progress: 45,
    status: 'at-risk',
    dueDate: 'Dec 10, 2024',
    type: 'department',
  },
  {
    id: '5',
    title: 'Reduce Bug Count by 30%',
    employee: 'Lisa Wang',
    department: 'QA',
    progress: 70,
    status: 'on-track',
    dueDate: 'Dec 20, 2024',
    type: 'team',
  },
];

const statusStyles = {
  'on-track': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: CheckCircle },
  'at-risk': { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: AlertCircle },
  'completed': { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: CheckCircle },
  'overdue': { bg: 'bg-red-500/10', text: 'text-red-400', icon: AlertCircle },
};

export default function Performance() {
  const [filter, setFilter] = useState('all');

  const { data: performanceStats, isLoading: statsLoading } = useQuery({
    queryKey: ['performanceStats'],
    queryFn: () => performanceAPI.getStats().then(res => res.data),
  });

  const { data: goals, isLoading: goalsLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: () => performanceAPI.getAllGoals().then(res => res.data),
  });

  const stats = [
    { name: 'Active Goals', value: performanceStats?.activeGoals?.toString() || '0', change: '+12', icon: Target, color: 'from-violet-500 to-purple-500' },
    { name: 'Avg Progress', value: performanceStats?.averageProgress ? `${performanceStats.averageProgress.toFixed(1)}%` : '0%', change: '+5%', icon: TrendingUp, color: 'from-emerald-500 to-green-500' },
    { name: 'Completed Goals', value: performanceStats?.completedGoals?.toString() || '0', change: '-3', icon: CheckCircle, color: 'from-amber-500 to-orange-500' },
    { name: 'Total Goals', value: goals?.length?.toString() || '0', change: '+8', icon: Award, color: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Target className="text-violet-400" />
            Performance Management
          </h1>
          <p className="text-slate-400 mt-1">Track goals, reviews, and employee performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus size={16} />
            Create Goal
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6"
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
            <p className="text-sm text-emerald-400 mt-2">{stat.change} this month</p>
          </motion.div>
        ))}
      </div>

      {/* Charts removed - will add real data charts later */}

      {/* Goals Table */}
      <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">Active Goals</h3>
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
              {['all', 'individual', 'team', 'department'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={clsx(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize',
                    filter === f
                      ? 'bg-violet-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Goal</th>
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Employee</th>
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Progress</th>
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Status</th>
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Due Date</th>
                <th className="text-right text-sm font-medium text-slate-400 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {goalsLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    Loading goals...
                  </td>
                </tr>
              ) : !goals || goals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No goals found
                  </td>
                </tr>
              ) : (
                goals
                  .filter((goal: any) => filter === 'all' || goal.goalType?.toLowerCase().includes(filter))
                  .map((goal: any) => {
                    const statusMap: any = {
                      'ACTIVE': 'on-track',
                      'COMPLETED': 'completed',
                      'CANCELLED': 'overdue',
                      'ON_HOLD': 'at-risk'
                    };
                    const mappedStatus = statusMap[goal.status] || 'on-track';
                    const status = statusStyles[mappedStatus as keyof typeof statusStyles];
                    return (
                      <tr key={goal.goalId} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{goal.goalName}</p>
                            <p className="text-sm text-slate-500 mt-0.5 capitalize">{goal.goalType} Goal</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white">{goal.employeeName || `Employee ${goal.employeeId}`}</p>
                            <p className="text-sm text-slate-500">{goal.position || goal.category}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-32">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-white">{goal.progressPercentage || 0}%</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                                style={{ width: `${goal.progressPercentage || 0}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={clsx(
                            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize',
                            status.bg,
                            status.text
                          )}>
                            <status.icon size={12} />
                            {goal.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-300">{goal.dueDate}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



