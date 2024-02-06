<template>
    <div class="edit-task-page">
      <EditTaskForm />
    </div>
  </template>
  
  <script>
  import EditTaskForm from '@/components/EditTaskForm.vue';
  
  export default {
    components: {
      EditTaskForm,
    },
  };
  </script>
  
  <style scoped lang="scss">
  .edit-task-page {
    padding: 20px;
  
    h2 {
      color: #333;
      font-size: 24px;
      margin-bottom: 20px;
    }
  }
  </style>
  