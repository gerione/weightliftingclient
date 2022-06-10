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

<script lang="ts">
import Current from './Current'
import TeamStandings from './TeamStandings'
import ScoreboardTable from './ScoreboardTable'
import  Vue from "vue";
import {Component, Prop, Watch} from 'vue-property-decorator';

interface CompetitionItem {
  id: number;
  name: string;
  location?: string;
  start_time?: string;
  youtube_id?: string;
  type?: string;
}
 
@Component({
  components: {
    TeamStandings,
    ScoreboardTable,
    Current,
  }
})
export default class Competition extends Vue  {
  @Prop() competitionid: number;
  type: string = "single";
  competition: CompetitionItem = {id: -1, name: "default"}; 
  
  @Watch('$route', { immediate: true, deep: true })
    onUrlChange(newVal: any) {
      this.loadCompInfo();
  }
  mounted () {
     this.loadCompInfo();
  }
  
  loadCompInfo() { 
    var api = this.source + "api/competitions/" + this.competitionid + "/";

    this.axios.get(api).then(response => {
      this.competition = response.data.competition;
      this.type = response.data.competition.type;
        console.log("route changed" + this.type);
    });
  }
};
</script>