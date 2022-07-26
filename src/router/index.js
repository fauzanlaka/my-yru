import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import BackendLayout from '@/layouts/Backend.vue'
import FrontendLayout from '@/layouts/Frontend.vue'

function authGuard(to, from, next){
  let isAuthenticated = false
  if(store.getters['auth/logedIn']){
    isAuthenticated = true
  }else{
    isAuthenticated = false
  }
  if(isAuthenticated){
    next() //อนุญาติให้เข้าสู่ route และโหลด component ที่ต้องการได้
    // router.push({
    //   name: 'Dashboard'
    // })
  }else{
    next({name: 'Login'})
  }
}

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/',
    component: FrontendLayout,
    children:[
      {
        path: '',
        name: 'Login',
        component: require('@/views/frontend/Login.vue').default,
      }
    ],
    meta: {
      title: 'Login',
      description: 'Login',
      requiresVisitor: true
    }
  },
  {
    path: '/users',
    component: BackendLayout,
    children:[
      {
        path: '',
        name: 'Users',
        component: require('@/views/backend/User.vue').default,
      }
    ],
    meta:{
      title: 'Users',
      description: 'user',
    }
  },
  {
    path: '/roles',
    component: BackendLayout,
    children:[
      {
        path: '',
        name: 'Roles',
        component: require('@/views/backend/Role.vue').default,
      }
    ],
    meta:{
      title: 'Users',
      description: 'user',
    }
  },
  {
    path: '/dashboard',
    component: BackendLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: require('@/views/backend/Dashboard.vue').default,
        beforeEnter: authGuard
      }
    ],
    meta:{
      title: 'Dashboard',
      description: 'Dashboard',
    }
  },
  {
    path: '/students',
    component: BackendLayout,
    children: [
      {
        path: '',
        name: 'Students',
        component: require('@/views/backend/Student.vue').default,
        beforeEnter: authGuard
      }
    ],
    meta:{
      title: 'Dashboard',
      description: 'Dashboard',
    }
  },
  {
    path: '/equipment',
    component: BackendLayout,
    children: [
      {
        path: '',
        name: 'Equipment',
        component: require('@/views/backend/Equipment.vue').default,
        beforeEnter: authGuard
      }
    ],
    meta:{
      title: 'Dashboard',
      description: 'Dashboard',
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active", // active class for non-exact links.
  linkExactActiveClass: "active" // active class for *exact* links.
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters['auth/logedIn']){
      router.push({
        name: 'Login' //ถ้าไม่มีสิทธ์ให้แสดงว่าไม่พบหน้าที่ต้องการ
      })
    } else {
      next()
    }
  }else if(to.matched.some(record => record.meta.requiresVisitor)) {
    if(store.getters['auth/logedIn']){
      router.push({
        name: 'Dashboard' //ถ้าไม่มีสิทธ์ให้แสดงว่าไม่พบหน้าที่ต้องการ
      })
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
