<template>
  <div class="project-detail">
    <h2>Detalhes do Projeto</h2>
    <p>Id do Projeto: {{ project.id}}</p>
    <p>Nome do Projeto: {{ project.name }}</p>
    <p>Descrição: {{ project.description }}</p>
    <p>Data de Início: {{ formatDate(project.start_date) }}</p>

    <h3>Tarefas</h3>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <div class="task-card">
          <h4>{{ task.title }}</h4>
          <p>Descrição: {{ task.description }}</p>
          <p>Data de Vencimento: {{ task.due_date }}</p>
          <p>Concluída: {{ task.completed ? 'Sim' : 'Não' }}</p>
          <div class="button-group">
            <button class="delete-button" @click="deleteTask(task.id)">Excluir</button>
            <button class="edit-button" @click="editTask(project.id, task.id)">Editar</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import projectService from '@/services/projectService';
import taskService from '@/services/taskService';

interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
}

export default defineComponent({
  data() {
    return {
      project: {
        id: 0,
        name: '',
        description: '',
        start_date: '',
      } as Project,
      tasks: [] as Task[],
      newTaskName: '',
    };
  },
  async mounted() {
    await this.fetchProjectDetails();
  },
  methods: {
    async fetchProjectDetails() {
      const projectId = parseInt(this.$route.params.id.toString()) || null;

      if (projectId !== null) {
        try {
          const projectResponse = await projectService.getProjectById(projectId);
          this.project = {
            ...projectResponse.data,
            start_date: new Date(projectResponse.data.start_date).toISOString().split('T')[0],
          };
          
          const tasksResponse = await taskService.getTasksByProjectId(projectId);
          this.tasks = tasksResponse.data as Task[];
        } catch (error) {
          console.error('Error fetching project details:', error);
        }
      }
    },
    async deleteTask(taskId: number) {
    try {
      await taskService.deleteTask(taskId);
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  },
    async editTask(projectId: number, taskId: number) {
      this.$router.push(`/edit-task/${projectId}/${taskId}`);
    },
    formatDate(date: string): string {
      return date;
    },
  },
});
</script>

<style scoped lang="scss">
.project-detail {
  max-width: 600px;
  margin: 0 auto;

  h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 15px;
  }

  p {
    color: #666;
    margin-bottom: 20px;
  }

  h3 {
    color: #333;
    font-size: 18px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      cursor: pointer;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 10px;

      .task-card {
        background-color: #f0f0f0;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s;

        &:hover {
          background-color: #e0e0e0;
        }

        h4 {
          color: #333;
          font-size: 18px;
          margin-bottom: 8px;
        }

        p {
          color: #666;
        }

        .button-group {
          margin-top: 10px;

          button {
            margin-right: 10px;
            cursor: pointer;
            border: none;
            padding: 8px;
            border-radius: 4px;
            transition: background-color 0.3s;

            &.delete-button {
              background-color: #f44336;
              color: #fff;

              &:hover {
                background-color: #d32f2f;
              }
            }

            &.edit-button {
              background-color: #2196f3;
              color: #fff;

              &:hover {
                background-color: #0e77ca;
              }
            }
          }
        }
      }
    }
  }
}
</style>
