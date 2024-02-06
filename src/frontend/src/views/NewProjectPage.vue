<template>
  <div class="new-project-page">
    <NewProjectForm />
  </div>
</template>

<script>
import NewProjectForm from '@/components/NewProjectForm.vue';

export default {
  components: {
    NewProjectForm,
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
