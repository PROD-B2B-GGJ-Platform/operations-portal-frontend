import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Operations Portal</h1>
          <p className="text-gray-400">Operational management and workflows</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-emerald-500 transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Workflow Management</h3>
            <p className="text-gray-400 text-sm">Manage business workflows and automation</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-emerald-500 transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Task Management</h3>
            <p className="text-gray-400 text-sm">Track and assign operational tasks</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-emerald-500 transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Calendar</h3>
            <p className="text-gray-400 text-sm">Schedule and manage events</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-emerald-500 transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Notifications</h3>
            <p className="text-gray-400 text-sm">Manage alerts and notifications</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-emerald-500 transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Reports</h3>
            <p className="text-gray-400 text-sm">Generate operational reports</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-emerald-500 transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Settings</h3>
            <p className="text-gray-400 text-sm">Configure operational settings</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded">
          <p className="text-emerald-400 text-sm">
            <strong>Status:</strong> Operations Portal is running successfully on port 3025
          </p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

