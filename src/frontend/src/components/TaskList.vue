<template>
  <div class="task-list">
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <div class="button-container">
          <button @click="editTask(task.id)" class="edit-task-button">Editar Tarefa</button>
          <button @click="deleteTask(task.id)" class="delete-task-button">Deletar Tarefa</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    editTask(taskId) {
    },
    deleteTask(taskId) {
    },
  },
};
</script>

<style scoped lang="scss">
.task-list {
  max-width: 400px;
  margin: 0 auto;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 8px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        color: #333;
        font-size: 18px;
        margin-bottom: 8px;
      }

      p {
        color: #666;
      }

      .button-container {
        display: flex;

        .edit-task-button {
          background-color: #2196f3; /* Cor azul */
          color: #fff;
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 8px;

          &:hover {
            background-color: #0d8bf2; /* Cor azul mais escura no hover */
          }
        }

        .delete-task-button {
          background-color: #ff6347;
          color: #fff;
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            background-color: #ff3b36;
          }
        }
      }
    }
  }
}
</style>
