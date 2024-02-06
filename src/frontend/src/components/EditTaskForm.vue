<template>
    <form class="edit-task-form">
      <button @click="goBackToProjectDetail">Voltar para o Projeto</button>
      <h3>Editar Tarefa</h3>
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
        <button @click.prevent="handleEditTask">Editar Tarefa</button>
      </div>
    </form>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import taskService from '@/services/taskService';
import projectService from '@/services/projectService';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
  
export default defineComponent({
  data() {
    return {
      projectId: null as number | null,
      taskId: null as number | null,
      taskName: '',
      taskDescription: '',
      dueDate: '',
      completed: false,
    };
  },
  async mounted() {
    await this.fetchTaskDetails();
  },
  methods: {
    async fetchTaskDetails() {
      this.projectId = parseInt(this.$route.params.projectId.toString(), 10) || null;
      this.taskId = parseInt(this.$route.params.taskId.toString(), 10) || null;

      try {
        const taskResponse = await taskService.getTaskById(this.projectId!, this.taskId!);
        const task = taskResponse.data;
        this.taskName = task.title;
        this.taskDescription = task.description;
        this.dueDate = new Date(task.due_date).toISOString().split('T')[0];
        this.completed = task.completed;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro: em carregar os detalhes das tarefas',
        });
      }
    },

    async goBackToProjectDetail() {
      if (this.projectId !== null && this.projectId !== undefined) {
        this.$router.push({ name: 'ProjectDetail', params: { id: this.projectId } });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro: projectId não está definido ou é nulo.!',
        });
      }
    },
    async handleEditTask() {
      try {
        if (!this.taskName || !this.taskDescription || !this.dueDate) {
          Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Por favor, preencha todos os campos antes de editar a tarefa.',
          });
          return;
        }
        
        const response = await taskService.updateTask(this.taskId!, {
          title: this.taskName,
          description: this.taskDescription,
          due_date: this.dueDate,
          completed: this.completed,
        });
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Tarefa editada com sucesso!',
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
  .edit-task-form {
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
  