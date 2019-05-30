<template>
  <v-container grid-list-xs>
    <v-layout v-bind="binding">
      <v-flex d-flex xs12>
        <v-card dark>
          <v-card-title class="pb-0 pt-1">
            <div>
              <span class="headline">{{lifter.name}}</span>
              <br />
              <span v-if="1 === 1">Verein: {{lifter.masterdata.club_single_short}} &nbsp; | &nbsp;  Sinclair: {{lifter.sf}}</span>
            </div>
          </v-card-title>
          <v-card-text>
            <template v-for="lift in lifter.lifts.slice(0, 3)">
              <td class="text-xs-center" width="80">
                <v-sheet
                  label
                  v-if="lift.result === 2"
                  :width="50"
                  color="green"
                  text-color="white"
                  class="font-weight-black subheading"
                >{{lift.weight}}</v-sheet>
                <v-sheet
                  label
                  v-else-if="lift.result === 1"
                  :width="50"
                  color="red"
                  text-color="white"
                  class="font-weight-black subheading"
                >{{lift.weight}}</v-sheet>
                <v-sheet
                  label
                  v-else-if="lift.result === 0"
                  :width="50"
                  color="black"
                  text-color="white"
                  class="font-weight-black subheading"
                >{{lift.weight}}</v-sheet>
              </td>
            </template>
            <td class="text-xs-center" width="80">
              <v-sheet
                label
                :width="80"
                color="grey"
                text-color="white"
                class="font-weight-black subheading"
              >{{snatch * this.lifter.sf | round }}</v-sheet>
            </td>
            <td width="60"/>
            <template v-for="lift in lifter.lifts.slice(3, 6)">
              <td class="text-xs-center" width="80">
                <v-sheet
                  label
                  v-if="lift.result === 2"
                  :width="50"
                  color="green"
                  text-color="white"
                  class="font-weight-black subheading"
                >{{lift.weight}}</v-sheet>
                <v-sheet
                  label
                  v-else-if="lift.result === 1"
                  :width="50"
                  color="red"
                  text-color="white"
                  class="font-weight-black subheading"
                >{{lift.weight}}</v-sheet>
                <v-sheet
                  label
                  v-else-if="lift.result === 0"
                  :width="50"
                  color="black"
                  text-color="white"
                  class="font-weight-black subheading"
                >{{lift.weight}}</v-sheet>
              </td>
            </template>

            <td class="text-xs-center" width="80">
              <v-sheet
                label
                :width="80"
                color="grey"
                text-color="white"
                class="font-weight-black subheading"
              >{{cj * this.lifter.sf | round }}</v-sheet>
            </td>
            <td width="60"/>
            <td class="text-xs-center" width="80">
              <v-sheet
                label
                :width="50"
                color="grey"
                text-color="white"
                class="font-weight-black subheading"
              >{{total}}</v-sheet>
            </td>
            <td class="text-xs-center" width="80">
              <v-sheet
                label
                :width="80"
                color="grey"
                text-color="white"
                class="font-weight-black subheading"
              >{{points | round}}</v-sheet>
            </td>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      lifter: {
        id: 12,
        lifter_id: 4945,
        lifts: [
          {
            attempt: 1,
            id: 193,
            result: 0,
            weight: 1.0
          },
          {
            attempt: 2,
            id: 194,
            result: 0,
            weight: 0.0
          },
          {
            attempt: 3,
            id: 195,
            result: 0,
            weight: 0.0
          },
          {
            attempt: 4,
            id: 196,
            result: 0,
            weight: 0.0
          },
          {
            attempt: 5,
            id: 197,
            result: 0,
            weight: 0.0
          },
          {
            attempt: 6,
            id: 198,
            result: 0,
            weight: 0.0
          }
        ],
        name: " ",
        sex: true,
        sf: 1.0000,
        team: {
          id: 1,
          name: "default",
          short: ""
        },
        weightclass: {
          id: 4,
          max_weight: 59.0,
          min_weight: 55.0,
          name: "W-59",
          sex: true
        }
      }
    };
  },
  props: ["competitionid"],
  filters: {
    round: function(value) {
      return value.toFixed(2);
    }
  },
  computed: {
    binding() {
      const binding = {};
      binding.column = true;
      if (this.$vuetify.breakpoint.mdAndUp) binding.column = false;

      return binding;
    },
    snatch() {
      var data = this.lifter.lifts
        .slice(0, 3)
        .filter(lift => lift.result === 2)
        .map(lift => parseInt(lift.weight));
      var max = 0;
      if (Math.max.apply(Math, data) > max) {
        return Math.max.apply(Math, data);
      }
      return max;
    },
    cj() {
      var data = this.lifter.lifts
        .slice(3, 6)
        .filter(lift => lift.result === 2)
        .map(lift => lift.weight);
      var max = 0;
      if (Math.max.apply(Math, data) > max) {
        return Math.max.apply(Math, data);
      }
      return max;
    },
    total() {
      return this.snatch + this.cj;
    },
    points() {
      return this.total * this.lifter.sf;
    }
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
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
};
</script>