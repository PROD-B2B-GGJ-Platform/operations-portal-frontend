import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  MapPin,
  Video,
} from 'lucide-react';
import clsx from 'clsx';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay, isToday } from 'date-fns';

interface Event {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: 'meeting' | 'review' | 'interview' | 'training' | 'other';
  attendees?: number;
  location?: string;
  isVirtual?: boolean;
}

const eventColors = {
  meeting: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  review: 'bg-violet-500/20 border-violet-500/30 text-violet-400',
  interview: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
  training: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
  other: 'bg-slate-500/20 border-slate-500/30 text-slate-400',
};

const mockEvents: Record<string, Event[]> = {
  '2024-12-09': [
    { id: '1', title: 'Team Standup', time: '09:00 AM', duration: '30 min', type: 'meeting', attendees: 8, isVirtual: true },
    { id: '2', title: 'Performance Review - Sarah', time: '11:00 AM', duration: '1 hour', type: 'review', location: 'Room 301' },
    { id: '3', title: 'Candidate Interview', time: '2:00 PM', duration: '1 hour', type: 'interview', isVirtual: true },
  ],
  '2024-12-10': [
    { id: '4', title: 'Quarterly Planning', time: '10:00 AM', duration: '2 hours', type: 'meeting', attendees: 12, location: 'Conference A' },
    { id: '5', title: 'New Hire Training', time: '2:00 PM', duration: '3 hours', type: 'training', attendees: 5 },
  ],
  '2024-12-11': [
    { id: '6', title: 'One-on-One with Mike', time: '09:30 AM', duration: '30 min', type: 'meeting', isVirtual: true },
    { id: '7', title: 'Compensation Review', time: '1:00 PM', duration: '1 hour', type: 'review', location: 'Room 205' },
  ],
  '2024-12-12': [
    { id: '8', title: 'All Hands Meeting', time: '11:00 AM', duration: '1 hour', type: 'meeting', attendees: 150, isVirtual: true },
  ],
  '2024-12-13': [
    { id: '9', title: 'Goal Setting Workshop', time: '10:00 AM', duration: '2 hours', type: 'training', attendees: 20 },
    { id: '10', title: 'Team Retrospective', time: '3:00 PM', duration: '1 hour', type: 'meeting', attendees: 8 },
  ],
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'day'>('week');

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
  const selectedEvents = mockEvents[selectedDateStr] || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <CalendarIcon className="text-violet-400" />
            Calendar
          </h1>
          <p className="text-slate-400 mt-1">Manage your schedule and events</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus size={16} />
            New Event
          </button>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold text-white min-w-[200px] text-center">
            {format(weekStart, 'MMMM d')} - {format(addDays(weekStart, 6), 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 rounded-lg p-1">
          {['week', 'day'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as 'week' | 'day')}
              className={clsx(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize',
                view === v
                  ? 'bg-violet-500 text-white'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Week View */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 border-b border-slate-800">
              {weekDays.map((day) => (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={clsx(
                    'p-4 text-center transition-colors',
                    isSameDay(day, selectedDate)
                      ? 'bg-violet-500/20 border-b-2 border-violet-500'
                      : 'hover:bg-slate-800/50'
                  )}
                >
                  <p className="text-xs text-slate-400 uppercase">{format(day, 'EEE')}</p>
                  <p className={clsx(
                    'text-lg font-semibold mt-1',
                    isToday(day)
                      ? 'text-violet-400'
                      : isSameDay(day, selectedDate)
                        ? 'text-white'
                        : 'text-slate-300'
                  )}>
                    {format(day, 'd')}
                  </p>
                  {mockEvents[format(day, 'yyyy-MM-dd')]?.length > 0 && (
                    <div className="flex justify-center gap-1 mt-1">
                      {mockEvents[format(day, 'yyyy-MM-dd')].slice(0, 3).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Events Grid */}
            <div className="p-4 min-h-[400px]">
              {selectedEvents.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon size={48} className="mx-auto text-slate-600 mb-4" />
                  <p className="text-slate-400">No events scheduled for this day</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={clsx(
                        'p-4 rounded-xl border cursor-pointer hover:scale-[1.02] transition-transform',
                        eventColors[event.type]
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-white">{event.title}</h4>
                          <div className="flex items-center gap-3 mt-2 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {event.time} · {event.duration}
                            </span>
                            {event.attendees && (
                              <span className="flex items-center gap-1">
                                <Users size={14} />
                                {event.attendees}
                              </span>
                            )}
                          </div>
                          {(event.location || event.isVirtual) && (
                            <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
                              {event.isVirtual ? (
                                <>
                                  <Video size={14} />
                                  Virtual Meeting
                                </>
                              ) : (
                                <>
                                  <MapPin size={14} />
                                  {event.location}
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        <span className={clsx(
                          'px-2 py-1 text-xs rounded-full capitalize',
                          eventColors[event.type]
                        )}>
                          {event.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">This Week</h3>
            <div className="space-y-4">
              {[
                { label: 'Total Events', value: '12', color: 'text-violet-400' },
                { label: 'Meetings', value: '6', color: 'text-blue-400' },
                { label: 'Reviews', value: '3', color: 'text-emerald-400' },
                { label: 'Training', value: '2', color: 'text-amber-400' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-slate-400">{stat.label}</span>
                  <span className={clsx('font-semibold', stat.color)}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Coming Up</h3>
            <div className="space-y-3">
              {[
                { title: 'Team Standup', time: 'Today, 9:00 AM' },
                { title: 'Performance Review', time: 'Today, 11:00 AM' },
                { title: 'Quarterly Planning', time: 'Tomorrow, 10:00 AM' },
              ].map((event, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <div>
                    <p className="text-sm text-white">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



