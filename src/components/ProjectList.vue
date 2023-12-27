<script setup lang="ts">
import { storeProjectCollection } from '@/data-access';
import type { Project } from '@/models/project';
import { ref, onUpdated, onMounted } from 'vue';

const toEdit = ref(-1);
const props = defineProps<{
  projects: Array<Project>
}>();

function updateProjectName(project: Project) {
  storeProjectCollection(props.projects);
  toEdit.value = -1;
}

function startEdit(i: number) {
  // toEdit.value = i;
  // setTimeout(() => {
  //   const editBox = document.getElementById(`tbProjectName${i}`);
  //   console.log(editBox);
  //   editBox?.focus();
  // }, 250);
}
function archiveProject(project: Project){
  project.isArchived = true;
  storeProjectCollection(props.projects);
}
</script>

<template>
  <h2>Active Projects</h2>
  <hr/>
  <ol>
    <li v-for="(project, i) in projects.activeProjects()" :key="i">
      <!-- todo - edit functionality -->
      {{ project.name }}
      <font-awesome-icon v-if="toEdit !== i" icon="edit" @click="startEdit(i)"></font-awesome-icon>
      <font-awesome-icon icon="archive" @click="archiveProject(project)"></font-awesome-icon>
    </li>
  </ol>
</template>

<style scoped>
ul {
  padding-left: 0px;
}

li {
  text-transform: capitalize;
  list-style-type: none;
}
li input,
li label,
li form {
  margin-right: 15px;
}
li svg {
  margin-right: 7px;
}
li form input[type="text"] {
  background-color: transparent;
  color: var(--color-text);
  border: 0px;
}

</style>
