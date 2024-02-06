<template>
  <form class="new-task-form">
    <router-link :to="{ name: 'ProjectDetail', params: { id: projectId } }" class="back-to-project-button">Voltar para o projeto</router-link>
    <h3>Criar Nova Tarefa</h3>
    <div class="form-group">
      <label for="taskName">Nome da Tarefa:</label>
      <input type="text" id="taskName" v-model="taskName" />
    </div>
    <div class="form-group">
      <label for="taskDescription">Descrição:</label>
      <textarea id="taskDescription" v-model="taskDescription"></textarea>
    </div>
    <div class="form-group">
      <label for="dueDate">Data de Vencimento:</label>
      <input type="date" id="dueDate" v-model="dueDate" />
    </div>
    <div class="form-group">
        <label for="completed">Concluída:</label>
        <input type="checkbox" id="completed" v-model="completed" />
      </div>
    <div class="form-group">
      <button @click.prevent="handleCreateTask">Criar Tarefa</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import taskService from '@/services/taskService';
import projectService from '@/services/projectService';
import Swal from 'sweetalert2';

import { format } from 'date-fns';

export default defineComponent({
  data() {
    return {
      projectId: null as number | null,
      taskName: '',
      taskDescription: '',
      dueDate: '',
      completed: false,
    };
  },
  async mounted() {
    await this.fetchProjectDetails();
  },
  methods: {
    async fetchProjectDetails() {
      this.projectId = parseInt(this.$route.params.id.toString()) || null;
    },
    async handleCreateTask() {
      try {
        if (!this.taskName || !this.taskDescription || !this.dueDate) {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Por favor, preencha todos os campos antes de criar a tarefa.',
          });
          return;
        }

        const response = await taskService.createTask({
          title: this.taskName,
          description: this.taskDescription,
          due_date: this.dueDate,
          completed: this.completed,
          projectId: this.projectId!,
        });
        
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Tarefa criada com sucesso!',
        });

        this.$router.push({ name: 'ProjectDetail', params: { id: this.projectId } });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro, por favor tenta novamente!',
        });
      }
    }
  },
});
</script>

<style scoped lang="scss">
.new-task-form {
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

  .back-to-project-button {
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
