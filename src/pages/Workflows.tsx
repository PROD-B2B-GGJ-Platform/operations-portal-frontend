import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch,
  Plus,
  Play,
  Pause,
  Settings,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  ArrowRight,
  Zap,
  Users,
  FileText,
  Mail,
} from 'lucide-react';
import clsx from 'clsx';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  type: 'onboarding' | 'offboarding' | 'performance' | 'leave' | 'custom';
  instances: number;
  lastRun: string;
  steps: number;
}

interface WorkflowInstance {
  id: string;
  workflowName: string;
  employee: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  currentStep: string;
  progress: number;
  startedAt: string;
}

const workflows: Workflow[] = [
  {
    id: '1',
    name: 'Employee Onboarding',
    description: 'Complete onboarding process for new hires including documents, training, and equipment',
    status: 'active',
    type: 'onboarding',
    instances: 12,
    lastRun: '2 hours ago',
    steps: 8,
  },
  {
    id: '2',
    name: 'Performance Review Cycle',
    description: 'Annual performance review workflow including self-assessment and manager review',
    status: 'active',
    type: 'performance',
    instances: 45,
    lastRun: '1 day ago',
    steps: 5,
  },
  {
    id: '3',
    name: 'Leave Approval',
    description: 'Automated leave request and approval workflow',
    status: 'active',
    type: 'leave',
    instances: 8,
    lastRun: '30 minutes ago',
    steps: 4,
  },
  {
    id: '4',
    name: 'Employee Offboarding',
    description: 'Offboarding process including exit interview, equipment return, and access revocation',
    status: 'paused',
    type: 'offboarding',
    instances: 3,
    lastRun: '5 days ago',
    steps: 10,
  },
  {
    id: '5',
    name: 'Promotion Workflow',
    description: 'Workflow for employee promotions including approvals and compensation changes',
    status: 'draft',
    type: 'custom',
    instances: 0,
    lastRun: 'Never',
    steps: 6,
  },
];

const runningInstances: WorkflowInstance[] = [
  {
    id: '1',
    workflowName: 'Employee Onboarding',
    employee: 'Sarah Johnson',
    status: 'running',
    currentStep: 'IT Setup',
    progress: 62,
    startedAt: 'Dec 5, 2024',
  },
  {
    id: '2',
    workflowName: 'Performance Review',
    employee: 'Mike Chen',
    status: 'pending',
    currentStep: 'Manager Review',
    progress: 40,
    startedAt: 'Dec 1, 2024',
  },
  {
    id: '3',
    workflowName: 'Leave Approval',
    employee: 'Emily Davis',
    status: 'completed',
    currentStep: 'Completed',
    progress: 100,
    startedAt: 'Dec 6, 2024',
  },
  {
    id: '4',
    workflowName: 'Employee Onboarding',
    employee: 'John Smith',
    status: 'running',
    currentStep: 'Document Collection',
    progress: 25,
    startedAt: 'Dec 7, 2024',
  },
  {
    id: '5',
    workflowName: 'Performance Review',
    employee: 'Lisa Wang',
    status: 'failed',
    currentStep: 'Self Assessment',
    progress: 20,
    startedAt: 'Dec 2, 2024',
  },
];

const statusStyles = {
  active: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: Play },
  paused: { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: Pause },
  draft: { bg: 'bg-slate-500/10', text: 'text-slate-400', icon: FileText },
  running: { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: Zap },
  completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', icon: CheckCircle },
  failed: { bg: 'bg-red-500/10', text: 'text-red-400', icon: XCircle },
  pending: { bg: 'bg-amber-500/10', text: 'text-amber-400', icon: Clock },
};

const typeIcons = {
  onboarding: Users,
  offboarding: Users,
  performance: CheckCircle,
  leave: Clock,
  custom: Zap,
};

export default function Workflows() {
  const [view, setView] = useState<'workflows' | 'instances'>('workflows');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <GitBranch className="text-violet-400" />
            Workflow Automation
          </h1>
          <p className="text-slate-400 mt-1">Automate HR processes and track workflow instances</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus size={16} />
            Create Workflow
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-lg p-1 w-fit">
        {['workflows', 'instances'].map((v) => (
          <button
            key={v}
            onClick={() => setView(v as 'workflows' | 'instances')}
            className={clsx(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize',
              view === v
                ? 'bg-violet-500 text-white'
                : 'text-slate-400 hover:text-white'
            )}
          >
            {v === 'workflows' ? 'Workflow Templates' : 'Running Instances'}
          </button>
        ))}
      </div>

      {view === 'workflows' ? (
        /* Workflow Templates */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map((workflow, index) => {
            const status = statusStyles[workflow.status];
            const TypeIcon = typeIcons[workflow.type];
            return (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 flex items-center justify-center">
                      <TypeIcon size={24} className="text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{workflow.name}</h3>
                      <span className={clsx(
                        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium capitalize mt-1',
                        status.bg,
                        status.text
                      )}>
                        <status.icon size={10} />
                        {workflow.status}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
                <p className="text-sm text-slate-400 mt-4 line-clamp-2">{workflow.description}</p>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-1 text-sm text-slate-400">
                    <GitBranch size={14} />
                    <span>{workflow.steps} steps</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-400">
                    <Zap size={14} />
                    <span>{workflow.instances} active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-slate-500">Last run: {workflow.lastRun}</span>
                  <button className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors">
                    View Details
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Running Instances */
        <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Workflow</th>
                  <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Employee</th>
                  <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Current Step</th>
                  <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Progress</th>
                  <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Status</th>
                  <th className="text-left text-sm font-medium text-slate-400 px-6 py-4">Started</th>
                  <th className="text-right text-sm font-medium text-slate-400 px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {runningInstances.map((instance) => {
                  const status = statusStyles[instance.status];
                  return (
                    <tr key={instance.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">{instance.workflowName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300">{instance.employee}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300">{instance.currentStep}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-white">{instance.progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={clsx(
                                'h-full rounded-full',
                                instance.status === 'completed'
                                  ? 'bg-emerald-500'
                                  : instance.status === 'failed'
                                    ? 'bg-red-500'
                                    : 'bg-gradient-to-r from-violet-500 to-purple-500'
                              )}
                              style={{ width: `${instance.progress}%` }}
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
                          {instance.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300">{instance.startedAt}</span>
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
      )}
    </div>
  );
}



