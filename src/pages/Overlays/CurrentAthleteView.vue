<template>
  <div class="row">
    <div class="col">
      <current-athlete
        title="Example component"
        active
        :lifter="currentLifter!"
        :is-team-comp="currentCompetition?.type === 'team' ? true : false"
      ></current-athlete>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCompetitionsStore } from '../../stores/competitions';
import { useLifterStore } from '../../stores/lifters';
import CurrentAthlete from 'components/CurrentAthlete.vue';
import { storeToRefs } from 'pinia';
const props = defineProps<{
  competitionid: number;
}>();

const lifterStore = useLifterStore();
const { currentLifter } = storeToRefs(lifterStore);

const competitionsStore = useCompetitionsStore();
const { currentCompetition } = storeToRefs(competitionsStore);

onMounted( () => {
  lifterStore.id = props.competitionid;
  lifterStore.startFetching();

  competitionsStore.currentCompetitionId = props.competitionid;
  competitionsStore.startFetching();
});
</script>
