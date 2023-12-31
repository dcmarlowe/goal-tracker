<script setup lang="ts">
import { storeProjectCollection } from '@/data-access';
import type { Project } from '@/models/project';
import { ref, onUpdated, onMounted } from 'vue';

const toEdit = ref(-1);
const props = defineProps<{
  projects: Array<Project>
}>();
const emits = defineEmits(['startEdit'])

function updateProjectName(project: Project) {
  storeProjectCollection(props.projects);
  toEdit.value = -1;
}

function archiveProject(project: Project){
  project.isArchived = true;
  storeProjectCollection(props.projects);
}
</script>

<template>
  <h2>Active Projects</h2>
  <hr/>
  <table>
    <thead>
      <tr>
        <th>
          Name (Link)
        </th>
        <th>
          Effort Left
        </th>
        <th>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(project, i) in projects.activeProjects()" :key="i">
        <td>
          <a :href="project.link" target="_blank" v-if="!!project.link">
            {{ project.name }}
          </a>
          <span v-else>
            {{ project.name }}
          </span>
        </td>
        <td>
          {{ project.remainingEffort || 'N/A' }}
        </td>
        <td>
          <font-awesome-icon v-if="toEdit !== i" icon="edit" @click="emits('startEdit', project)"></font-awesome-icon>
          <font-awesome-icon icon="archive" @click="archiveProject(project)"></font-awesome-icon>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
</style>
