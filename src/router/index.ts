import Vue from 'vue'
import VueRouter from 'vue-router'
import Competition from '@/components/Competition.vue'
import Root from '@/components/Root.vue'
import Current from '@/components/Current.vue'
import TeamStandings from '@/components/TeamStandings.vue'
import Admin from '@/components/Admin.vue'
import ScoreboardTable from '@/components/ScoreboardTable.vue'
import Weight from '@/components/Weight.vue'
import Countdown from '@/components/countdown/Countdown.vue'
import CountdownController from '@/components/countdown/CountdownController.vue'
import About from '@/components/About.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      name: 'competition',
      path: '/competition/:competitionid', 
      props: true,
      component: Competition
    },
    {
      name: 'home',
      path: '/',
      component: Root
    },
    {
      name: 'Scoreboard',
      path: '/competition/:competitionid/scoreboard/:type',
      props: true,
      meta: { layout: "overlay" },
      component: ScoreboardTable
    },
    {
      name: 'current', 
      path: '/competition/:competitionid/current/',
      meta: { layout: "overlay" },
      props: true,
      component: Current
    },
    {
      name: 'teamstandings',
      path: '/competition/:competitionid/team/',
      meta: { layout: "overlay" },
      props: true,
      component: TeamStandings
    },
    {
      name: 'weight',
      path: '/competition/:competitionid/weight/',
      props: true,
      component: Weight
    },
    {
      name: 'timer',
      path: '/competition/:competitionid/timer/',
      props: true,
      component: Countdown
    },
    {
      name: 'timercontroller',
      path: '/competition/:competitionid/timer/controller/',
      props: true,
      component: CountdownController
    },
    {
      name: 'admin',
      path: '/admin', 
      component: Admin
    },
    {
      name: 'about',
      path: '/about', 
      component: About
    }
  ]
})
