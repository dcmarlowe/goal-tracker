<script setup lang="ts">
import { storeTaskCollection, ensureTaskCollection } from '@/data-access';
import type { Project } from '@/models/project';
import { ref, onMounted } from 'vue';
import ProjectForm from '@/components/ProjectForm.vue';
import ProjectList from '@/components/ProjectList.vue';
import type { Task } from '@/models/task';

// @ts-ignore
const tasks = ref<Task[]>([]);
const newTaskName = ref("");

function addNewTask() {
  let newTask: Task = {
    name: newTaskName.value,
    isComplete: false,
    addedOn: (new Date()).toISOString()
  }

  tasks.value.push(newTask);
  newTaskName.value = '';

  storeTaskCollection(tasks.value);
}

onMounted(() => {
  tasks.value = ensureTaskCollection();
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
  <h1>Tasks</h1>
  <hr />
  <form @submit.prevent="addNewTask()">
    <input placeholder="Enter a new task" v-model="newTaskName" required/>
    <button type="submit">Add it!</button>
  </form>
  <ul>
    <li v-for="(task, i) in tasks" :key="i">
      <input type="checkbox" :checked="task.isComplete == true" @change="event => taskChecked(task, event)" :id="'cbTask'+i" />
      <label :for="'cbTask'+i">{{ task.name }}</label>
      <font-awesome-icon icon="trash" @click="deleteTask(task)"></font-awesome-icon>
    </li>
  </ul>
</template>

<style scoped>
</style>
