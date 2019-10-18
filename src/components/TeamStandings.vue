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
              <div>Zweikampf: {{item.total| round}} Pkt.</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <div>Reißen: {{item.snatch| round}} Pkt. Pkt.</div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <div>Stoßen: {{item.cj| round}} Pkt. Pkt.</div>
            </v-col>
          </v-row>
        </v-col>
      </template>
    </v-row>
        <v-row>
      <v-col>
        <bar-chart :data=chartData :colors=chartColors :library='{ legend: {labels: { fontColor: "white" } }, scales: {
            yAxes: [{
              gridLines: {
                display:false
            },
                ticks: {
                    fontColor: "white"
                },
            }],
          xAxes: [{
            gridLines: {
                color: "white",
            },
                ticks: {
                    fontColor: "white"
                },
            }]
        }}'></bar-chart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Team } from "@/interfaces/Team";

import { GChart } from 'vue-google-charts'
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
  chartData;
  chartColors;
  constructor() {
    super();
    this.teams = [];
    this.chartColors =  ["navy", "MediumBlue 	", "DarkGreen ", "Green", "DarkRed", "Red"];
    this.chartData =  [
  {
    name: "SKV", 
    data: [["Reißen", 789.05 ], ["Stoßen", 932.36 ], ["Zweikampf", 1721.41]], 
    stack: "Stack 1"
  },
    {
    name: "SKV Hochrechnung", 
    data: [["Reißen", 800], ["Stoßen", 1000], ["Zweikampf", 1800.41]],
    stack: "Stack 1"
  },
  {
    name: "BRM", 
    data: [["Reißen", 742.32 ], ["Stoßen", 621.58 ], ["Zweikampf", 1363.89 ]],
    stack: "Stack 2"
  },

  {
    name: "BRM Hochrechung", 
    data: [["Reißen", 760], ["Stoßen", 640], ["Zweikampf", 1400]],
    stack: "Stack 2"
  },
];
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
        let i = 0;
        this.chartData = []
        this.teams.forEach(element => {
          this.chartData.push({name: element.name,  data: [["Reißen", element.snatch], ["Stoßen", element.cj], ["Zweikampf", element.total]], stack: String(i)})
          this.chartData.push({name: element.name + " Hochrechnung",  data: [["Reißen", element.snatch_forecast -  element.snatch], ["Stoßen", element.cj_forecast-element.cj], ["Zweikampf", element.total_forecast-element.total]], stack: String(i)})
         i = i + 1;
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    setTimeout(this.loadData, 5000);
  }
}
</script>
