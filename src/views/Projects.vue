<script setup lang="ts">
import { ensureProjectCollection, storeProjectCollection } from '@/data-access';
import type { Project } from '@/models/project';
import { ref, onMounted } from 'vue';
import ProjectForm from '@/components/ProjectForm.vue';
import ProjectList from '@/components/ProjectList.vue';

// @ts-ignore
const toEdit = ref<Project>(null);
const projects = ref<Project[]>([]);
const newProjectName = ref("");

function addNewProject() {
  let newProj: Project = {
    name: newProjectName.value,
    order: 0,
    isArchived: false,
    link: '',
    progressedOn: []
  };

  projects.value.push(newProj);

  storeProjectCollection(projects.value);

  newProjectName.value = '';
}

onMounted(() => {
  projects.value = ensureProjectCollection();
});

function handleProjectUpdated() {
  storeProjectCollection(projects.value);
  // @ts-ignore
  toEdit.value = null;
}
</script>

<template>
  <h1>Projects</h1>
  <hr />
  <form @submit.prevent="addNewProject()">
    <input placeholder="Enter a new project name here" v-model="newProjectName" required/>
    <button type="submit">Add it!</button>
  </form>
  <ProjectList :projects="projects" @startEdit="toEdit = $event" />
  <ProjectForm :project="toEdit" v-if="toEdit !== null" @projectUpdated="handleProjectUpdated()" />
</template>

<style scoped>
</style>
