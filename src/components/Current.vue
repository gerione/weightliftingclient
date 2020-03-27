<template>
  <v-container class="grey darken-3">
    <v-row no-gutters>
      <v-col cols="10" sm="10" md="10" lg="10">
        <span v-if="competition.type==='team'" class="headline font-weight-bold">{{lifter.name}} // {{lifter.masterdata.club_team_short}} //</span>
        <span v-else class="headline font-weight-bold">{{lifter.name}} // {{lifter.masterdata.club_single_short}} //</span>
        <span v-if="competition.type==='team'"
          class="subtitle-1 font-weight-bold" 
        > Sinclair: {{lifter.sf}}</span>
        <span v-else
          class="subtitle-1 font-weight-bold" 
        > Klasse: {{lifter.weightclass.name}}</span>
      </v-col>
      <v-col cols="2" sm="2" md="2" lg="2" v-if="competition.external_timer == false">
        <Countdown :competitionid="competitionid"></Countdown>
      </v-col>
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
import Countdown from "./countdown/Countdown";

@Component({
  filters: {
    round(value: number) {
      if (value == null) return 0;
      return value.toFixed(2);
    }
  },
  components: {
    Countdown
  }
})
export default class Current extends Vue {
  @Prop() competitionid: number;

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

  get competition() {
    try {
        return this.$store.getters.currentCompetition;
      }
      catch(e) {
        console.log(e);
      }
      return null;
  }

  get lifter() {
    try {
        return this.$store.getters.currentAthlete;
      }
      catch(e) {
        console.log(e);
      }
      return null;
  }
}
</script>