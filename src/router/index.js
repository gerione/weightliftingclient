import Vue from 'vue'
import VueRouter from 'vue-router'
import Competition from '@/components/Competition'
import Root from '@/components/Root'
import Current from '@/components/Current'
import TeamStandings from '@/components/TeamStandings'
import Scoreboard from '@/components/Scoreboard'
import Admin from '@/components/Admin'
import ScoreboardTable from '@/components/ScoreboardTable'
import Weight from '@/components/Weight'

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
      path: '/scoreboard/:competitionid/:type',
      props: true,
      meta: { layout: "overlay" },
      component: ScoreboardTable
    },
    {
      name: 'current',
      path: '/current/:competitionid',
      meta: { layout: "overlay" },
      props: true,
      component: Current
    },
    {
      name: 'teamstandings',
      path: '/team/:competitionid',
      meta: { layout: "overlay" },
      props: true,
      component: TeamStandings
    },
    {
      name: 'weight',
      path: '/weight/:competitionid',
      props: true,
      component: Weight
    },
    {
      name: 'admin',
      path: '/admin', 
      component: Admin
    },
  ]
})
