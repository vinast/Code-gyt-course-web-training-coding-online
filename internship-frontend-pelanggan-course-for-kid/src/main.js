import { createApp } from 'vue'
import components from './components';
import store from './store/index'
import 'vue3-easy-data-table/dist/style.css';
import App from './App.vue'
import router from './router'
import './style.css'
import 'animate.css';
const app = createApp(App)
components(app)
app.use(router)
app.use(store)
app.mount('#app')
