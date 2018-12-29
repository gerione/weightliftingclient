import Vue from 'vue'
import VueRouter from 'vue-router'
import Scoreboard from '@/components/Scoreboard'
import Root from '@/components/Root'
import Current from '@/components/Current'
import CreateCompetition from '@/components/CreateCompetition'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'scoreboard',
      path: '/scoreboard/:id', 
      component: Scoreboard
    },
    {
      path: '/',
      name: 'home',
      component: Root
    },
    {
      path: '/current',
      name: 'current',
      component: Current
    },
    {
      name: 'createcompetition',
      path: '/createcompetition', 
      component: CreateCompetition
    },
   
    

  ]
})
