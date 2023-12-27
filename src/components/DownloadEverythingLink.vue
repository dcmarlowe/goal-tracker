<script setup lang="ts">
import { downloadEverything } from '../data-access';


function downloadData() {
  const urlString = downloadEverything();

  const anchor = document.createElement('a');
  anchor.href = urlString;
  anchor.download = `everything.${Date.now()}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

</script>

<template>
  <a @click.prevent="downloadData()">Download Everything</a>
</template>
