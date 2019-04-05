<template>
  <v-tabs v-model="active" fixed-tabs>
    <v-tab key:1>Tabelle</v-tab>
    <v-tab key:2>Stream</v-tab>
    <v-tabs-items touchless>
    <v-tab-item key:1>
      <v-layout row wrap grid-list-md text-xs-center>
        <v-flex xs12>Willkommen bei Wettkampf {{ competitionid }}</v-flex>
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
    </v-tab-item>
    <v-tab-item key:2>
      <v-layout row wrap grid-list-md text-xs-center>
        <v-flex xs12>Willkommen bei Wettkampf {{ competitionid }}</v-flex>
       
        <v-flex xs12>
          <youtube :video-id="videoId" ref="youtube" :player-vars="playerVars" height="400"></youtube>
        </v-flex>

      </v-layout>
    </v-tab-item>
     </v-tabs-items>
  </v-tabs>
</template>

<script>

import Current from './Current'
import TeamStandings from './TeamStandings'
import ScoreboardTable from './ScoreboardTable'


export default {
  props: ["competitionid"],
  data() {
    return {
      active: "Tabelle",
      videoId: "21X5lGlDOfg",
      playerVars: {
        autoplay: 1,
        
      },
      type:null
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
        this.videoId = response.data.competition.youtube_id;
        this.type = response.data.competition.type;
         console.log("route changed" + this.type);
      });
    }
  }, 
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  }
};
</script>