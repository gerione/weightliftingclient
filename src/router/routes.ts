import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'competition',
        path: 'competition/:competitionid/',
        component: () => import('pages/CompetitionPage.vue'),
        props: true,
      },
      { path: '', component: () => import('pages/IndexPage.vue') },
    ],
  },
  {
    path: '/overlays/:competitionid/',
    component: () => import('layouts/OverlayLayout.vue'),
    children: [
      {
        name: 'Scoreboard',
        path: 'scoreboard/',
        component: () => import('pages/Overlays/ScoreboardView.vue'),
        props: true,
      },
      {
        name: 'CurrentAthlete',
        path: 'current_athlete/',
        component: () => import('pages/Overlays/CurrentAthleteView.vue'),
        props: true,
      },
      {
        name: 'TeamChart',
        path: 'team_chart/',
        component: () => import('pages/Overlays/TeamChartView.vue'),
        props: true,
      },
      {
        name: 'TeamPointsChart',
        path: 'team_points_chart/',
        component: () => import('pages/Overlays/TeamPointsChartView.vue'),
        props: true,
      },
      {
        path: '',
        component: () => import('pages/OverlayLinkPage.vue'),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
