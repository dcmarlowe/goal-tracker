<script setup lang="ts">
import { ref } from 'vue';
import type { Goal } from '../goal';
import { storeGoalCollection } from '../data-access';
import { completedToday, setCompletedOn } from '../helpers';

const toEdit = ref(-1);
const props = defineProps<{
  goals: Goal[],
  today: string
}>();

function updateGoal(goal: Goal) {
  storeGoalCollection(props.goals);
  toEdit.value = -1;
}

function goalChecked(goal: Goal, event: any) {

  setCompletedOn(goal, props.today, event.target.checked === true);
  storeGoalCollection(props.goals);
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
  storeGoalCollection(props.goals);
}
</script>

<template>
  <p>For {{ today }}</p>
  <ul>
    <li v-for="(goal, i) in goals.filter(x => x.isArchived !== true).applyDefaultSort()" :key="i">
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

ul {
  padding-left: 0px;
}

li {
  text-transform: capitalize;
  list-style-type: none;
}
li input,
li label,
li form {
  margin-right: 15px;
}
li svg {
  margin-right: 7px;
}
li form input[type="text"] {
  background-color: transparent;
  color: var(--color-text);
  border: 0px;
}

</style>
