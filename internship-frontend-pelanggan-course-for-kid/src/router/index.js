import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import {computed} from "vue"

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFound from '../views/NotFound.vue'
import AuthLayout from '../components/Layout/AuthLayout.vue'

import DashboardView from '../views/user/DashboardView.vue'
import MyClassView from '../views/user/MyClassView.vue'
import ListClassView from '../views/user/ListClassView.vue'
import TransactionView from '../views/user/TransactionView.vue'



const routes= [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },



  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue')
    component: AboutView
  },
  {
    path:'/login',
    name:'login',
    component:LoginView,
  },
  {
    path:'/register',
    name:'register',
    component:RegisterView
  },
 
  {
    path:'/mydashboard',
    name:'authlayout',
    component: AuthLayout,
    meta:{
      requiresAuth: true
},
    children:[
      {
        path:'/dashboard',
        name:'dashboard',
        component: DashboardView
      },
      {
        path:'/myclass',
        name:'myclass',
        component: MyClassView
      },
      {
        path:'/transaction',
        name:'transaction',
        component: TransactionView
      },
      {
        path:'/list-class',
        name:'listclass',
        component: ListClassView
      },
      {
        path:'/edit-profile/:id',
        name:'edit-profile',
        component: ()=>import('../views/user/EditProfileView.vue')
    
      },
      {
        path:'/free-class/:id',
        name:'free-class',
        component:()=>import('../views/user/ClassGratisLayout.vue'),
        children:[
          {
            path:'',
            name:'class-detail',
            component:()=>import('../views/user/ClassGratisView.vue')
          },
          {
            path:'/free-content-details/:id',
            name:'free-details',
            component:()=>import('../views/user/ContentGratis.vue'),
          }
        ]
      },
      {
        path:'/checkout/:id',
        name: 'checkout',
        component: ()=>import('../views/user/CheckoutView.vue')
      },

      {
        path: '/transaksi',
        name: 'TransactionView',
        component: () => import('@/path/to/user/TransactionView.vue')
      },
      
      
      {
        path:'/class/:id',
        name:'classlayout',
        component:()=>import('../views/user/ClassDetailsLayout.vue'),
        children:[
          {
            path:'',
            name:'classdetail',
            component:()=>import('../views/user/ClassDetailView.vue')
          },
          {
            path:'/details/:id',
            name:'details',
            component:()=>import('../views/user/ContentDetails.vue'),
          }
        ]
      }
    ]
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "active"
})

const getAuth = computed(()=>store.getters.getAuth)
// router.beforeEach((to, from, next)=>{
//   if (to.matched.some(record =>record.meta.requiresAuth)) { 
//     // cek authentikasi user
//     if( getAuth.value === null){ 
//       // jika tidak login maka lempar ke login
//       next({
//         name: 'home'
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
