<script setup lang="ts">
import { ref, onUpdated, onMounted } from 'vue';
import type { Goal } from '@/models/goal';
import { completedToday, setCompletedOn } from '../helpers';
import {storeWeeklyGoalCollection} from '../data-access/weekly-goals.data-access';

const toEdit = ref(-1);
const props = defineProps<{
  goals: Array<Goal>,
  currentWeek: string,
  today: string
}>();

function updateGoal(goal: Goal) {
  storeWeeklyGoalCollection(props.goals);
  toEdit.value = -1;
}

function goalChecked(goal: Goal, event: any) {

  setCompletedOn(goal, props.today, event.target.checked === true);
  storeWeeklyGoalCollection(props.goals);
}

function startEdit(i: number) {
  toEdit.value = i;
  setTimeout(() => {
    const editBox = document.getElementById(`tbGoalName${i}`);
    console.log(editBox);
    editBox?.focus();
  }, 250);
}
function archiveGoal(goal: Goal){
  goal.isArchived = true;
  storeWeeklyGoalCollection(props.goals);
}
onUpdated(() => {
  console.log('goals in daily list', props.goals.active);
});
onMounted(() => {
  console.log('goals in daily list', props.goals.active);
});
</script>

<template>
  <p>For the week starting on {{ currentWeek }}</p>
  <ul>
    <li v-for="(goal, i) in goals.active()" :key="i">
      <input type="checkbox" :checked="completedToday(goal)" @change="event => goalChecked(goal, event)" :id="'goal'+i" />
      <form v-show="toEdit === i" @submit.prevent="updateGoal(goal)">
        <input type="text" v-model="goal.name" required onfocus="this.select();" :id="'tbGoalName'+i"/>
        <button type="submit"><font-awesome-icon icon="check"></font-awesome-icon></button>
      </form>
      <label v-if="toEdit !== i" :for="'goal'+i">{{ goal.name }}</label>
      <font-awesome-icon v-if="toEdit !== i" icon="edit" @click="startEdit(i)"></font-awesome-icon>
      <font-awesome-icon icon="archive" @click="archiveGoal(goal)"></font-awesome-icon>
    </li>
  </ul>
</template>

<style scoped>

form {
  display: inline-block;
}

</style>
