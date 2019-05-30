<template>

      <v-layout row wrap grid-list-md text-xs-center>
        <v-flex xs12 class="display-2">{{ competition.name }}</v-flex>
        <Current :competitionid="competitionid" />
        <TeamStandings v-if="type === 'team'"  :competitionid="competitionid" />
        <v-flex d-flex xs12>
          <ScoreboardTable :competitionid="competitionid" :type="type"></ScoreboardTable>
        </v-flex>
<!-- 
        <v-flex xs12>
          <v-carousel :interval="15000" :height="400">
            <v-carousel-item v-for="(item,i) in sponsors" :key="i" :src="item.src"></v-carousel-item>
          </v-carousel>
        </v-flex>
        -->
      </v-layout>
</template>

<script>

import Current from './Current'
import TeamStandings from './TeamStandings'
import ScoreboardTable from './ScoreboardTable'


export default {
  props: ["competitionid"],
  data() {
    return {
      type:null,
      competition: {name:"default"},
    };
  },
  components: {
    Current, 
    TeamStandings, 
    ScoreboardTable
  },
   watch: {
    $route(to, from) {
      // react to route changes...
      // here i can ask the api for updates
      this.loadCompInfo();
    }
  },
  mounted: function() {
     this.loadCompInfo();
  },
  methods: {
    loadCompInfo: function() { 
      var api = this.source + "api/competitions/" + this.competitionid + "/";
     
      this.axios.get(api).then(response => {
        this.competition = response.data.competition;
        this.videoId = response.data.competition.youtube_id;
        this.type = response.data.competition.type;
         console.log("route changed" + this.type);
      });
    }
  }
};
</script>