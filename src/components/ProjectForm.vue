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
}
</script>

<template>
  <form @submit.prevent="updateProject()">
    <input type="text" v-model="project.name" placeholder="Project Name" required />
    <input type="text" v-model="project.order" placeholder="Priority Order" />
    <input type="text" v-model="project.link" placeholder="External Link" />
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
</style>
