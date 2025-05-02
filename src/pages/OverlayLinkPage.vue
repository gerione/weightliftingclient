<template>
  <q-page class="row items-center justify-evenly">
    <router-link :to="createLink(competitionid, '/scoreboard/')"
      ><q-btn icon="videocam">Scoreboard</q-btn>
    </router-link>
    <router-link :to="createLink(props.competitionid, '/current_athlete/')"
      ><q-btn icon="videocam">Current Athlete</q-btn>
    </router-link>
    <router-link :to="createLink(props.competitionid, '/team_chart/')"
      ><q-btn icon="videocam">TeamChart</q-btn>
    </router-link>
    <router-link :to="createLink(props.competitionid, '/team_points_chart/')"
      ><q-btn icon="videocam">TeamPointsChart</q-btn>
    </router-link>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const props = defineProps<{
  competitionid: number
}>()

function createLink(id: number, where_to: string): string {
  return String(id) + where_to
}
</script>
