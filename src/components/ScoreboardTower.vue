<template>
  <v-container>
    <template v-for="(liftersa, key) in groups">
      <v-row class="grey darken-3">
        <v-col>
          <v-data-table
            :headers="computedHeaders"
            :items="liftersa"
            mobile-breakpoint="0"
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
                      height="20"
                      width="15"
                      color="green"
                    > </v-sheet>
                    <v-sheet
                      label
                      v-else-if="lift.result === 1"
                      height="20"
                      width="15"
                      color="red"
                    > </v-sheet>
                    <v-sheet
                      label
                      v-else-if="lift.result === 0"
                      height="20"
                      width="15"
                      color="white"
                    > </v-sheet>
                  </v-col>
                </template>
               </v-row>
            </template>
            <template v-slot:item.cj="{ item  }">
              <v-row no-gutters>
                <template v-for="lift in item.lifts.slice(3,6)">
                  <v-col cols="4" sm="4" md="4" lg="4">
                    <v-sheet
                      label
                      v-if="lift.result === 2"
                      :elevation="1"
                      height="20"
                      width="10"
                      color="green"
                    > </v-sheet>
                    <v-sheet
                      label
                      v-else-if="lift.result === 1"
                      height="20"
                      width="10"
                      color="red"
                    > </v-sheet>
                    <v-sheet
                      label
                      v-else-if="lift.result === 0"
                      height="20"
                      width="10"
                      color="white"
                    > </v-sheet>
                  </v-col>
                </template>
              </v-row>
            </template>

            <template v-slot:item.best="{ item }">
              <v-row no-gutters>
                 <v-col cols="4" sm="4" md="4" lg="4">
                    <v-sheet
                      label
                      :width="40"
                      height="20"
                      color="grey"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{best(item)}}</v-sheet>
                    </v-col>
              </v-row>
            </template>

            <template v-slot:item.next="{ item }">
              <v-row no-gutters>
                 <v-col cols="4" sm="4" md="4" lg="4">
                    <v-sheet
                      label
                      :width="40"
                      height="20"
                      color="grey"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{next(item)}}</v-sheet>
                    </v-col>
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

  teams: Team[];
  headers: Header[];
  pagination: Pagination;
  constructor() {
    super();
    this.teams = [];
    this.headers = [];
    this.headers.push({
      text: "Name",
      align: "left",
      value: "name",
      span: 1,
      width: 100,
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
        width: 20,
        sortable: false
      });
    }
  
    this.headers.push({
      text: "R",
      value: "snatch",
      span: 4,
      width: 50,
      sortable: false
    });
    this.headers.push({
      text: "Stoßen", 
      value: "cj",
      span: 4,
      width: 20,
      sortable: false
    });
    this.headers.push({
      text: "Best", 
      value: "best",
      span: 4,
      width: 20,
      sortable: false
    });
    this.headers.push({
      text: "Next", 
      value: "next",
      span: 4,
      width: 20,
      sortable: false
    });
    this.pagination = { rowsPerPage: -1, sortBy: "weightclass.id" };
  }

  next (lifter) {
    var data = lifter.lifts.slice(0, 3)
            .filter(lift => lift.result === 0)
            .map(lift => lift.weight);
    var min = 9999;
    if (data.length > 0){
      min = data[0]
      if (min == 0) {
         var data = 
           lifter.lifts.slice(0, 3)
              .filter(lift => lift.result === 0)
              .map(lift => lift.weight);
      
          if (data.length === 0){
            min = lifter.max_cj + 1
          }
          else {
            min = lifter.max_snatch + 1
          }
      }
    }
    return min;

  }

  best (lifter) {
    var data = lifter.lifts.slice(0, 3)
              .filter(lift => lift.result === 0)
              .map(lift => lift.weight);
      
    if (data.length === 0){
      return lifter.max_cj 
    }
    else {
      return lifter.max_snatch 
    }
  }

  get groups() {
    var lifters1 = this.currentLifters
    if (lifters1 == null || lifters1.length == 0 || lifters1.length === undefined) {
      return null;
    }
    const lifters = []; 
    lifters1.forEach(val => lifters.push(Object.assign({}, val)));

    if (this.type === "single") {
      return { Wettkampf: this.lodash.sortBy(lifters, "weightclass.id") };
    } else {
      return this.lodash.groupBy(lifters, "team.short");
    }
  }

  get computedHeaders () {
    var data = this.lodash.map(this.$store.getters.lifters,
      function(lifter) {
          return lifter.lifts.slice(0, 3)
              .filter(lift => lift.result === 0)
              .map(lift => lift.weight);
      }).filter(function(sub) {
        return sub.length;
      });
      
    if (data.length > 0){
      var newheaders = this.lodash.filter(this.headers, function(n) { return n.text !== "Stoßen";})
    }
    return newheaders;
  }
  
  long_name(column) {
    if (this.teams == null) {
      return null;
    }
    var team = this.lodash.find(this.teams, function(o) {
      return o.short === column;
    });
    if (team == null) {
      return null;
    }
    return team.name;
  }

  points(column, type: string): number {
    if (this.teams == null) {
      return 0;
    }
    var team = this.lodash.find(this.teams, function(o) {
      return o.short === column;
    });
    if (team == null){
      return 0;
    }
    if (type === "cj") {
      return team.cj;
    } else if (type === "snatch") {
      return team.snatch;
    } else if (type === "total") {
      return team.total;
    } else if (type === "cj_additional_points") {
      return team.cj_additional_points;
    } else if (type === "snatch_additional_points") {
      return team.snatch_additional_points;
    }
    return 0;
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