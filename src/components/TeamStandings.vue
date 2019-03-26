<template>
  <v-container grid-list-xs>
    <v-layout v-bind="binding">
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

<script>
export default {
   data() {
    return {
      teams: [
        {
            "cj": 0.0, 
            "cj_forecast": 0.0, 
            "id": 1, 
            "name": "SK VÖEST III",
            "short": "", 
            "snatch": 0.0, 
            "snatch_forecast": 0.0, 
            "total": 110.0, 
            "total_forecast": 1802.2
        },
         {
            "cj": 0.0, 
            "cj_forecast": 0.0, 
            "id": 2, 
            "name": "United Lifters Dornbirn",
            "short": "", 
            "snatch": 0.0, 
            "snatch_forecast": 0.0, 
            "total": 110.0, 
            "total_forecast": 1802.2
        }
        ]
    };
  },
  filters: {
  round: function (value) {
    return value.toFixed(2);
  }
    }, 
  props: ["competitionid"],
  computed: {
    binding() {
      const binding = {};
      binding.column = true;
      if (this.$vuetify.breakpoint.mdAndUp) binding.column = false;

      return binding;
    }
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      var api =
        this.source + "api/competitions/" + this.competitionid + "/teams/";
      this.axios
        .get(api)
        .then(response => {
          console.log(response);
          this.teams = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      setTimeout(this.loadData, 5000);
    }
  }
};
</script>