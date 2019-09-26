<template>
  <v-container class="grey darken-3">
    <v-row>
      <template v-for="item in teams">
        <v-col cols="6">
          <v-row no-gutters>
            <v-col cols="12">
              <span class="headline">{{item.name}}</span>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="12">
              <div>Zweikampf: {{item.total_forecast | round}} / {{item.total| round}} Pkt.</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <div>Reißen: {{item.snatch_forecast| round}} / {{item.snatch| round}} Pkt. Pkt.</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <div>Stoßen: {{item.cj_forecast| round}} / {{item.cj| round}} Pkt. Pkt.</div>
            </v-col>
          </v-row>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Team } from "@/interfaces/Team";

@Component({
  filters: {
    round(value: number) {
      if (value == null) return 0;
      return value.toFixed(2);
    }
  }
})
export default class TeamStandings extends Vue {
  @Prop() competitionid!: number;
  teams: Team[];
  constructor() {
    super();
    this.teams = [];
  }

  mounted() {
    this.loadData();
  }

  loadData() {
    var api =
      this.source + "api/competitions/" + this.competitionid + "/teams/";
    this.axios
      .get(api)
      .then(response => {
        this.teams = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    setTimeout(this.loadData, 5000);
  }
}
</script>
