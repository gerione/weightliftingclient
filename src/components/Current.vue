<template>
  <v-container class="grey darken-3">
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="4" lg="4">
        <span class="headline font-weight-bold">{{lifter.name}} // {{lifter.masterdata.club_single_short}}</span>
      </v-col>
      <v-col cols="12" sm="12" md="3" lg="3" class="mt-1" >
        <span
          class="subtitle-1 font-weight-bold" 
        >Sinclair: {{lifter.sf}}</span>
      </v-col>
    </v-row>
    </v-row>
    <v-row no-gutters>
      <template v-for="lift in lifter.lifts.slice(0, 3)">
        <v-col cols="3" sm="3" md="1" lg="1">
          <v-sheet
            label
            v-if="lift.result === 2"
            :width="50"
            color="green"
            text-color="white"
            class="font-weight-black subheading text-center"
          >{{lift.weight}}</v-sheet>
          <v-sheet
            label
            v-else-if="lift.result === 1"
            :width="50"
            color="red"
            text-color="white"
            class="font-weight-black subheading text-center"
          >{{lift.weight}}</v-sheet>
          <v-sheet
            label
            v-else-if="lift.result === 0"
            :width="50"
            color="black"
            text-color="white"
            class="font-weight-black subheading text-center"
          >{{lift.weight}}</v-sheet>
        </v-col>
      </template>
      
      
      <v-col cols="3" sm="3" md="1" lg="1">
        <v-sheet
          label
          :width="80"
          color="grey"
          text-color="white"
          class="font-weight-black subheading text-center"
        >{{this.snatch() * this.lifter.sf | round }}</v-sheet>
      </v-col>

      <v-col cols="3" sm="3" md="1" lg="1" v-if="$vuetify.breakpoint.mdAndUp"> </v-col>
      <template v-for="lift in lifter.lifts.slice(3, 6)">
        <v-col cols="3" sm="3" md="1" lg="1">
          <v-sheet
            label
            v-if="lift.result === 2"
            :width="50"
            color="green"
            text-color="white"
            class="font-weight-black subheading text-center"
          >{{lift.weight}}</v-sheet>
          <v-sheet
            label
            v-else-if="lift.result === 1"
            :width="50"
            color="red"
            text-color="white"
            class="font-weight-black subheading text-center"
          >{{lift.weight}}</v-sheet>
          <v-sheet
            label
            v-else-if="lift.result === 0"
            :width="50"
            color="black"
            text-color="white"
            class="font-weight-black subheading text-center"
          >{{lift.weight}}</v-sheet>
        </v-col>
      </template>

      <v-col cols="3" sm="3" md="1" lg="1">
        <v-sheet
          label
          :width="80"
          color="grey"
          text-color="white"
          class="font-weight-black subheading text-center"
        >{{this.cj() * this.lifter.sf | round }}</v-sheet>
      </v-col>
      
      <v-col cols="3" sm="3" md="1" lg="1"  v-if="$vuetify.breakpoint.mdAndUp"> </v-col>
      <v-col cols="3" sm="3" md="1" lg="1">
        <v-sheet
          label
          :width="50"
          color="grey"
          text-color="white"
          class="font-weight-black subheading text-center"
        >{{this.total()}}</v-sheet>
      </v-col>
      <v-col cols="3" sm="3" md="1" lg="1" >
        <v-sheet
          label
          :width="80"
          color="grey"
          text-color="white"
          class="font-weight-black subheading text-center"
        >{{this.points() | round}}</v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

interface Weightclass {
  id: number;
  max_weight: number;
  min_weight: number;
  name: string;
  sex: boolean;
}
interface Team {
  id: number;
  name: string;
  short: string;
}

interface Lift {
  attempt: number;
  id: number;
  result: number;
  weight: number;
}

interface Masterdata {
  club_single: string;
  club_single_short: string;
  club_team: string;
  club_team_short: string;
  id: string;
  name: string;
  sex: boolean;
  year: number;
}

interface Lifter {
  name: string;
  sex: boolean;
  sf: number;
  lifts: Lift[];
  team: Team;
  weightclass: Weightclass;
  masterdata: Masterdata;
}

@Component({
  filters: {
    round(value: number) {
      if (value == null) return 0;
      return value.toFixed(2);
    }
  }
})
export default class Current extends Vue {
  @Prop() competitionid: number;
  lifter: Lifter;

  constructor() {
    super();
    let team = { id: -1, name: "default", short: "def" };
    let weightclass = {
      id: -1,
      sex: false,
      min_weight: 1,
      max_weight: 9999,
      name: "none"
    };
    let attempt = { id: 1, attempt: 1, number: 1, weight: 1, result: 1 };
    let lifts = [attempt, attempt, attempt, attempt, attempt, attempt];
    let master = {
      club_single: "default single",
      club_single_short: "def",
      club_team: "default team",
      club_team_short: "def",
      id: "XYZ1",
      name: "Max Muster",
      sex: false,
      year: 1900
    };
    this.lifter = {
      name: "default",
      sex: false,
      sf: 1.0,
      team: team,
      weightclass: weightclass,
      lifts: lifts,
      masterdata: master
    };
  }

  snatch(): number {
    var data = this.lifter.lifts
      .slice(0, 3)
      .filter(lift => lift.result === 2)
      .map(lift => lift.weight);
    var max = 0;
    if (Math.max.apply(Math, data) > max) {
      return Math.max.apply(Math, data);
    }
    return max;
  }

  cj(): number {
    var data = this.lifter.lifts
      .slice(3, 6)
      .filter(lift => lift.result === 2)
      .map(lift => lift.weight);
    var max = 0;
    if (Math.max.apply(Math, data) > max) {
      return Math.max.apply(Math, data);
    }
    return max;
  }
  total(): number {
    return this.snatch() + this.cj();
  }

  points(): number {
    return this.total() * this.lifter.sf;
  }

  mounted() {
    this.loadData();
  }

  loadData() {
    var api =
      this.source +
      "api/competitions/" +
      this.competitionid +
      "/lifters/current/";
    this.axios
      .get(api)
      .then(response => {
        this.lifter = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    setTimeout(this.loadData, 5000);
  }
}
</script>