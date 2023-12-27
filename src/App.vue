<script setup lang="ts">
import DownloadEverythingLink from './components/DownloadEverythingLink.vue';
import ImportEverythingForm from './components/ImportEverythingForm.vue';
</script>

<template>
  <nav>
    <RouterLink to="/">Daily Goals</RouterLink> |
    <RouterLink to="/weekly-goals">Weekly Goals</RouterLink> |
    <RouterLink to="/tasks">Tasks</RouterLink> |
    <RouterLink to="/projects">Projects</RouterLink> 
  </nav>
  <RouterView />
  <footer>
    <DownloadEverythingLink /> | 
    <ImportEverythingForm />
  </footer>
</template>