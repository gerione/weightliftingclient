import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route, Next } from 'vue-router';
import Competition from '@/components/Competition.vue'
import Root from '@/components/Root.vue'
import Current from '@/components/Current.vue'
import TeamStandings from '@/components/TeamStandings.vue'
import Overlay from '@/components/Overlays.vue'

//Admin
import Admin from '@/components/admin/Admin.vue'
import Login from '@/components/admin/Login.vue'

import ScoreboardTable from '@/components/ScoreboardTable.vue'
import Weight from '@/components/Weight.vue'
import Countdown from '@/components/countdown/Countdown.vue'
import CountdownController from '@/components/countdown/CountdownController.vue' 
import RefereeController from '@/components/referee/RefereeController.vue'
import Referee from '@/components/referee/Referee.vue'
import Downlamp from '@/components/referee/Downlamp.vue'
import LiftingOrderTest from '@/components/Lifting/LiftingOrderTest.vue'

import About from '@/components/About.vue'
import store from "../store";



Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'development' ? '/' : '/live/',
  routes: [
    {
      name: 'competition',
      path: '/competition/:competitionid', 
      props: true,
      component: Competition,
      beforeEnter (to, from, next) { store.commit('setCompetitionId', to.params.competitionid); next(); },
    },
    {
      name: 'home',
      path: '/',
      component: Root
    },
    {
      name: 'overlays',
      path: '/overlays/:competitionid',
      props: true,
      component: Overlay
    },
    {
      name: 'Scoreboard',
      path: '/competition/:competitionid/scoreboard/:type',
      props: true,
      meta: { layout: "overlay" },
      component: ScoreboardTable,
      beforeEnter (to, from, next) { store.commit('setCompetitionId', to.params.competitionid); next(); },
    },
    {
      name: 'current', 
      path: '/competition/:competitionid/current/',
      meta: { layout: "overlay" },
      props: true,
      component: Current,
      beforeEnter (to, from, next) { store.commit('setCompetitionId', to.params.competitionid); next(); },
    },
    {
      name: 'teamstandings',
      path: '/competition/:competitionid/team/',
      meta: { layout: "overlay" },
      props: true,
      component: TeamStandings,
      beforeEnter (to, from, next) { store.commit('setCompetitionId', to.params.competitionid); next(); },
    },
    {
      name: 'weight',
      path: '/competition/:competitionid/weight/',
      props: true,
      component: Weight,
      beforeEnter (to, from, next) { store.commit('setCompetitionId', to.params.competitionid); next(); },
    },
    {
      name: 'timer',
      path: '/competition/:competitionid/timer/',
      props: true,
      component: Countdown,
      beforeEnter (to, from, next) { store.commit('setCompetitionId', to.params.competitionid); next(); },
    },
    {
      name: 'timercontroller',
      path: '/competition/:competitionid/timer/controller/',
      props: true,
      component: CountdownController,
      beforeEnter (to, from, next) { store.commit('setCompetitionId', to.params.competitionid); next(); },
    },
    {
      name: 'referee',
      path: '/competition/:competitionid/referee/',
      props: true,
      component: Referee,
      beforeEnter (to, from, next) { store.commit('setCompetitionId', to.params.competitionid); next(); },
    },
    {
      name: 'downlamp',
      path: '/competition/:competitionid/downlamp/',
      props: true,
      component: Downlamp,
      beforeEnter (to, from, next) { store.commit('setCompetitionId', to.params.competitionid); next(); },
    },
    {
      name: 'refereeController',
      path: '/competition/:competitionid/referee/:referee/controller/',
      props: true,
      component: RefereeController,
      beforeEnter (to, from, next) { store.commit('setCompetitionId', to.params.competitionid); next(); },
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
    },
    {
      name: 'LiftingOrderTest',
      path: '/lifting/:competitionid/', 
      props: true,
      component: LiftingOrderTest,
      beforeEnter (to, from, next) { store.commit('setCompetitionId', to.params.competitionid); next(); },
    },
    {
      path: '/login',
      name: 'login',
      component: Login
  }
  ]
})

