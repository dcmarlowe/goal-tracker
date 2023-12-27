<script setup lang="ts">
import {storeWeeklyGoalCollection, ensureWeeklyGoalCollection} from '@/data-access/weekly-goals.data-access';
import { getCurrentWeekStartDate, getToday } from '@/helpers';
import type { Goal } from '@/models/goal';
import { ref, onMounted } from 'vue';
import WeeklyList from '@/components/WeeklyList.vue';
import ArchivedGoalList from '@/components/ArchivedGoalList.vue';
import HistoryChart from '@/components/HistoryChart.vue';

const newGoal = ref("");
const goals = ref<Goal[]>([]);
let thisWeek = getCurrentWeekStartDate();
let today = getToday();

function addGoal(){
  goals.value.push({ 
    name: newGoal.value,
    addedOn: today,
    completedOn: [],
    isArchived: false
  });

  storeWeeklyGoalCollection(goals.value);

  newGoal.value = '';
}

function handleInfoUploaded(data: Goal[]) {
  goals.value = data;

  newGoal.value = '';

  storeWeeklyGoalCollection(goals.value);
}

onMounted(() => {
  goals.value = ensureWeeklyGoalCollection();
});

</script>

<template>
  <h1>Weekly Goals</h1>
  <hr>
  <form @submit.prevent="addGoal()">
    <input placeholder="Enter a new goal here" v-model="newGoal" required/>
    <button type="submit">Add it!</button>
  </form> 
  <WeeklyList v-if="goals.length > 0" :today="today" :currentWeek="thisWeek" :goals="goals"/>
  <!-- <ArchivedGoalList :goals="goals" />
  <HistoryChart v-if="goals.length > 0" :daysToShow="14" :goals="goals"/> -->
</template>