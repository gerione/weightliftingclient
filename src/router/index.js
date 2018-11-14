import Vue from 'vue'
import Router from 'vue-router'
import Scoreboard from '@/components/Scoreboard'
import Current from '@/components/Current'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Scoreboard
    },
    {
      path: '/current',
      name: 'current',
      component: Current
    },
    {
      name: 'scoreboard',
      path: '/scoreboard/:id', 
      component: Scoreboard
    }
  ]
})
