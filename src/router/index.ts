import Vue from 'vue'
import VueRouter from 'vue-router'
import Competition from '@/components/Competition.vue'
import Root from '@/components/Root.vue'
import Current from '@/components/Current.vue'
import TeamStandings from '@/components/TeamStandings.vue'
import Admin from '@/components/Admin.vue'
import ScoreboardTable from '@/components/ScoreboardTable.vue'
import Weight from '@/components/Weight.vue'

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
