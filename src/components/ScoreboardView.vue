<template>
  <q-page>
    <!-- Flex Container for the entire page -->

    <div class="q-pa-md example-row-mix-and-match" v-if="isTeamComp">
      <!-- Loop through each team and render its section -->
      <div
        v-for="[team, lifters_team] in splitLiftersByTeam"
        :key="'team-' + team"
        class="team-section q-mb-md"
      >
        <!-- Header Row -->
        <div class="row row2 text-subtitle1 text-bold text-white">
          <div class="col">Name</div>
          <div class="col-1 text-center">SF</div>
          <div class="col-3 text-center">Reißen</div>
          <div class="col-3 text-center">Stoßen</div>
          <div class="col-2 text-center">Zweikampf</div>
        </div>

        <!-- Data Rows -->
        <div
          v-for="(row, rowIndex) in lifters_team.lifters"
          :key="'row-' + rowIndex"
          class="row row2 text-h5 text-bold text-white"
        >
          <div class="col">{{ row.name }}</div>
          <div class="col-1 text-center">{{ round(row.sf, 4) }}</div>

          <!-- Reißen Attempts -->
          <div class="col-3">
            <div class="row q-col-gutter-xs">
              <div class="col"></div>
              <div
                v-for="(attempt, idx) in row.lifts.slice(0, 3)"
                :key="'reissen-' + idx"
                class="col-2 text-center attempt-cell"
              >
                <div :class="getAttemptClass(attempt.result)" class="attempt-highlight">
                  {{ attempt.weight }}
                </div>
              </div>
              <div class="col-2 text-center attempt-cell">
                <div :class="getAttemptClass(-1)" class="attempt-highlight">
                  {{ row.max_snatch }}
                </div>
              </div>
              <div class="col"></div>
            </div>
          </div>
          <!-- Stoßen Attempts -->
          <div class="col-3">
            <div class="row q-col-gutter-xs">
              <div class="col"></div>
              <div
                v-for="(attempt, idx) in row.lifts.slice(3, 6)"
                :key="'stossen-' + idx"
                class="col-2 text-center attempt-cell text-white"
              >
                <div :class="getAttemptClass(attempt.result)" class="attempt-highlight">
                  {{ attempt.weight }}
                </div>
              </div>
              <div class="col-2 text-center attempt-cell">
                <div :class="getAttemptClass(-1)" class="attempt-highlight">
                  {{ row.max_cj }}
                </div>
              </div>
              <div class="col"></div>
            </div>
          </div>
          <!-- Zweikampf -->
          <div class="col-2">
            <div class="row q-col-gutter-xs">
              <div class="col"></div>
              <div class="col-4 text-center attempt-cell">
                <div :class="getAttemptClass(-1)" class="attempt-highlight">
                  {{ row.max_cj + row.max_snatch }}
                </div>
              </div>
              <div class="col-4 text-center attempt-cell">
                <div :class="getAttemptClass(-1)" class="attempt-highlight">
                  {{ round(row.total_points) }}
                </div>
              </div>
              <div class="col"></div>
            </div>
          </div>
        </div>

        <!-- Summary Rows -->
        <div class="row row2 justify-center items-center text-white text-bold text-h5">
          <div class="col">
            <div class="row">
              <div class="col text-white text-center text-h4 text-bold">
                <!-- Team Name Header -->
                {{ lifters_team.team.name }}
              </div>
            </div>
          </div>
          <div class="col-1">
            <div class="row">
              <div class="col text-white">Jugendpunkte</div>
            </div>
            <div class="row">
              <div class="col text-white text-center">Gesamt</div>
            </div>
          </div>
          <div class="col-3">
            <div class="row">
              <div class="col text-center text-white">
                {{
                  round(
                    props.teams?.find((i) => i.id === lifters_team.team.id)
                      ?.snatch_additional_points,
                  )
                }}
              </div>
            </div>

            <div class="row">
              <div class="col text-center text-weight-bold text-white">
                {{
                  round(
                    props.teams?.find((i) => i.id === lifters_team.team.id)?.snatch! +
                      props.teams?.find((i) => i.id === lifters_team.team.id)
                        ?.snatch_additional_points!,
                  )
                }}
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="row">
              <div class="col text-center">
                {{
                  round(
                    props.teams?.find((i) => i.id === lifters_team.team.id)?.cj_additional_points,
                  )
                }}
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                {{
                  round(
                    props.teams?.find((i) => i.id === lifters_team.team.id)?.cj! +
                      props.teams?.find((i) => i.id === lifters_team.team.id)
                        ?.cj_additional_points!,
                  )
                }}
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="row">
              <div class="col text-center">
                {{
                  round(
                    props.teams?.find((i) => i.id === lifters_team.team.id)
                      ?.total_additional_points,
                  )
                }}
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                {{
                  round(
                    props.teams?.find((i) => i.id === lifters_team.team.id)?.total! +
                      props.teams?.find((i) => i.id === lifters_team.team.id)
                        ?.total_additional_points!,
                  )
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="row"></div>
        <div class="row"></div>
      </div>
    </div>
    <div class="q-pa-md example-row-mix-and-match" v-else>
      <!-- Loop through each team and render its section -->
      <div
        v-for="[weightclass, lifters_team] in splitLiftersByWeightclass"
        :key="'team-' + weightclass"
        class="team-section q-mb-md"
      >
        <!-- Header Row -->
        <div class="row row2 text-subtitle1 text-bold text-white">
          <div class="col">Name</div>
          <div class="col-2 text-center">Verein</div>
          <div class="col-3 text-center">Reißen</div>
          <div class="col-3 text-center">Stoßen</div>
          <div class="col-1 text-center">Zweikampf</div>
        </div>

        <!-- Data Rows -->
        <div
          v-for="(row, rowIndex) in lifters_team.lifters"
          :key="'row-' + rowIndex"
          class="row row2 text-h5 text-bold text-white"
        >
          <div class="col">{{ row.name }}</div>
          <div class="col-2 text-center">
            {{ row.masterdata.club_single }}
          </div>

          <!-- Reißen Attempts -->
          <div class="col-3">
            <div class="row q-col-gutter-xs">
              <div class="col"></div>
              <div
                v-for="(attempt, idx) in row.lifts.slice(0, 3)"
                :key="'reissen-' + idx"
                class="col-2 text-center attempt-cell"
              >
                <div :class="getAttemptClass(attempt.result)" class="attempt-highlight">
                  {{ attempt.weight }}
                </div>
              </div>
              <div class="col-2 text-center attempt-cell">
                <div :class="getAttemptClass(-1)" class="attempt-highlight">
                  {{ row.max_snatch }}
                </div>
              </div>
              <div class="col"></div>
            </div>
          </div>
          <!-- Stoßen Attempts -->
          <div class="col-3">
            <div class="row q-col-gutter-xs">
              <div class="col"></div>
              <div
                v-for="(attempt, idx) in row.lifts.slice(3, 6)"
                :key="'stossen-' + idx"
                class="col-2 text-center attempt-cell text-white"
              >
                <div :class="getAttemptClass(attempt.result)" class="attempt-highlight">
                  {{ attempt.weight }}
                </div>
              </div>
              <div class="col-2 text-center attempt-cell">
                <div :class="getAttemptClass(-1)" class="attempt-highlight">
                  {{ row.max_cj }}
                </div>
              </div>
              <div class="col"></div>
            </div>
          </div>
          <!-- Zweikampf -->
          <div class="col-1">
            <div class="row q-col-gutter-xs">
              <div class="col"></div>
              <div class="col-4 text-center attempt-cell">
                <div :class="getAttemptClass(-1)" class="attempt-highlight">
                  {{ row.max_cj + row.max_snatch }}
                </div>
              </div>
              <div class="col"></div>
            </div>
          </div>
        </div>

        <!-- Summary Rows -->
        <div class="row row2 justify-center items-center text-white text-bold text-h5">
          <div class="col text-white text-center text-h4 text-bold">
            <!-- Team Name Header -->
            {{ lifters_team.weightclass.name }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<style lang="sass">
.example-row-mix-and-match
  .row2
    padding: 5px 10px
    background: rgba(0,0,0,0.98)
    border:  none

  .row + .row
    margin-top: 0.4rem
</style>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Lifter, Team, Weightclass } from 'src/services/lifters/types'
import type { TeamDetails } from 'src/services/teams/types'

const props = defineProps<{
  lifters?: Lifter[]
  isTeamComp: boolean
  teams?: TeamDetails[]
}>()

const round = (value: number | undefined, rounding_numbers: number = 2) => {
  if (typeof value === 'undefined') return 0
  return value.toFixed(rounding_numbers)
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
    teamData.lifters.sort((a, b) => a.name.localeCompare(b.name))
  })

  return groupedTeams
})

const splitLiftersByWeightclass = computed(() => {
  const teams = new Map<number, { weightclass: Weightclass; lifters: Lifter[] }>()
  if (typeof props.lifters === 'undefined') return teams
  const groupedTeams = props.lifters.reduce((acc, lifter) => {
    const teamId = lifter.weightclass.id
    if (!acc.has(teamId)) {
      acc.set(teamId, { weightclass: lifter.weightclass, lifters: [] })
    }
    acc.get(teamId)?.lifters.push(lifter)
    return acc
  }, new Map<number, { weightclass: Weightclass; lifters: Lifter[] }>())

  // Sort the lifters in each team by name
  groupedTeams.forEach((teamData) => {
    teamData.lifters.sort((a, b) => a.name.localeCompare(b.name))
  })

  return groupedTeams
})

// Helper to style attempts
const getAttemptClass = (value: number) => {
  if (value === 0) return ''
  if (value === 1) return 'bg-red text-white'
  if (value === 2) return 'bg-green text-white '
  return 'bg-grey text-white'
}
</script>
