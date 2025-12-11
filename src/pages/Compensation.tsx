import { useState } from 'react';
import { motion } from 'framer-motion';
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

const stats = [
  { name: 'Total Payroll', value: '$12.4M', change: '+8.5%', trend: 'up', icon: DollarSign, color: 'from-emerald-500 to-green-500' },
  { name: 'Avg Salary', value: '$85,400', change: '+5.2%', trend: 'up', icon: TrendingUp, color: 'from-violet-500 to-purple-500' },
  { name: 'Pending Reviews', value: '24', change: '-3', trend: 'down', icon: Clock, color: 'from-amber-500 to-orange-500' },
  { name: 'Budget Utilized', value: '78%', change: '+12%', trend: 'up', icon: PieChartIcon, color: 'from-blue-500 to-cyan-500' },
];

const salaryTrendData = [
  { month: 'Jan', avg: 82000, median: 78000 },
  { month: 'Feb', avg: 82500, median: 78500 },
  { month: 'Mar', avg: 83000, median: 79000 },
  { month: 'Apr', avg: 83500, median: 79500 },
  { month: 'May', avg: 84000, median: 80000 },
  { month: 'Jun', avg: 85400, median: 81000 },
];

const departmentBudget = [
  { department: 'Engineering', budget: 4200000, utilized: 3800000 },
  { department: 'Sales', budget: 2800000, utilized: 2600000 },
  { department: 'Marketing', budget: 1500000, utilized: 1350000 },
  { department: 'HR', budget: 800000, utilized: 720000 },
  { department: 'Finance', budget: 950000, utilized: 880000 },
];

const adjustments = [
  {
    id: '1',
    employee: 'Sarah Johnson',
    role: 'Senior Developer',
    department: 'Engineering',
    currentSalary: 120000,
    proposedSalary: 132000,
    change: 10,
    effectiveDate: 'Feb 1, 2025',
    status: 'pending',
    reason: 'Annual Review',
  },
  {
    id: '2',
    employee: 'Mike Chen',
    role: 'Product Manager',
    department: 'Product',
    currentSalary: 135000,
    proposedSalary: 148000,
    change: 9.6,
    effectiveDate: 'Feb 1, 2025',
    status: 'approved',
    reason: 'Promotion',
  },
  {
    id: '3',
    employee: 'Emily Davis',
    role: 'UX Designer',
    department: 'Design',
    currentSalary: 95000,
    proposedSalary: 105000,
    change: 10.5,
    effectiveDate: 'Jan 15, 2025',
    status: 'approved',
    reason: 'Market Adjustment',
  },
  {
    id: '4',
    employee: 'John Smith',
    role: 'Sales Manager',
    department: 'Sales',
    currentSalary: 110000,
    proposedSalary: 118000,
    change: 7.3,
    effectiveDate: 'Feb 1, 2025',
    status: 'pending',
    reason: 'Performance Bonus',
  },
  {
    id: '5',
    employee: 'Lisa Wang',
    role: 'Data Analyst',
    department: 'Analytics',
    currentSalary: 85000,
    proposedSalary: 92000,
    change: 8.2,
    effectiveDate: 'Feb 1, 2025',
    status: 'rejected',
    reason: 'Budget Constraints',
  },
];

const statusStyles = {
  pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: Clock },
  approved: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: CheckCircle },
  rejected: { bg: 'bg-red-500/10', text: 'text-red-400', icon: XCircle },
};

export default function Compensation() {
  const [filter, setFilter] = useState('all');

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
        {/* Salary Trends */}
        <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Salary Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salaryTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Line type="monotone" dataKey="avg" stroke="#8b5cf6" strokeWidth={2} dot={false} name="Average" />
              <Line type="monotone" dataKey="median" stroke="#06b6d4" strokeWidth={2} dot={false} name="Median" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Budget */}
        <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Department Budget Utilization</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentBudget} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#64748b" tickFormatter={(v) => `$${v / 1000000}M`} />
              <YAxis dataKey="department" type="category" stroke="#64748b" width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Bar dataKey="budget" fill="#334155" radius={[0, 4, 4, 0]} name="Budget" />
              <Bar dataKey="utilized" fill="#10b981" radius={[0, 4, 4, 0]} name="Utilized" />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
              {adjustments
                .filter((a) => filter === 'all' || a.status === filter)
                .map((adjustment) => {
                  const status = statusStyles[adjustment.status as keyof typeof statusStyles];
                  return (
                    <tr key={adjustment.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{adjustment.employee}</p>
                          <p className="text-sm text-slate-500">{adjustment.role} · {adjustment.department}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300">{formatCurrency(adjustment.currentSalary)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">{formatCurrency(adjustment.proposedSalary)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-emerald-400 flex items-center gap-1">
                          <ArrowUpRight size={14} />
                          +{adjustment.change}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={clsx(
                          'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize',
                          status.bg,
                          status.text
                        )}>
                          <status.icon size={12} />
                          {adjustment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300">{adjustment.effectiveDate}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



