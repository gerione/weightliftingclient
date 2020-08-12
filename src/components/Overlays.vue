<template>
  <v-container class="grey darken-3">
    <v-row>
      <v-col>
        <v-btn color="green" :to="'/competition/' +  competitionid + '/current/?layer-name=Current Athlete&layer-width=1280&layer-height=200'">
            Current lifter (720p)
        </v-btn>
        <v-btn color="green" :to="'/competition/competitionid/scoreboard/single/?layer-name=Single scoreboard&layer-width=1280&layer-height=720'">
            Scoreboard single (720p)
        </v-btn>
        <v-btn color="green" :to="'/competition/competitionid/scoreboard/team/?layer-name=Team scoreboard&layer-width=1280&layer-height=720'">
            Scoreboard teams (720p)
        </v-btn>
        <v-btn color="green" :to="'/competition/:competitionid/team/?layer-name=Team standings&layer-width=1280&layer-height=720'">
            Team standing (720p)
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="green" :to="'/competition/' +  competitionid + '/current/?layer-name=Current Athlete&layer-width=1920&layer-height=1080'">
            Current lifter (1080p)
        </v-btn>
        <v-btn color="green" :to="'/competition/competitionid/scoreboard/single/?layer-name=Single scoreboard&layer-width=1920&layer-height=1080'">
            Scoreboard single (1080p)
        </v-btn>
        <v-btn color="green" :to="'/competition/competitionid/scoreboard/team/?layer-name=Team scoreboard&layer-width=1920&layer-height=1080'">
            Scoreboard teams (1080p)
        </v-btn>
        <v-btn color="green" :to="'/competition/:competitionid/team/?layer-name=Team standings&layer-width=1920&layer-height=1080'">
            Team standing (1080p)
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        competitionid: Number,
    }
});
</script>