import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import '@/styles/app.css'
import '@/styles/page-example-common-style.css'
import { plugin, defaultConfig } from '@formkit/vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import '@purge-icons/generated'


const app = createApp(App)

app.use(router)
app.use(store)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(plugin, defaultConfig)
app.mount('#app')
