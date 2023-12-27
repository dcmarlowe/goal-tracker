import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faEdit, faCheck, faArchive, faTrash } from '@fortawesome/free-solid-svg-icons'
import router from './router'
import { loadGoalExtensions } from './models/goal'
import { loadProjectExtensions } from './models/project'

loadGoalExtensions();
loadProjectExtensions();

/* add icons to the library */
library.add(faEdit, faCheck, faArchive, faTrash)
const app = createApp(App)

app.use(router)

app
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
