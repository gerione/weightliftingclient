<template>
  <q-page class="row items-center justify-evenly">
    <q-table
      title="Wettkämpfe"
      :rows="competitionsStore.competitions"
      :columns="columns"
      :dense="$q.screen.lt.md"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <router-link :to="createLink(props.row.id)"
            ><q-btn icon="fitness_center"></q-btn
          ></router-link>
          <router-link :to="createOverlayLink(props.row.id)"
            ><q-btn icon="videocam"></q-btn
          ></router-link>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

import { onMounted } from 'vue'
import { useCompetitionsStore } from '../stores/competitions'
import type { QTableProps } from 'quasar'

const competitionsStore = useCompetitionsStore()

const columns: QTableProps['columns'] = [
  {
    name: 'Startzeit',
    align: 'center',
    label: 'Startzeit',
    field: 'start_time',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Wettkampf',
    align: 'left',
    field: 'name',
    sortable: true,
  },

  {
    name: 'Location',
    align: 'center',
    label: 'Ort',
    field: 'location',
    sortable: true,
  },
  { name: 'actions', label: 'Action', field: '' },
]
function createLink(id: number): string {
  return '/competition/' + String(id)
}
function createOverlayLink(id: number): string {
  return '/overlays/' + String(id)
}
onMounted(async () => {
  const { success, status } = await competitionsStore.dispatchGetCompetitions()
  if (!success) {
    console.log('Api status ->', status)
  }
})
</script>
