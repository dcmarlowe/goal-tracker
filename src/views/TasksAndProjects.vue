<script setup lang="ts">
import { storeTaskCollection, ensureTaskCollection, storeProjectCollection, ensureProjectCollection } from '@/data-access';
import type { Project } from '@/models/project';
import { ref, onMounted } from 'vue';
import ProjectForm from '@/components/ProjectForm.vue';
import ProjectList from '@/components/ProjectList.vue';
import type { Task } from '@/models/task';

// @ts-ignore
const tasks = ref<Task[]>([]);
const projectToEdit = ref<Project>();
const projects = ref<Project[]>([]);
const newItemName = ref("");

function addNewItem() {
  let newProj: Project = {
    name: newItemName.value,
    order: 0,
    isArchived: false,
    link: '',
    progressedOn: []
  };

  projects.value.push(newProj);

  storeProjectCollection(projects.value);

  newItemName.value = '';
}

function handleProjectUpdated() {
  storeProjectCollection(projects.value);
  // @ts-ignore
  toEdit.value = null;
}

onMounted(() => {
  tasks.value = ensureTaskCollection();
  projects.value = ensureProjectCollection();
});

function taskChecked(task: Task, event: any) {
  task.isComplete =  event.target.checked === true;
  storeTaskCollection(tasks.value);
}

function deleteTask(task: Task) {
    const index = tasks.value.indexOf(task);

    if(index > -1) {
      tasks.value.splice(index, 1);
    }

    storeTaskCollection(tasks.value);
}
</script>

<template>
  <h1>Tasks and Projects</h1>
  <hr />
  <form @submit.prevent="addNewItem()">
    <input placeholder="Add a new project/task here" v-model="newItemName" required/>
    <button type="submit">Add it!</button>
  </form>
  <ProjectList :projects="projects" @startEdit="projectToEdit = $event" />
  <ProjectForm :project="projectToEdit" v-if="projectToEdit !== null && projectToEdit !== undefined" @projectUpdated="handleProjectUpdated()" />

</template>

<style scoped>
</style>
