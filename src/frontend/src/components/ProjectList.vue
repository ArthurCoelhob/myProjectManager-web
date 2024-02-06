<template>
  <div class="project-list">
    <h2>Lista de Projetos</h2>
    <ul>
      <li v-for="project in projects" :key="project.id" @click="viewProjectDetails(project.id)">
        <h3>{{ project.name }}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
import projectService from '@/services/projectService';

export default {
  data() {
    return {
      projects: [],
    };
  },
  mounted() {
    this.loadProjects();
  },
  methods: {
    async loadProjects() {
      try {
        const response = await projectService.getAllProjects();
        this.projects = response.data;
      } catch (error) {
        console.error('Erro ao carregar projetos:', error.message);
      }
    },
    viewProjectDetails(projectId) {
      this.$router.push({ name: 'ProjectDetail', params: { id: projectId } });
    },
  },
};
</script>

<style scoped lang="scss">
.project-list {
  max-width: 600px;
  margin: 0 auto;

  h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      cursor: pointer;
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 8px;
      margin-bottom: 15px;

      h3 {
        color: #333;
        font-size: 18px;
        margin-bottom: 8px;
      }

      p {
        color: #666;
      }

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
}
</style>
