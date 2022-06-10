<template>
  <v-container grid-list-xs>
    <v-layout>
        <template v-for="item in teams">
      <v-flex :key="item.id" d-flex xs3>
        <v-card dark>
          <v-card-title class="pb-0 pt-1">
            <span class="headline">{{item.name}}</span>
            
          </v-card-title>
          <v-card-text class="py-1">
            <div>Zweikampf: {{item.total_forecast | round}} / {{item.total| round}} Pkt.</div>
            <div>Reißen: {{item.snatch_forecast| round}} / {{item.snatch| round}} Pkt. Pkt.</div>
            <div>Stoßen: {{item.cj_forecast| round}} / {{item.cj| round}} Pkt. Pkt.</div>
          </v-card-text>
        </v-card>
      </v-flex>
        </template>
    </v-layout>
  </v-container>
</template>

<script lang="ts">

import  Vue from "vue";
import {Component, Prop} from 'vue-property-decorator';
import {Team} from  '@/interfaces/Team'

@Component({
  filters: { round(value:number) { 
    if (value == null)
      return 0;
    return value.toFixed(2); } }
})

export default class TeamStandings extends Vue {
  @Prop() competitionid!: number;
  teams: Team[];
  constructor(){
    super();
    this.teams = [];
  }

  mounted() {
    this.loadData();
  }
  
  loadData() {
      var api = this.source + "api/competitions/" + this.competitionid + "/teams/";
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
};

</script>
