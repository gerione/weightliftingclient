<template>
  <div>
    <div class="row">
      <div class="col-5 bg-indigo-10 text-white text-bold text-h6 text-left q-pl-xs">
        {{ lifter?.name }}
      </div>
      <div class="col-5 bg-indigo-10 text-white text-bold text-subtitle1 q-pt-xs">
        {{ isTeamComp === true ? lifter?.masterdata.club_team : lifter?.masterdata.club_single }}
      </div>
      <div class="col-2 bg-indigo-10 text-white text-bold text-h6 text-center">
        {{ current() }} kg
      </div>
    </div>
    <div class="row">
      <template v-for="lift in lifter?.lifts" v-bind:key="lift.id">
        <div class="col">
          <q-chip square :color="color(lift.result)" text-color="white" class="text-bold" dense>
            {{ lift.weight }}
          </q-chip>
        </div>
        <div class="col" v-if="lift.attempt == 3">
          <q-chip square color="indigo-10" text-color="white" class="text-bold" dense>
            {{ snatch() }}
          </q-chip>
        </div>
        <div class="col" v-if="lift.attempt == 3"></div>
      </template>
      <div class="col">
        <q-chip square color="indigo-10" text-color="white" class="text-bold" dense>
          {{ cj() }}
        </q-chip>
      </div>
      <div class="col"></div>
      <div class="col">
        <q-chip square color="indigo-10" text-color="white" class="text-bold" dense>
          {{ total() }}
        </q-chip>
      </div>
      <div class="col-md-auto">
        <q-chip square color="indigo-10" text-color="white" class="text-bold" dense>
          {{ points().toFixed(2) }}
        </q-chip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Lifter } from 'src/services/lifters/types'

const props = defineProps<{
  lifter?: Lifter
  isTeamComp: boolean
}>()

function color(liftResult: number): string {
  if (liftResult == 0) {
    return 'grey-8'
  } else if (liftResult == 2) {
    return 'green'
  }
  return 'red'
}

function current(): number {
  if (typeof props.lifter === 'undefined') return -1
  let data = props.lifter?.lifts
    .slice(0, 3)
    .filter((lift) => lift.result === 0)
    .map((lift) => lift.weight)
  if (typeof data === 'undefined') return -1
  if (data.length == 0) {
    data = props.lifter?.lifts
      .slice(3, 6)
      .filter((lift) => lift.result === 0)
      .map((lift) => lift.weight)
  }
  if (data.length == 0) return 0
  return data[0]!
}

function snatch(): number {
  if (typeof props.lifter === 'undefined') return -1
  const data = props.lifter?.lifts
    .slice(0, 3)
    .filter((lift) => lift.result === 2)
    .map((lift) => lift.weight)
  const max = 0
  if (Math.max(...data) > max) {
    return Math.max(...data)
  }
  return max
}

function cj(): number {
  if (typeof props.lifter === 'undefined') return -1
  const data = props.lifter?.lifts
    .slice(3, 6)
    .filter((lift) => lift.result === 2)
    .map((lift) => lift.weight)
  const max = 0
  if (Math.max(...data) > max) {
    return Math.max(...data)
  }
  return max
}
function total(): number {
  return snatch() + cj()
}

function points(): number {
  if (typeof props.lifter === 'undefined') return -1
  return total() * props.lifter.sf
}
</script>
