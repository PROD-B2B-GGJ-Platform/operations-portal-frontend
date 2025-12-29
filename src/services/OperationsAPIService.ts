import axios from 'axios';
import toast from 'react-hot-toast';

// Direct service URLs (no API Gateway yet)
const SERVICE_URLS = {
  compensation: 'http://localhost:8036',
  calendar: 'http://localhost:8037',
  messaging: 'http://localhost:8038',
  notification: 'http://localhost:8039',
  performance: 'http://localhost:8100',  // Updated to match running service
  workflow: 'http://localhost:8098',
  document: 'http://localhost:8095',     // Corrected port
  policy: 'http://localhost:8097',       // Corrected port
  configuration: 'http://localhost:8096', // Corrected port
};

const createApiClient = (baseURL: string) => {
  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const tenantId = localStorage.getItem('tenantId') || 'techcorp';
      config.headers['X-Tenant-ID'] = tenantId;

      // Always set X-User-ID for all requests
      config.headers['X-User-ID'] = 'demo-user-123';

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 401:
            toast.error('Session expired');
            break;
          case 403:
            toast.error('Access denied');
            break;
          case 429:
            toast.error('Too many requests');
            break;
          case 500:
            toast.error(data.message || 'Server error');
            break;
          default:
            toast.error(data.message || 'An error occurred');
        }
      } else if (error.code === 'ERR_NETWORK') {
        toast.error('Backend service unavailable');
      }
      return Promise.reject(error);
    }
  );

  return client;
};

const apiClient = createApiClient(SERVICE_URLS.compensation);

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const tenantId = localStorage.getItem('tenantId') || 'gograbjob-b2b';
    config.headers['X-Tenant-ID'] = tenantId;

    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      config.headers['X-User-ID'] = userData.userId || 'demo-user';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          toast.error('Session expired');
          break;
        case 403:
          toast.error('Access denied');
          break;
        case 429:
          toast.error('Too many requests');
          break;
        case 500:
          toast.error(data.message || 'Server error');
          break;
        default:
          toast.error(data.message || 'An error occurred');
      }
    }
    return Promise.reject(error);
  }
);

// Compensation API
const compensationClient = createApiClient(SERVICE_URLS.compensation);
export const compensationAPI = {
  getAll: () => compensationClient.get('/api/compensation'),
  getById: (id: string) => compensationClient.get(`/api/compensation/${id}`),
  getByEmployee: (employeeId: string) => compensationClient.get(`/api/compensation/employee/${employeeId}`),
  create: (data: any) => compensationClient.post('/api/compensation', data),
  update: (id: string, data: any) => compensationClient.put(`/api/compensation/${id}`, data),
  approve: (id: string) => compensationClient.post(`/api/compensation/${id}/approve`),
  getStats: () => compensationClient.get('/api/compensation/stats'),
};

// Performance API
const performanceClient = createApiClient(SERVICE_URLS.performance);
export const performanceAPI = {
  getAllGoals: () => performanceClient.get('/api/goals'),
  getGoals: (employeeId: string) => performanceClient.get(`/api/goals/employee/${employeeId}`),
  createGoal: (data: any) => performanceClient.post('/api/goals', data),
  updateProgress: (id: string, progress: number) => performanceClient.put(`/api/goals/${id}/progress`, { progress }),
  completeGoal: (id: string) => performanceClient.post(`/api/goals/${id}/complete`),
  getReviews: (employeeId: string) => performanceClient.get(`/api/reviews/employee/${employeeId}`),
  getStats: () => performanceClient.get('/api/goals/stats'),
};

// Notification API
const notificationClient = createApiClient(SERVICE_URLS.notification);
export const notificationAPI = {
  getAll: () => notificationClient.get('/api/notifications'),
  getUnread: () => notificationClient.get('/api/notifications/unread'),
  getUnreadCount: () => notificationClient.get('/api/notifications/unread/count'),
  markAsRead: (id: string) => notificationClient.put(`/api/notifications/${id}/read`),
  markAllAsRead: () => notificationClient.put('/api/notifications/read-all'),
};

// Workflow API
const workflowClient = createApiClient(SERVICE_URLS.workflow);
export const workflowAPI = {
  getPendingTasks: () => workflowClient.get('/api/workflows/tasks/pending'),
  approveTask: (taskId: string, comments: string) => 
    workflowClient.post(`/api/workflows/tasks/${taskId}/approve`, { comments }),
  rejectTask: (taskId: string, comments: string) => 
    workflowClient.post(`/api/workflows/tasks/${taskId}/reject`, { comments }),
};

// Calendar API
const calendarClient = createApiClient(SERVICE_URLS.calendar);
export const calendarAPI = {
  getEvents: (startDate: string, endDate: string) => 
    calendarClient.get('/api/calendar/events', { params: { startDate, endDate } }),
  createEvent: (data: any) => calendarClient.post('/api/calendar/events', data),
  updateEvent: (id: string, data: any) => calendarClient.put(`/api/calendar/events/${id}`, data),
};

export default apiClient;

