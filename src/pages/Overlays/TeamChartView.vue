<template>
  <div class="row">
    <div class="col">
      <team-charts :teamDetails="teams"></team-charts>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTeamsStore } from '../../stores/teams';

import TeamCharts from 'src/components/TeamCharts.vue';
import { storeToRefs } from 'pinia';
const props = defineProps<{
  competitionid: number;
}>();

const teamsStore = useTeamsStore();
const { teams } = storeToRefs(teamsStore);

onMounted( () => {
  teamsStore.id = props.competitionid;
  teamsStore.startFetching();
});
</script>
