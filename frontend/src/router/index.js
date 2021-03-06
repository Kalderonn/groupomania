import Vue from 'vue'
import VueRouter from 'vue-router'

// import des différentes vue
import Home from '@/views/Home.vue'
import Feed from '@/views/Feed.vue'
import NotFound from '@/views/NotFound.vue'


Vue.use(VueRouter)

// Déclaration de nos routes
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
      if (localStorage.length !== 0) {
        const token = localStorage.getItem("token");
        if (token) {
          next(true);
        } 
      } else{
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
