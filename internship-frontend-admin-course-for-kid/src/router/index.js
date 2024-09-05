import { createRouter,  createWebHistory } from 'vue-router'
import store from '@/store'
import {useStore} from "vuex"
import {computed} from "vue"
import routes from './routes'

// const auth = computed(()=>store.state.auth)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const getAuth = computed(()=>store.getters.getAuth)

// router.beforeEach((to, from, next)=>{
//   if (to.matched.some(record =>record.meta.requiresAuth)) { 
//     // cek authentikasi user
//     if( getAuth.value === null){ 
//       // jika tidak login maka lempar ke login
//       next({
//         name: 'login'
//       });
//     }else{
//       // jika login maka lanjut ke dashboard
//       next()
//     }
//   }else{
//     next();
//   }
// })
export default router