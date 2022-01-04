import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from "@/db";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    beforeEnter(to, from, next){
      auth.onAuthStateChanged((user)=>{
        if(user){
          next()
        }else{
          next({name: 'Login'})
        }
      })
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Login.vue')
  },
  {
    path: '/pix',
    name: 'Pix',
    component: () => import(/* webpackChunkName: "pix" */ '../views/Pix.vue')
  },
  {
    path: '/lista',
    name: 'List',
    component: () => import(/* webpackChunkName: "list" */ '../views/List.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
