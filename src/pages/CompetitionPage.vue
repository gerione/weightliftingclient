<template>
  <div class="row">
    <div>
      <h2>{{ currentCompetition?.name }}</h2>
      in
    </div>
  </div>
  <div class="row">
    <div>
      <h4>{{ currentCompetition?.location }}</h4>
    </div>
  </div>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <current-athlete
        title="Example component"
        active
        :lifter="currentLifter!"
        :is-team-comp="currentCompetition?.type === 'team' ? true : false"
      ></current-athlete>
    </div>
    <div class="col-2"></div>
  </div>
  <div class="row">
    <div class="col">
      <scoreboard-view
        :lifters="lifters"
        :is-team-comp="currentCompetition?.type === 'team' ? true : false"
        :teams="teams"
      ></scoreboard-view>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <team-charts :teamDetails="teams"></team-charts>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCompetitionsStore } from '../stores/competitions';
import { useLifterStore } from '../stores/lifters';
import { useTeamsStore } from '../stores/teams';
import CurrentAthlete from 'components/CurrentAthlete.vue';
import ScoreboardView from 'src/components/ScoreboardView.vue';
import TeamCharts from 'src/components/TeamCharts.vue';
import { storeToRefs } from 'pinia';
const props = defineProps<{
  competitionid: number;
}>();

const lifterStore = useLifterStore();
const { currentLifter, lifters } = storeToRefs(lifterStore);

const teamsStore = useTeamsStore();
const { teams } = storeToRefs(teamsStore);

const competitionsStore = useCompetitionsStore();
const { currentCompetition } = storeToRefs(competitionsStore);

onMounted(() => {
  lifterStore.id = props.competitionid;
  lifterStore.startFetching();

  teamsStore.id = props.competitionid;
  teamsStore.startFetching();

  competitionsStore.currentCompetitionId = props.competitionid;
  competitionsStore.startFetching();
});
</script>
