import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Weather from '../views/Weather.vue'
import News from '../views/News.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: Home
    },
    {
      path: '/weather',
      name: 'WeatherView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Weather
    },
    {
      path: '/news',
      name: 'NewsView',
      component: News
    }
  ]
})

export default router
