<template>
  <v-container>
    <template v-for="(liftersa, key) in groups(currentLifters)">
      <v-row class="grey darken-3">
        <v-col>
          <v-data-table
            :headers="computedHeaders"
            :items="liftersa"
            item-key="name"
            hide-default-footer
            dark
            must-sort
          >
            <template v-slot:no-data>
              <v-alert :value="true" color="success" type="success">Wettkampf wird geladen!</v-alert>
            </template>

            <template v-slot:item.snatch="{ item  }">
               <v-row no-gutters>
                <template v-for="lift in item.lifts.slice(0,3)">
                  <v-col cols="4" sm="4" md="4" lg="4">
                    <v-sheet
                      label
                      v-if="lift.result === 2"
                      :width="40"
                      color="green"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                    <v-sheet
                      label
                      v-else-if="lift.result === 1"
                      :width="40"
                      color="red"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                    <v-sheet
                      label
                      v-else-if="lift.result === 0"
                      :width="40"
                      color="black"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                  </v-col>
                </template>
               </v-row>
            </template>
            <template v-slot:item.cj="{ item  }">
              <v-row no-gutters>
                <template v-for="lift in item.lifts.slice(3,6)">
                  <v-col cols="4" sm="4" md="4" lg="4">
                    <v-sheet
                      v-if="lift.result === 2"
                      :width="40"
                      color="green"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                    <v-sheet
                      v-else-if="lift.result === 1"
                      :width="40"
                      color="red"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                    <v-sheet
                      label
                      v-else-if="lift.result === 0"
                      :width="40"
                      color="black"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                  </v-col>
                </template>
              </v-row>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
      </v-row>
    </template>
  </v-container>
</template>

<style scoped>
>>>.v-data-table th {
  font-size: 20px;
}

>>>.v-data-table td {
  font-size: 20px;
}
</style>

<script lang="ts">

import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Team } from "@/interfaces/Team";
import { Header } from "@/interfaces/Header";


  

export interface Pagination {
  rowsPerPage: number;
  sortBy: string;
}

@Component({
  filters: { 
    round(value: number) {
      if (value == null) return 0;
      return value.toFixed(2);
    }
  }
})

export default class ScoreboardTable extends Vue {
  @Prop() competitionid: number;
  @Prop() type: string;

  headers: Header[];
  pagination: Pagination;
  constructor() {
    super(); 
    this.headers = [];
    this.headers.push({
      text: "Name",
      align: "left",
      value: "name",
      span: 1,
      width: 200,
      sortable: false
    });

    if (this.type === 'single') {
      this.headers.push({
        text: "Team",
        value: "masterdata.club_single_short",
        span: 1,
        width: 30,
        sortable: false
      });
    }
    else {
      this.headers.push({
        text: "Team",
        value: "team.short",
        span: 1,
        width: 30,
        sortable: false
      });
    }
    
   
this.headers.push({
      text: "Klasse",
      value: "weightclass.name",
      span: 1,
      width: 50,
      sortable: true
    });
       
    this.headers.push({
      text: "SF",
      value: "sf",
      span: 1,
      width: 50,
      sortable: false
    });
    this.headers.push({
      text: "Reißen",
      value: "snatch",
      span: 4,
      width: 80,
      sortable: false
    });
    this.headers.push({
      text: "Stoßen",
      value: "cj",
      span: 4,
      width: 80,
      sortable: false
    });
    this.pagination = { rowsPerPage: -1, sortBy: "weightclass.id" };
  }

  groups(lifters1) {
    
    if (lifters1 == null || lifters1.length == 0 || lifters1.length === undefined) {
      return null;
    }
    const lifters = []; 
    lifters1.forEach(val => lifters.push(Object.assign({}, val)));

    var sortedLifters = lifters.sort(function(l1,l2){
      var openLifts1 = l1.lifts.filter(obj => {
        return obj.result === 0
      })
      var openLifts2 = l2.lifts.filter(obj => {
        return obj.result === 0
      })
      if (openLifts1.length === 0 && openLifts2.length === 0){
        return -1;  
      }
      if (openLifts1.length > 0 && openLifts2.length === 0){
        return -1;  
      }
      if (openLifts1.length === 0 && openLifts2.length > 0){
        return 1;  
      }
      var minAttempt1 = openLifts1.reduce(function(prev, curr) {    
        return (prev.weight > curr.weight) && (prev.attempt > curr.attempt)? curr : prev;
      });
      var minAttempt2 = openLifts2.reduce(function(prev, curr) {    
        return (prev.weight > curr.weight) && (prev.attempt > curr.attempt)? curr : prev;
      });
      
      if (minAttempt1.weight > minAttempt2.weight) {
        return 1
      }
      else if (minAttempt1.weight < minAttempt2.weight) {
        return -1
      }
      return minAttempt1.attempt > minAttempt2.attempt ? 1 : minAttempt1.attempt < minAttempt2.attempt ? -1 : 0;
    });
    
    return { Wettkampf:sortedLifters};
  }

  get computedHeaders () {
    return this.headers;
  }

  get currentLifters() {
    try {
        return this.$store.getters.lifters;
      }
      catch(e) {
        console.log(e);
      }
      return null;
  }
}
</script>

