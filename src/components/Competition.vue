<template>
  <v-container>
    <v-row>
      <v-col>{{ name(currentComp) }}</v-col>
    </v-row>
    <v-row>
      <v-col>
        <Current :competitionid="id(currentComp)" />
      </v-col>
    </v-row>
    <v-row v-if="type === 'team'">
      <v-col>
        <TeamStandings  :competitionid="id(currentComp)" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ScoreboardTable :competitionid="id(currentComp)" :type="type(currentComp)"></ScoreboardTable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Current from "./Current";
import TeamStandings from "./TeamStandings";
import ScoreboardTable from "./ScoreboardTable";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import Countdown from "./countdown/Countdown";

@Component({
  components: {
    TeamStandings,
    ScoreboardTable,
    Current,Countdown
  }
})
export default class Competition extends Vue {

 
  name (comp){
    if (comp == null){
      return " ";
    }
    return comp.name;
  }
  type (comp){
    if (comp == null){
      return " ";
    }
    return comp.type;
  }

  id (comp){
    if (comp == null){
      return " ";
    }
    return comp.id;
  }

  get currentComp() {
    try {
        return this.$store.getters.currentCompetition;
      }
      catch(e) {
        console.log(e);
      }
      return null;
  }
}
</script>