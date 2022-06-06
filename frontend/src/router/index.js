import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Feed from '@/views/Feed.vue'
import NotFound from '@/views/NotFound.vue'
// import { BIconChevronDoubleLeft } from 'bootstrap-vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/feeds',
    name: 'feeds',
    component: Feed,
    beforeEnter: (to, from, next) =>{
      const user = JSON.parse(localStorage.getItem("user"))
      const token = user.token
      if (token) {
          next(true)
      } else {
          next('/')
      }
    }
  },
  {
    path: '/:pathMacth(.*)',
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
