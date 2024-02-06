<!-- ProjectDetailPage.vue -->
<template>
  <div class="project-detail-page">
    <div>
      <button @click="navigateToHome" class="back-button">Voltar para Home</button>
      <button @click="navigateToNewTask" class="add-task-button">Adicionar Nova Tarefa</button>
      <button @click="navigateToEditProject" class="edit-project-button">Editar Projeto</button>
      <button @click="deleteProject" class="delete-project-button">Deletar Projeto</button>
    </div>
    <ProjectDetail :project="project" :tasks="tasks" />
  </div>
</template>

<script>
import ProjectDetail from '@/components/ProjectDetail.vue';
import projectService from '@/services/projectService';
import taskService from '@/services/taskService';

export default {
  components: {
    ProjectDetail,
  },
  data() {
    return {
      project: {
        id: 0,
        name: '',
        description: '',
        start_date: '',
      },
      tasks: [],
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
          this.tasks = tasksResponse.data;
        } catch (error) {
          console.error('Error fetching project details:', error);
        }
      }
    },
    async deleteTask(taskId) {
      try {
        await taskService.deleteTask(taskId);
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
    navigateToHome() {
      this.$router.push('/');
    },
    navigateToNewTask() {
      this.$router.push(`/new-task/${this.project.id}`);
    },
    navigateToEditProject() {
      this.$router.push(`/edit-project/${this.project.id}`);
    },
    async deleteProject() {
      const projectId = this.project.id;

      try {
        await projectService.deleteProject(projectId);
        console.log('Projeto excluído com sucesso');

        this.$router.push('/');
      } catch (error) {
        console.error('Erro ao excluir projeto:', error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.project-detail-page {
  padding: 20px;

  h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.3s;

    &:hover {
      filter: brightness(90%);
    }
  }

  .back-button {
    background-color: #ccc;
    &:hover {
      background-color: #999;
    }
  }

  .add-task-button {
    background-color: #4caf50;
    color: #fff;
    &:hover {
      background-color: #45a049;
    }
  }

  .edit-project-button {
    background-color: #2196f3;
    color: #fff;
    &:hover {
      background-color: #0e77ca;
    }
  }

  .delete-project-button {
    background-color: #f44336;
    color: #fff;
    &:hover {
      background-color: #d32f2f; 
    }
  }
}
</style>
