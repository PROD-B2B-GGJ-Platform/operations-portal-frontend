import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import Calendar from './pages/Calendar';
import Performance from './pages/Performance';
import Compensation from './pages/Compensation';
import Messaging from './pages/Messaging';
import Workflows from './pages/Workflows';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="performance/*" element={<Performance />} />
        <Route path="compensation/*" element={<Compensation />} />
        <Route path="messaging/*" element={<Messaging />} />
        <Route path="workflows/*" element={<Workflows />} />
        <Route path="settings/*" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;



