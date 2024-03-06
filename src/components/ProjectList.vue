<script setup lang="ts">
import { storeProjectCollection } from '@/data-access';
import { array_move } from '@/helpers';
import type { Project } from '@/models/project';
import { ref, onUpdated, onMounted } from 'vue';

const toEdit = ref(-1);
const showArchived = ref(false);
const props = defineProps<{
  projects: Array<Project>
}>();
const emits = defineEmits(['startEdit'])

function archiveProject(project: Project, index: number){
  console.log('archiving', index, project);
  project.isArchived = true;
  array_move(props.projects, index, props.projects.length - 1);
  storeProjectCollection(props.projects);
}

function moveDown(i: number){
  array_move(props.projects, i, i + 1);
  storeProjectCollection(props.projects);
}

function moveUp(i: number){
  array_move(props.projects, i, i - 1);
  storeProjectCollection(props.projects);
}

function moveToTop(i: number){
  array_move(props.projects, i, 0);
  storeProjectCollection(props.projects);
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>
          Name (Link)
        </th>
        <th class="hide-on-mobile">
          Effort Left
        </th>
        <th>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(project, i) in projects" :key="i">
        <tr v-show="(project.isArchived === false || showArchived === true)">
          <td>  
            <span v-if="project.isArchived == true">
              Archived -
            </span>
            <span v-else class="hide-on-mobile">
              {{ i + 1 }} - 
            </span>
            <a :href="project.link" target="_blank" v-if="!!project.link">
              {{ project.name }}
            </a>
            <span v-else>
              {{ project.name }}
            </span>
          </td>
          <td class="hide-on-mobile">
            <span v-if="project.isArchived == false">
              {{ project.remainingEffort || 'N/A' }}
            </span>
          </td>
          <td>
            <font-awesome-icon v-if="toEdit !== i" icon="edit" @click="emits('startEdit', project)"></font-awesome-icon>
            <font-awesome-icon icon="archive" @click="archiveProject(project, i)"></font-awesome-icon>
            <font-awesome-icon icon="arrow-down" @click="moveDown(i)" v-if="i < (projects.length - 1)"></font-awesome-icon>
            <template v-if="i !== 0">
              <font-awesome-icon icon="arrow-up" @click="moveUp(i)"></font-awesome-icon>  
              <a @click="moveToTop(i)" class="hide-on-mobile"> To Top</a>
            </template>
            
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
a {
  padding: 0px !important;
}

</style>
