<template>
  <div class="home-view">
    <header>
      <h1>My Project Manager</h1>
      <button @click="navigateToNewProject" class="add-project-button">Adicionar Projeto</button>
    </header>
    <ProjectList :projects="projects" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'; 
import ProjectList from '@/components/ProjectList.vue';

export default {
  components: {
    ProjectList,
  },
  data() {
    return {

      projects: [
        { id: 1, title: 'Projeto 1', description: 'Descrição do Projeto 1', tasks: [] },
        { id: 2, title: 'Projeto 2', description: 'Descrição do Projeto 2', tasks: [] },
      ],
    };
  },
  setup() {
    const router = useRouter();
      
    const navigateToNewProject = () => {
      router.push('/new-project');
    }; // Correção: remova a vírgula aqui

    return {
      navigateToNewProject
    };
  },
};
</script>

<style scoped lang="scss">
.home-view {
  padding: 20px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
      color: #333;
      font-size: 28px;
    }

    .add-project-button {
      background-color: #4caf50;
      color: #fff;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #45a049;
      }
    }
  }
}
</style>

