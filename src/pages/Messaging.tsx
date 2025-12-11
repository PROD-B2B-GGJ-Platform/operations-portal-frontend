import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Search,
  Plus,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Users,
  Star,
  Archive,
} from 'lucide-react';
import clsx from 'clsx';

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  type: 'direct' | 'group';
}

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isMe: boolean;
}

const conversations: Conversation[] = [
  { id: '1', name: 'Sarah Johnson', lastMessage: 'Thanks for the update on the project!', time: '2 min', unread: 2, online: true, type: 'direct' },
  { id: '2', name: 'Engineering Team', lastMessage: 'Mike: The deployment is complete', time: '15 min', unread: 0, online: false, type: 'group' },
  { id: '3', name: 'Mike Chen', lastMessage: 'Can we schedule a call tomorrow?', time: '1 hr', unread: 1, online: true, type: 'direct' },
  { id: '4', name: 'HR Department', lastMessage: 'New policy updates are ready', time: '2 hr', unread: 0, online: false, type: 'group' },
  { id: '5', name: 'Emily Davis', lastMessage: 'The designs look great!', time: '3 hr', unread: 0, online: false, type: 'direct' },
  { id: '6', name: 'Product Team', lastMessage: 'Lisa: Sprint planning at 3 PM', time: '5 hr', unread: 5, online: false, type: 'group' },
];

const messages: Message[] = [
  { id: '1', sender: 'Sarah Johnson', content: 'Hi! How are you doing today?', time: '10:30 AM', isMe: false },
  { id: '2', sender: 'Me', content: 'Hey Sarah! I\'m doing great, thanks for asking. Just wrapping up the quarterly report.', time: '10:32 AM', isMe: true },
  { id: '3', sender: 'Sarah Johnson', content: 'That sounds busy! Do you need any help with it?', time: '10:33 AM', isMe: false },
  { id: '4', sender: 'Me', content: 'Actually, yes! Could you review the performance metrics section when you have a chance?', time: '10:35 AM', isMe: true },
  { id: '5', sender: 'Sarah Johnson', content: 'Of course! I\'ll take a look this afternoon and send you my feedback.', time: '10:36 AM', isMe: false },
  { id: '6', sender: 'Me', content: 'Perfect, thank you so much! 🙏', time: '10:37 AM', isMe: true },
  { id: '7', sender: 'Sarah Johnson', content: 'Thanks for the update on the project!', time: '10:38 AM', isMe: false },
];

export default function Messaging() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-10rem)]">
      <div className="flex h-full bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <MessageSquare className="text-violet-400" size={20} />
                Messages
              </h2>
              <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                <Plus size={18} />
              </button>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={clsx(
                  'w-full p-4 flex items-start gap-3 hover:bg-slate-800/50 transition-colors text-left',
                  selectedConversation?.id === conversation.id && 'bg-slate-800/50'
                )}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    {conversation.type === 'group' ? (
                      <Users size={20} className="text-white" />
                    ) : (
                      <span className="text-white font-semibold">
                        {conversation.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium truncate">{conversation.name}</p>
                    <span className="text-xs text-slate-500">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-slate-400 truncate mt-0.5">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-violet-500 text-white rounded-full">
                    {conversation.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    {selectedConversation.type === 'group' ? (
                      <Users size={18} className="text-white" />
                    ) : (
                      <span className="text-white font-semibold text-sm">
                        {selectedConversation.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  {selectedConversation.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{selectedConversation.name}</p>
                  <p className="text-xs text-slate-400">
                    {selectedConversation.online ? 'Online' : 'Last seen recently'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                  <Phone size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                  <Video size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                  <Star size={18} />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={clsx('flex', msg.isMe ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={clsx(
                      'max-w-[70%] rounded-2xl px-4 py-2',
                      msg.isMe
                        ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                        : 'bg-slate-800 text-white'
                    )}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={clsx(
                      'text-xs mt-1',
                      msg.isMe ? 'text-violet-200' : 'text-slate-400'
                    )}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
                <button
                  className={clsx(
                    'p-2 rounded-xl transition-colors',
                    message
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  )}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



