<template>
  <v-container grid-list-xs>
    <v-layout v-bind="binding">
      <v-flex d-flex xs4>
        <v-card dark>
          <v-card-title class="pb-0 pt-1">
            <div>
              <span class="headline">{{name}}</span>
              <br>
              <span>Verein: {{team}} | Sinclair: {{sf}}</span> 
            </div>
          </v-card-title>
          <v-card-text class="py-1">
            <div>Total: {{total}}kg</div>
            <div>Punkte: {{points}}</div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs4>
        <v-card dark>
          <v-card-title class="pb-0 pt-1">
            <div>
              <span class="headline">Reissen</span>
              <br>
              <span>Best: {{snatch}}kg</span>
            </div>
          </v-card-title>
          <v-card-text class="py-1">
            <template v-for="item in lifts.slice(0, 3)">
              <v-chip class="font-weight-black">
                <v-avatar>
                  <v-icon v-if="item.result === 2" color="green">check</v-icon>
                  <v-icon v-else-if="item.result === 1" color="red">clear</v-icon>
                  <v-icon v-else-if="item.result === 0">timer</v-icon>
                </v-avatar>
                {{item.weight}}
              </v-chip>
            </template>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex d-flex xs4>
        <v-card dark>
          <v-card-title class="pb-0 pt-1">
            <div>
              <span class="headline">Stossen</span>
              <br>
              <br>
              <span></span>
            </div>
          </v-card-title>
          <v-card-text class="py-1">
            <template v-for="item in lifts.slice(3, 6)">
              <v-chip class="font-weight-black">
                <v-avatar>
                  <v-icon v-if="item.result === 2" color="green">check</v-icon>
                  <v-icon v-else-if="item.result === 1" color="red">clear</v-icon>
                  <v-icon v-else-if="item.result === 0">timer</v-icon>
                </v-avatar>
                {{item.weight}}
              </v-chip>
            </template>
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
      name: "Gerald Kettlgruber",
      team: "SKV",
      sf: 1.12,
      sex: "M",
      lifts: [
        { weight: 10, result: 0 },
        { weight: 11, result: 1 },
        { weight: 12, result: 2 },
        { weight: 13, result: 0 },
        { weight: 14, result: 1 },
        { weight: 15, result: 2 }
      ]
    };
  },
  props: ["competitionid"],
  computed: {
    binding() {
      const binding = {};
      binding.column = true;
      if (this.$vuetify.breakpoint.mdAndUp) binding.column = false;

      return binding;
    }, 
    snatch () {
      var data = this.lifts.slice(0,3).filter(lift => lift.result === 2).map(lift => parseInt(lift.weight));
      var max = 0;
      if (Math.max.apply(Math, data) > max){
        return Math.max.apply(Math, data);
      }
      return max;
    },
    cj () {
      var data = this.lifts.slice(3,6).filter(lift => lift.result === 2).map(lift => lift.weight);
      var max = 0;
      if (Math.max.apply(Math, data) > max){
        return Math.max.apply(Math, data);
      }
      return max;
    }, 
    total () {
      return this.snatch + this.cj
    }, 
    points () {
      return (this.total * this.sf).toFixed(2);
    }
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      var api =
        this.source + "api/competitions/" + this.competitionid + "/lifters/current/";
      this.axios
        .get(api)
        .then(response => {
          console.log(response);
          this.name = response.data.name;
          this.sf = response.data.sf;
          this.sex = response.data.sex;
          this.team = response.data.team.short;
          this.lifts = response.data.lifts;
        })
        .catch(function(error) {
          console.log(error);
        });
      setTimeout(this.loadData, 5000);
    }
  }
};
</script>