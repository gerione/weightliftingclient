<template>
  <q-page class="items-stretch">
    <!-- Flex Container for the entire page -->
    <div class="q-pa-md example-row-mix-and-match">
      <!-- Loop through each team and render its section -->

      <!-- Header Row -->
      <div class="row row2 text-subtitle1 text-bold text-white">
        <div class="col"></div>

        <div
          v-for="[team, lifters_team] in splitLiftersByTeam"
          :key="'team-' + team"
          class="col text-white text-center text-h2 text-bold"
        >
          <!--  <div class="col text-white text-center text-h4 text-bold">-->
          <!-- Team Name Header -->
          {{ lifters_team.team.name }}
        </div>
      </div>

      <div class="row justify-center items-center text-white text-bold text-h2" />
      <div class="row justify-center items-center text-white text-bold text-h2" />
      <div class="row justify-center items-center text-white text-bold text-h2" />

      <!-- Current Rows -->
      <div class="row row2 justify-center items-center bg-grey-8 text-white text-bold text-h5">
        <div class="col text-center text-weight-bold">Aktueller Stand</div>
      </div>
      <div class="row row2 justify-center items-center text-white text-bold text-h2">
        <div class="col text-center text-weight-bold">R</div>

        <div
          v-for="[team, lifters_team] in splitLiftersByTeam"
          :key="'team-' + team"
          class="col text-center"
        >
          {{
            round(
              props.teams?.find((i) => i.id === lifters_team.team.id)?.snatch! +
                props.teams?.find((i) => i.id === lifters_team.team.id)?.snatch_additional_points!,
            )
          }}
        </div>
      </div>
      <div class="row row2 justify-center items-center text-white text-bold text-h2">
        <div class="col text-center text-weight-bold">S</div>

        <div
          v-for="[team, lifters_team] in splitLiftersByTeam"
          :key="'team-' + team"
          class="col text-center"
        >
          {{
            round(
              props.teams?.find((i) => i.id === lifters_team.team.id)?.cj! +
                props.teams?.find((i) => i.id === lifters_team.team.id)?.cj_additional_points!,
            )
          }}
        </div>
      </div>
      <div class="row row2 justify-center items-center text-white text-bold text-h2">
        <div class="col text-center text-weight-bold">ZWK</div>
        <div
          v-for="[team, lifters_team] in splitLiftersByTeam"
          :key="'team-' + team"
          class="col text-center"
        >
          {{
            round(
              props.teams?.find((i) => i.id === lifters_team.team.id)?.total! +
                props.teams?.find((i) => i.id === lifters_team.team.id)?.total_additional_points!,
            )
          }}
        </div>
      </div>
      <div class="row justify-center items-center text-white text-bold text-h2" />
      <div class="row justify-center items-center text-white text-bold text-h2" />
      <div class="row justify-center items-center text-white text-bold text-h2" />

      <!-- Forecast Rows -->
      <div class="row row2 justify-center items-center text-white text-bold text-h5 bg-grey-8">
        <div class="col text-center text-weight-bold">Hochrechnung</div>
      </div>
      <div class="row row2 justify-center items-center text-white text-bold text-h2">
        <div class="col text-center text-weight-bold">R</div>

        <div
          v-for="[team, lifters_team] in splitLiftersByTeam"
          :key="'team-' + team"
          class="col text-center"
        >
          {{
            round(
              props.teams?.find((i) => i.id === lifters_team.team.id)?.snatch_forecast! +
                props.teams?.find((i) => i.id === lifters_team.team.id)?.snatch_additional_points!,
            )
          }}
        </div>
      </div>
      <div class="row row2 justify-center items-center text-white text-bold text-h2">
        <div class="col text-center text-weight-bold">S</div>

        <div
          v-for="[team, lifters_team] in splitLiftersByTeam"
          :key="'team-' + team"
          class="col text-center"
        >
          {{
            round(
              props.teams?.find((i) => i.id === lifters_team.team.id)?.cj_forecast! +
                props.teams?.find((i) => i.id === lifters_team.team.id)?.cj_additional_points!,
            )
          }}
        </div>
      </div>
      <div class="row row2 justify-center items-center text-white text-bold text-h2">
        <div class="col text-center text-weight-bold">ZWK</div>
        <div
          v-for="[team, lifters_team] in splitLiftersByTeam"
          :key="'team-' + team"
          class="col text-center"
        >
          {{
            round(
              props.teams?.find((i) => i.id === lifters_team.team.id)?.total_forecast! +
                props.teams?.find((i) => i.id === lifters_team.team.id)?.total_additional_points!,
            )
          }}
        </div>
      </div>
    </div>
  </q-page>
</template>
<style lang="sass">
.example-row-mix-and-match
  .row2
    padding: 5px 10px
    background: rgba(0,0,0,0.95)
    border:  none

  .row + .row
    margin-top: 0.4rem
</style>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Lifter, Team } from 'src/services/lifters/types'
import type { TeamDetails } from 'src/services/teams/types'

const props = defineProps<{
  lifters?: Lifter[]
  isTeamComp: boolean
  teams?: TeamDetails[]
}>()

const round = (value: number | undefined) => {
  if (typeof value === 'undefined') return 0
  return value.toFixed(2)
}

const splitLiftersByTeam = computed(() => {
  const teams = new Map<number, { team: Team; lifters: Lifter[] }>()
  if (typeof props.lifters === 'undefined') return teams
  const groupedTeams = props.lifters.reduce((acc, lifter) => {
    const teamId = lifter.team.id
    if (!acc.has(teamId)) {
      acc.set(teamId, { team: lifter.team, lifters: [] })
    }
    acc.get(teamId)?.lifters.push(lifter)
    return acc
  }, new Map<number, { team: Team; lifters: Lifter[] }>())

  // Sort the lifters in each team by name
  groupedTeams.forEach((teamData) => {
    teamData.lifters.sort((a: Lifter, b: Lifter) => a.name.localeCompare(b.name))
  })

  return groupedTeams
})
</script>
