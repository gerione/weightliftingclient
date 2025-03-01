<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li
        v-for="competition in competitions"
        :key="competition.id"
        @click="increment"
      >
        {{ competition.id }} - {{ competition.name }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Meta } from './models';
import type { CompetitionData } from 'src/services/competitions/types';

interface Props {
  title: string;
  competitions?: CompetitionData[];
  meta: Meta;
  active: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  competitions: () => [],
});

const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}

const todoCount = computed(() => props.competitions.length);
</script>
