<template>
  <div>
    <scoreboard-view
      :lifters="lifters"
      :is-team-comp="currentCompetition?.type === 'team' ? true : false"
      :teams="teams"
    ></scoreboard-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCompetitionsStore } from '../../stores/competitions';
import { useLifterStore } from '../../stores/lifters';
import { useTeamsStore } from '../../stores/teams';
import ScoreboardView from 'src/components/ScoreboardView.vue';
import { storeToRefs } from 'pinia';
const props = defineProps<{
  competitionid: number;
}>();

const lifterStore = useLifterStore();
const { lifters } = storeToRefs(lifterStore);

const teamsStore = useTeamsStore();
const { teams } = storeToRefs(teamsStore);

const competitionsStore = useCompetitionsStore();
const { currentCompetition } = storeToRefs(competitionsStore);

onMounted( () => {
  lifterStore.id = props.competitionid;
  lifterStore.startFetching();

  teamsStore.id = props.competitionid;
  teamsStore.startFetching();

  competitionsStore.currentCompetitionId = props.competitionid;
  competitionsStore.startFetching();
});
</script>
