import api from './api';

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  projectId: number;
}

export default {
  getTasksByProjectId(projectId: number) {
    return api.get<Task[]>(`/task/${projectId}`);
  },
  getTaskById(projectId: number, taskId: number) {
    return api.get<Task>(`/task/${projectId}/${taskId}`);
  },
  createTask(data: Omit<Task, 'id'>) {
    return api.post('/task', data);
  },
  updateTask(taskId: number, data: Partial<Task>) {
    return api.put(`/task/${taskId}`, data);
  },
  deleteTask(taskId: number) {
    return api.delete(`/task/${taskId}`);
  },
};
