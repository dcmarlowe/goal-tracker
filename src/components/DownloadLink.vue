<script setup lang="ts">
import { downloadGoals } from '../data-access';


function downloadData() {
  const urlString = downloadGoals();

  const anchor = document.createElement('a');
  anchor.href = urlString;
  anchor.download = `daily-goals.${Date.now()}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

</script>

<template>
  <a @click.prevent="downloadData()">Download Goals</a>
</template>
