<script setup lang="ts">
import { computed } from 'vue';
import type { Goal } from '../goal';
import { storeGoalCollection } from '../data-access';
import { completedToday, setCompletedOn } from '../helpers';

const show = computed(() => {
  if(props.goals === null || props.goals === undefined) {
    return false;
  }

  return props.goals.filter(x => x.isArchived === true).length > 0;
})
const props = defineProps<{
  goals: Goal[]
}>();

function restoreGoal(goal: Goal){
  goal.isArchived = false;
  storeGoalCollection(props.goals);
}
</script>

<template >
  <div v-show="show">
  <h2>Archive</h2>
  <hr/>
  <ul>
    <li v-for="(goal, i) in goals.filter(x => x.isArchived === true)" :key="i">
      {{ goal.name }}
      
      <font-awesome-icon icon="archive" @click="restoreGoal(goal)"></font-awesome-icon>
    </li>
  </ul>
</div>
</template>

<style scoped>

ul {
  padding-left: 0px;
}

li {
  text-transform: capitalize;
  list-style-type: none;
}

</style>
