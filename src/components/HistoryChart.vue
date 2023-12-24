<template>

  <h2>Tracker</h2>
  <hr/>
  <div class="row" v-for="goal in goals.filter(x => x.isArchived !== true)" :key="goal.name" >
    <p>{{ goal.name }}</p>
    <div class="dateBlock" v-for="(day, i) in days" :key="day" v-bind:completed="completedOn(goal, day)" @click="toggleCompleted(goal, day)">{{ day.substring(5) }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Goal } from '@/goal';
import { onMounted, ref } from 'vue';
import { completedOn, formatDate, toggleCompletedOn } from '@/helpers';
import { storeGoalCollection } from '@/data-access';

const props = defineProps<{
  daysToShow: number,
  goals: Goal[]
}>();

const days = ref<string[]>([]);

onMounted(() => {
  let dayCount = props.daysToShow;
  if(dayCount === null || dayCount === undefined || dayCount === 0) {
    dayCount = 14;
  }

  for(var i = dayCount - 1; i >= 0; i--) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    days.value.push(formatDate(d));
  }
  
  let allCompletionDates = props.goals.filter(x => x.isArchived !== true).flatMap(x => x.completedOn);
  console.log('all completion dates', allCompletionDates);
  if(allCompletionDates.length > 0){
    allCompletionDates.sort((x, y) => x < y ? -1 : 1);
    console.log('sorted completion dates', allCompletionDates);
    let oldestDate = allCompletionDates[0];

    days.value = days.value.filter(x => x >= oldestDate);
  }
});

function toggleCompleted(goal:Goal, day: string) {

  toggleCompletedOn(goal, day);
  storeGoalCollection(props.goals);
}
</script>

<style scoped>
p{
  font-size: 1.25rem;
}
.row{
  width: 100%;
}
.dateBlock {
  width: 60px;
  height: 50px;
  display: inline-block;
  font-size: 1rem;
  border-bottom: 1px dotted black;
  border-right: 1px dotted black;
  text-align: center;
  vertical-align: center;
  padding-top: 10px;
  cursor: pointer;
}
.dateBlock[completed='true'] {
  background-color: green;
}
.dateBlock[completed='false'] {
  background-color: darkgray;
  color: black;
}
</style>