<script setup lang="ts">
import { ensureGoalCollection, storeGoalCollection } from '@/data-access';
import { getToday } from '@/helpers';
import type { Goal } from '@/models/goal';
import { ref, onMounted } from 'vue';
import FileUploadForm from '@/components/FileUploadForm.vue';
import DailyList from '@/components/DailyList.vue';
import ArchivedGoalList from '@/components/ArchivedGoalList.vue';
import HistoryChart from '@/components/HistoryChart.vue';

const newGoal = ref("");
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
  <FileUploadForm @infoUploaded="handleInfoUploaded($event)" />
  <DailyList v-if="goals.length > 0" :today="today" :goals="goals"/>
  <ArchivedGoalList :goals="goals" />
  <HistoryChart v-if="goals.length > 0" :daysToShow="14" :goals="goals"/>
</template>