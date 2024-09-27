import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Weather from '../views/Weather.vue'
import News from '../views/News.vue'
import Today from '../views/Today.vue'
import Jokes from '../views/Jokes.vue'
import IP from '../views/IP.vue'
import Finance from '../views/Finance.vue'

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
    },
    {
      path: '/today',
      name: 'TodayView',
      component: Today
    },
    {
      path: '/jokes',
      name: 'JokesView',
      component: Jokes
    },
    {
      path: '/ip',
      name: 'IPView',
      component: IP
    },
    {
      path: '/finance',
      name: 'FinanceView',
      component: Finance
    }
  ]
})

export default router
