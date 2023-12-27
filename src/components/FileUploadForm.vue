<template>
  <a @click.prevent="show = !show">Import</a>
  <div v-show="show" >
    <hr/>
    <form @submit.prevent="handleUpload" ref="uploadDocumentForm">
      <input type="file" id="fileupload" name="fileupload" required />
      <button type="submit">Import</button>
    </form>
    <hr/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const show = ref(false);

const emits = defineEmits(['infoUploaded']);

function handleUpload() {
  const uploadControl: HTMLInputElement = document.getElementById('fileupload') as HTMLInputElement;

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
      emits('infoUploaded', json);
      show.value = false;
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