<template>
  <v-container class="grey darken-3">
    
        <v-row align="center" justify="center">
          
      <v-col cols="1">Reißen</v-col>
      <v-col cols="2">
        <template v-for='item in this.lodash.sortBy(teams, "snatch_forecast")'>
          {{item.name}} : {{item.snatch| round}} Pkt.
           <v-divider></v-divider>
        </template>
      </v-col>
      <v-col cols="9">
        <bar-chart :data=chartDataS :colors=chartColorsS style="height: 150px" :library='{ legend: {labels: { fontColor: "white" } }, scales: {
            yAxes: [{
              gridLines: {
                display:false
            },
                ticks: {
                    fontColor: "white", 
                    fontSize: 0
                },
            }],
          xAxes: [{
            gridLines: {
                color: "white",
            },
                ticks: {
                    fontColor: "white",
                    fontSize: 18
                },
            }]
        }}' ></bar-chart>
      </v-col>
    </v-row>
       <v-row align="center" justify="center">
          
      <v-col cols="1">Stoßen</v-col>
      <v-col cols="2">
        <template v-for='item in this.lodash.sortBy(teams, "cj_forecast")'>
          {{item.name}} : {{item.cj| round}} Pkt.
          <v-divider></v-divider>
        </template>
      </v-col>
      <v-col cols="9">
        <bar-chart :data=chartDataCJ :colors=chartColorsCJ style="height: 150px" :library='{ legend: {display: false}, scales: {
            yAxes: [{
              gridLines: {
                display:false
            },
                ticks: {
                    fontColor: "white", 
                    fontSize: 0
                },
            }],
          xAxes: [{
            gridLines: {
                color: "white",
            },
                ticks: {
                    fontColor: "white",
                    fontSize: 18
                },
            }]
        }}'></bar-chart>
      </v-col>
    </v-row>
            <v-row align="center" justify="center">
          
      <v-col cols="1">Zweikampf</v-col>
      <v-col cols="2">
        <template v-for='item in this.lodash.sortBy(teams, "total_forecast")'>
          {{item.name}} : {{item.total| round}} Pkt.
           <v-divider></v-divider>
        </template>
      </v-col>
      <v-col cols="9">
        <bar-chart :data=chartDataT :colors=chartColorsT style="height: 150px" :library='{ legend: {display: false}, scales: {
            yAxes: [{
              gridLines: {
                display:false
            },
                ticks: {
                    fontColor: "white", 
                    fontSize: 0
                },
            }],
          xAxes: [{
            gridLines: {
                color: "white",
            },
                ticks: {
                    fontColor: "white",
                    fontSize: 18
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
    this.chartColors =  ["navy", "MediumBlue 	", "DarkGreen ", "Green", "DarkRed", "Red", "Orange" , "Yellow"];
    this.chartColorsS =  ["navy", "MediumBlue 	", "DarkGreen ", "Green", "DarkRed", "Red", "Orange" , "Yellow"];
    this.chartColorsCJ =  ["navy", "MediumBlue 	", "DarkGreen ", "Green", "DarkRed", "Red", "Orange" , "Yellow"];
    this.chartColorsT =  ["navy", "MediumBlue 	", "DarkGreen ", "Green", "DarkRed", "Red", "Orange" , "Yellow"];
    this.chartDataS =  [
  {
    name: "SKV", 
    data: [["Reißen", 789.05 ]], 
    stack: "Stack 1"
  },
    {
    name: "SKV Hochrechnung", 
    data: [["Reißen", 800]],
    stack: "Stack 1"
  },
  {
    name: "BRM", 
    data: [["Reißen", 900.32 ]],
    stack: "Stack 2"
  },

  {
    name: "BRM Hochrechung", 
    data: [["Reißen", 1100]],
    stack: "Stack 2"
  },
]; 
   this.chartDataCJ =  [
  {
    name: "SKV", 
    data: [["Stoßen", 932.36 ]], 
    stack: "Stack 1"
  },
    {
    name: "SKV Hochrechnung", 
    data: [["Stoßen", 1000]],
    stack: "Stack 1"
  },
  {
    name: "BRM", 
    data: [ ["Stoßen", 621.58 ]],
    stack: "Stack 2"
  },

  {
    name: "BRM Hochrechung", 
    data: [["Stoßen", 640]],
    stack: "Stack 2"
  },
];
   this.chartDataT =  [
  {
    name: "SKV", 
    data: [["Zweikampf", 1721.41]], 
    stack: "Stack 1"
  },
    {
    name: "SKV Hochrechnung", 
    data: [ ["Zweikampf", 1800.41]],
    stack: "Stack 1"
  },
  {
    name: "BRM", 
    data: [ ["Zweikampf", 1363.89 ]],
    stack: "Stack 2"
  },

  {
    name: "BRM Hochrechung", 
    data: [["Zweikampf", 1400]],
    stack: "Stack 2"
  },
];
  }

  mounted() {
    this.loadData();
    //["Stoßen", element.cj_forecast-element.cj], ["Zweikampf", element.total_forecast-element.total]
  }

  loadData() {
    var api =
      this.source + "api/competitions/" + this.competitionid + "/teams/";
    this.axios
      .get(api)
      .then(response => {
        this.teams = response.data;
        let i = 0;
        this.chartDataS = []
        this.chartDataCJ = []
        this.chartDataT = []

        this.chartColorsS = []
        this.chartColorsCJ = []
        this.chartColorsT = []

        var temp_colors = {}
        var teams_temp = this.lodash.sortBy(this.teams, "name")
        teams_temp.forEach(element => {
          temp_colors [element.name] = [this.chartColors[i], this.chartColors[i+1]];
          i = i + 2;
        });
        var teams_temp = this.lodash.sortBy(this.teams, "snatch_forecast")
        teams_temp.forEach(element => {
          this.chartDataS.push({name: element.name,  data: [["Reißen", element.snatch]], stack: String(i)})
          this.chartDataS.push({name: element.name + " Hochrechnung",  data: [["Reißen", element.snatch_forecast -  element.snatch]], stack: String(i)})
          this.chartColorsS.push(temp_colors[element.name][0])
          this.chartColorsS.push(temp_colors[element.name][1])
          i = i + 1;
        });

        var teams_temp = this.lodash.sortBy(this.teams, "cj_forecast")
        teams_temp.forEach(element => {
          this.chartDataCJ.push({name: element.name,  data: [["Stoßen", element.cj]], stack: String(i)})
          this.chartDataCJ.push({name: element.name + " Hochrechnung",  data: [["Stoßen", element.cj_forecast-element.cj]], stack: String(i)})
          this.chartColorsCJ.push(temp_colors[element.name][0])
          this.chartColorsCJ.push(temp_colors[element.name][1])
          i = i + 1;
        });

        var teams_temp = this.lodash.sortBy(this.teams, "total_forecast")
        teams_temp.forEach(element => {
          this.chartDataT.push({name: element.name,  data: [["Zweikampf", element.total]], stack: String(i)})
          this.chartDataT.push({name: element.name + " Hochrechnung",  data: [["Zweikampf", element.total_forecast-element.total]], stack: String(i)})
          this.chartColorsT.push(temp_colors[element.name][0])
          this.chartColorsT.push(temp_colors[element.name][1])
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
