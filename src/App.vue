<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ensureGoalCollection, storeGoalCollection } from './data-access';
import HistoryChart from './components/HistoryChart.vue';
import FileUploadForm from './components/FileUploadForm.vue';
import DownloadLink from './components/DownloadLink.vue';
import DailyList from './components/DailyList.vue';
import ArchivedGoalList from './components/ArchivedGoalList.vue';
import Projects from './views/Projects.vue';
import { getToday } from './helpers';
import Tasks from './views/Tasks.vue';
import DownloadEverythingLink from './components/DownloadEverythingLink.vue';
import ImportEverythingForm from './components/ImportEverythingForm.vue';
import type { Goal } from './models/goal';

const newGoal = ref("");
const toEdit = ref(-1);
const goals = ref<Goal[]>([]);
let today = getToday();

function addGoal(){
  goals.value.push({ 
    name: newGoal.value,
    addedOn: today,
    completedOn: [],
    isArchived: false
  });

  storeGoalCollection(goals.value);

  newGoal.value = '';
}

function handleInfoUploaded(data: Goal[]) {
  goals.value = data;

  newGoal.value = '';

  storeGoalCollection(goals.value);
}

onMounted(() => {
  goals.value = ensureGoalCollection();
});

</script>

<template>
  <h1>Daily Goals</h1>
  <hr>
  <form @submit.prevent="addGoal()">
    <input placeholder="Enter a new goal here" v-model="newGoal" required/>
    <button type="submit">Add it!</button>
  </form>
  <DownloadLink /> | 
  <FileUploadForm @infoUploaded="handleInfoUploaded($event)" />
  <DailyList v-if="goals.length > 0" :today="today" :goals="goals"/>
  <Tasks />
  <Projects />
  <ArchivedGoalList :goals="goals" />
  <HistoryChart v-if="goals.length > 0" :daysToShow="14" :goals="goals"/>
  <DownloadEverythingLink /> | <ImportEverythingForm />
  <!-- <RouterView /> -->
</template>

<style scoped>

form {
  display: inline-block;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 15px;
}
label, li form {
  margin-left: 15px;
  margin-right: 15px;
}
li form {
  margin-top: 0px;
  margin-bottom: 0px;
}
li form input[type="text"] {
  background-color: transparent;
  color: var(--color-text);
  border: 0px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
