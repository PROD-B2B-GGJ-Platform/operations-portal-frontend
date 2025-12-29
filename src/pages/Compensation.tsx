import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  DollarSign,
  TrendingUp,
  Users,
  PieChart as PieChartIcon,
  Plus,
  Filter,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import clsx from 'clsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { compensationAPI } from '../services/OperationsAPIService';

// Mock data removed - using real API data

const statusStyles = {
  pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: Clock },
  approved: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: CheckCircle },
  rejected: { bg: 'bg-red-500/10', text: 'text-red-400', icon: XCircle },
};

export default function Compensation() {
  const [filter, setFilter] = useState('all');

  const { data: compensationStats, isLoading: statsLoading } = useQuery({
    queryKey: ['compensationStats'],
    queryFn: () => compensationAPI.getStats().then(res => res.data),
  });

  const { data: compensations, isLoading: compensationsLoading } = useQuery({
    queryKey: ['compensations'],
    queryFn: () => compensationAPI.getAll().then(res => res.data),
  });

  const stats = [
    { name: 'Total Payroll', value: compensationStats?.totalPayroll || '$0', change: compensationStats?.totalPayrollChange || '+0%', trend: 'up', icon: DollarSign, color: 'from-emerald-500 to-green-500' },
    { name: 'Avg Salary', value: compensationStats?.averageSalary || '$0', change: compensationStats?.averageSalaryChange || '+0%', trend: 'up', icon: TrendingUp, color: 'from-violet-500 to-purple-500' },
    { name: 'Pending Reviews', value: compensationStats?.pendingReviews || '0', change: compensationStats?.pendingReviewsChange || '0', trend: 'down', icon: Clock, color: 'from-amber-500 to-orange-500' },
    { name: 'Budget Utilized', value: compensationStats?.budgetUtilized || '0%', change: compensationStats?.budgetUtilizedChange || '+0%', trend: 'up', icon: PieChartIcon, color: 'from-blue-500 to-cyan-500' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <DollarSign className="text-emerald-400" />
            Compensation Management
          </h1>
          <p className="text-slate-400 mt-1">Manage salaries, adjustments, and compensation planning</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors">
            <Filter size={16} />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus size={16} />
            New Adjustment
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
            <div className="flex items-center gap-1 mt-2">
              {stat.trend === 'up' ? (
                <ArrowUpRight size={16} className="text-emerald-400" />
              ) : (
                <ArrowDownRight size={16} className="text-red-400" />
              )}
              <span className={stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}>
                {stat.change}
              </span>
              <span className="text-slate-500 text-sm ml-1">vs last quarter</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Charts removed - will add real data charts later */}
      </div>

      {/* Adjustments Table */}
      <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-white">Salary Adjustments</h3>
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
              {['all', 'pending', 'approved', 'rejected'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={clsx(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize',
                    filter === f
                      ? 'bg-emerald-500 text-white'
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
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Employee</th>
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Current</th>
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Proposed</th>
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Change</th>
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Status</th>
                <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Effective</th>
                <th className="text-right text-sm font-medium text-slate-400 px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {compensationsLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    Loading compensations...
                  </td>
                </tr>
              ) : !compensations || compensations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    No compensation data found
                  </td>
                </tr>
              ) : (
                compensations
                  .filter((c: any) => filter === 'all' || c.status?.toLowerCase() === filter)
                  .slice(0, 10)
                  .map((comp: any) => (
                    <tr key={comp.compensationId} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{comp.employeeName || `Employee ${comp.employeeId}`}</p>
                          <p className="text-sm text-slate-500">{comp.position || 'N/A'} · {comp.employeeEmail || 'N/A'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300">${parseInt(comp.baseSalary || '0').toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">${parseInt(comp.baseSalary || '0').toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <ArrowUpRight size={14} />
                          Bonus: ${parseInt(comp.bonus || '0').toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={clsx(
                          'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize',
                          comp.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        )}>
                          {comp.status === 'ACTIVE' ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {comp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300">{comp.effectiveDate || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



