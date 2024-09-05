const routes = [
  {
    path:'/',
    name:'login',
    component: () => import('@/pages/Login.vue')
  },
  { 
    path: '/dashboard', 
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta:{
          requiresAuth: true
    },
    children: [
      {
        path: '/',
        alias: '',
        name: 'home',
        component: () => import('@/pages/Home.vue')
      },
      {
        path:'/kelas',
        alias:'',
        name:'kelas',
        component:()=>import('@/pages/Kelas.vue')
      },
      {
        path:'/new',
        alias:'',
        name:'new',
        component:()=>import('@/pages/createKelas.vue')
      },
      {
        path:'/edit-profile/:id',
        alias:'',
        name:'editprofile',
        component:()=>import('@/pages/EditProfile.vue')
      },
      {
        path:'/kelas/:id',
        alias:'',
        name:'detail',
        component:()=>import('@/pages/Detail.vue'),
        children:[
        {
          path:'',
          name:"update",
          component:()=>import('@/pages/updateKelas.vue')
        },
        {
          path:'',
          alias:'',
          name:'materi',
          component:()=>import('@/pages/Materi.vue')
        },
        {
          path:'',
          alias:'',
          name:'delete',
          component:()=>import('@/pages/deleteKelas.vue')
        },
        ]
      },
      
      {
        path:'/category',
        alias:'',
        name:'category',
        component:()=>import('@/pages/Category.vue')
      },
      {
        path:'/transaksi',
        alias:'',
        name:'transaksi',
        component:()=>import('@/pages/Transaksi.vue')
      },
      {
        path:'/banks',
        alias:'',
        name:'banks',
        component:()=>import('@/pages/Banks.vue')
      },
      {
        path:'/user',
        alias:'',
        name:'user',
        component:()=>import('@/pages/User.vue')
      },
    ]
  },
]

export default routes