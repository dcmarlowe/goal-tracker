<script setup lang="ts">
import { downloadAll } from '../data-access';


function downloadData() {
  const urlString = downloadAll();

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
