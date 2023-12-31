<script setup lang="ts">
import type { Project } from '@/models/project';
import { ref } from 'vue';

const toEdit = ref(-1);
const props = defineProps<{
  project: Project
}>();

const emits = defineEmits(['projectUpdated']);

function updateProject() {
  // what to do here
  console.log('latest project update', props.project);
  emits('projectUpdated', props.project);
}
</script>

<template>
  <form @submit.prevent="updateProject()">
    <label>Project Name:</label>
    <input type="text" v-model="project.name" placeholder="Project Name" required />
    <label>Priority Order:</label>
    <input type="text" v-model="project.order" placeholder="Priority Order" />
    <label>Remaining Effort:</label>
    <input type="number" v-model="project.remainingEffort" placeholder="Remaining Effort" />
    <label>External Link:</label>
    <input type="text" v-model="project.link" placeholder="External Link" />
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
input {
  display: block;
  margin-bottom: 15px;
}
</style>
