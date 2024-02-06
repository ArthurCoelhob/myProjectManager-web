import api from './api';

interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
}

export default {
  getAllProjects() {
    return api.get('/project');
  },
  getProjectById(id: number) {
    return api.get<Project>(`/project/${id}`);
  },
  createProject(data: Omit<Project, 'id'>) {
    return api.post('/project', data);
  },
  updateProject(id: number, data: Omit<Project, 'id'>) {
    return api.put(`/project/${id}`, data);
  },
  deleteProject(id: number) {
    return api.delete(`/project/${id}`);
  },
};
