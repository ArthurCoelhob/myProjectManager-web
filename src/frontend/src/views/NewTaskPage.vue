  <template>
    <div class="new-task-page">
      <h2>Criar Nova Tarefa</h2>
      <NewTaskForm />
    </div>
  </template>
  
  <script>
  import NewTaskForm from '@/components/NewTaskForm.vue';
  
  export default {
    components: {
      NewTaskForm,
    },
  };
  </script>
  
  <style scoped lang="scss">
  .new-task-page {
    padding: 20px;
  
    h2 {
      color: #333;
      font-size: 24px;
      margin-bottom: 20px;
    }
  }
  </style>
  