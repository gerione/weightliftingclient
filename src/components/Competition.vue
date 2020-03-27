<template>
  <v-container>
    
    <v-row>
      <v-col>{{ competition.name }}</v-col>
    </v-row>
    <v-row>
      <v-col>
        <Current :competitionid="competitionid" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TeamStandings v-if="type === 'team'" :competitionid="competitionid" />
      </v-col>
    </v-row>
    
    <v-row>
      <v-col>
        <ScoreboardTable :competitionid="competitionid" :type="type"></ScoreboardTable>
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

interface CompetitionItem {
  id: number;
  name: string;
  location?: string;
  start_time?: string;
  youtube_id?: string;
  type?: string;
}

@Component({
  components: {
    TeamStandings,
    ScoreboardTable,
    Current,Countdown
  }
})
export default class Competition extends Vue {
  @Prop() competitionid: number;
  type: string = "single";
  competition: CompetitionItem = { id: -1, name: "default" };

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(newVal: any) {
    this.loadCompInfo();
  }
  mounted() {
    this.loadCompInfo();
  }

  loadCompInfo() {
    var api = this.source + "api/competitions/" + this.competitionid + "/";

    this.axios.get(api).then(response => {
      this.competition = response.data.competition;
      this.type = response.data.competition.type;
      console.log("route changed" + this.type);
    });
  }
}
</script>