<template>
  <a @click.prevent="show = !show">Import Everything</a>
  <div v-show="show" >
    <hr/>
    <form @submit.prevent="handleUpload" ref="uploadEverythingForm">
      <input type="file" id="everythingupload" name="everythingupload" required />
      <button type="submit">Import</button>
    </form>
    <hr/>
  </div>
</template>

<script setup lang="ts">
import { storeGoalCollection, storeProjectCollection, storeTaskCollection } from '@/data-access';
import { ref } from 'vue';


const show = ref(false);

const emits = defineEmits(['infoUploaded']);

function handleUpload() {
  const uploadControl: HTMLInputElement = document.getElementById('everythingupload') as HTMLInputElement;

  if(uploadControl.files === null) {
    throw 'cant find file to upload';
  }

  var file = uploadControl.files[0];
  
  readJsonFile(file);
}

function readJsonFile(file: File) {
  console.log('reading file', file);
  var reader = new FileReader();

  reader.onload = (evt) => {
    if(evt.target !== null && evt.target.result !== null) {
      let json = JSON.parse(evt.target.result?.toString());
      console.log('file contents', json);

      storeGoalCollection(json.goals || []);
      storeProjectCollection(json.projects || []);
      storeTaskCollection(json.tasks || []);

      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }

  reader.readAsText(file);
}

</script>

<style scoped>
hr {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>