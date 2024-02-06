<template>
  <div class="edit-project-page">
    <EditProjectForm />
  </div>
</template>

<script>
import EditProjectForm from '@/components/EditProjectForm.vue';

export default {
  components: {
    EditProjectForm,
  },
};
</script>

<style scoped lang="scss">
.new-project-page {
  padding: 20px;

  h2 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
  }
}
</style>
