<template>
  <form class="new-project-form">
    <router-link to="/" class="back-to-home-button">Voltar para Home</router-link>
    <h3>Criar Novo Projeto</h3>
    <div class="form-group">
      <label for="projectName">Nome do Projeto:</label>
      <input type="text" id="projectName" v-model="projectName" />
    </div>
    <div class="form-group">
      <label for="projectDescription">Descrição:</label>
      <textarea id="projectDescription" v-model="projectDescription"></textarea>
    </div>
    <div class="form-group">
      <label for="startDate">Data de Início:</label>
      <input type="date" id="startDate" v-model="startDate" />
    </div>
    <div class="form-group">
      <button @click.prevent="handleCreateProject">Criar Projeto</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import projectService from '@/services/projectService';
import Swal from 'sweetalert2';

export default defineComponent({
  data() {
    return {
      projectName: '',
      projectDescription: '',
      startDate: '',
    };
  },
  methods: {
    async handleCreateProject() {
      try {
        const response = await projectService.createProject({
          name: this.projectName,
          description: this.projectDescription,
          start_date: this.startDate,
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Projeto criado com sucesso!',
        });

        this.$router.push({ name: 'ProjectDetail', params: { id: response.data.id } });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro, por favor tenta novamente!',
        });
      }
    },
  },
});
</script>


<style scoped lang="scss">
.new-project-form {
  max-width: 400px;
  margin: 0 auto;

  h3 {
    color: #333;
    font-size: 20px;
    margin-bottom: 15px;
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
      color: #555;
    }

    input,
    textarea,
    select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 5px;
    }

    textarea {
      height: 80px;
    }
  }

  .back-to-home-button {
    background-color: #ccc;
    color: #333;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
      background-color: #999;
    }
  }

  button {
    background-color: #3498db;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #217dbb;
    }
  }
}
</style>
