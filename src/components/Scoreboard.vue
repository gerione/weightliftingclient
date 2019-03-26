<template>
  <v-tabs v-model="active" fixed-tabs>
    <v-tab key:1>Tabelle</v-tab>
    <v-tab key:2>Stream</v-tab>
    <v-tabs-items touchless>
    <v-tab-item key:1>
      <v-layout row wrap grid-list-md text-xs-center>
        <v-flex xs12>Willkommen bei Wettkampf {{ competitionid }}</v-flex>
        <Current :competitionid="competitionid" />
        <TeamStandings :competitionid="competitionid" />
        <v-flex d-flex xs12>
          <scoreboardtable :competitionid="competitionid" ref="scoreboardtable"></scoreboardtable>
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
        <!-- 
        <v-flex xs12>
          <v-carousel :interval="15000" :height="400">
            <v-carousel-item v-for="(item,i) in sponsors" :key="i" :src="item.src"></v-carousel-item>
          </v-carousel>
        </v-flex>
        -->
      </v-layout>
    </v-tab-item>
     </v-tabs-items>
  </v-tabs>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<script>

import Current from './Current'
import TeamStandings from './TeamStandings'

export default {

  data() {
    return {
      active: "Tabelle",
      competitionid: -1,
      videoId: "21X5lGlDOfg",
      playerVars: {
        autoplay: 1,
        
      },
      sponsors: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        }
      ]
    };
  },
  components: {
    Current, 
    TeamStandings
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      // here i can ask the api for updates
      this.competitionid = parseInt(this.$route.params.id);
      this.$refs.scoreboardtable.competitionid = this.competitionid;  
      var api = this.source + "api/competitions/" + this.competitionid + "/";
     
      this.axios.get(api).then(response => {
        this.videoId = response.data.competition.youtube_id;
      });

      console.log("route changed" + this.competitionid);
    }
  },
  mounted: function() {
     this.competitionid = parseInt(this.$route.params.id);
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  }
};
</script>