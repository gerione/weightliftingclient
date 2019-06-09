<template>
  <div align="center" style="width: 100%;">
    <template v-for="(liftersa, key) in groups">
      <v-container grid-list-md fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card>
              <v-data-table
                :headers="headers"
                :items="liftersa"
                :pagination.sync="pagination"
                select-all
                item-key="name"
                hide-actions
                class="elevation-1"
                dark
                must-sort

              >
                <template v-slot:no-data>
                  <v-alert
                    :value="true"
                    color="success"
                    type="success"
                  >Wettkampf wird geladen!</v-alert>
                </template>
                <template v-slot:headers="props">
                  <tr>
                    <th
                      v-for="header in props.headers"
                      :key="header.text"
                      :colspan="header.span"
                      :width="header.width"
                    >{{ header.text }}</th>
                  </tr>
                </template>
                <template v-slot:items="props">
                  <td class="subheading">{{ props.item.name }}</td>
                  <td v-if="type === 'single'" class="text-xs-center subheading">{{ props.item.masterdata.club_single_short }}</td>
                  <td v-else class="text-xs-center subheading">{{ props.item.team.short }}</td>
                  <td class="text-xs-center subheading">{{ props.item.weightclass.name }}</td>
                  <td class="text-xs-center subheading">{{ props.item.sf }}</td>
                  <template v-for="lifts in props.item.lifts.slice(0,3)">
                    <td class="text-xs-center">
                      <v-sheet
                        label
                        v-if="lifts.result === 2"
                        :width="50"
                        color="green"
                        text-color="white"
                        class="font-weight-black subheading"
                      >{{lifts.weight}}</v-sheet>
                      <v-sheet
                        label
                        v-else-if="lifts.result === 1"
                        :width="50"
                        color="red"
                        text-color="white"
                        class="font-weight-black subheading"
                      >{{lifts.weight}}</v-sheet>
                      <v-sheet
                        label
                        v-else-if="lifts.result === 0"
                        :width="50"
                        color="black"
                        text-color="white"
                        class="font-weight-black subheading"
                      >{{lifts.weight}}</v-sheet>
                    </td>
                  </template>
                  <td class="text-xs-center">
                    <v-sheet
                      label
                      :width="70"
                      color="grey"
                      text-color="white"
                      class="font-weight-black subheading"
                    >{{props.item.snatch_points | round}}</v-sheet>
                  </td>
                  <template v-for="lifts in props.item.lifts.slice(3,6)">
                    <td class="text-xs-center">
                      <v-sheet
                        label
                        v-if="lifts.result === 2"
                        :width="50"
                        color="green"
                        text-color="white"
                        class="font-weight-black subheading"
                      >{{lifts.weight}}</v-sheet>
                      <v-sheet
                        label
                        v-else-if="lifts.result === 1"
                        :width="50"
                        color="red"
                        text-color="white"
                        class="font-weight-black subheading"
                      >{{lifts.weight}}</v-sheet>
                      <v-sheet
                        label
                        v-else-if="lifts.result === 0"
                        :width="50"
                        color="black"
                        text-color="white"
                        class="font-weight-black subheading"
                      >{{lifts.weight}}</v-sheet>
                    </td>
                  </template>
                  <td class="text-xs-center">
                    <v-sheet
                      label
                      :width="70"
                      color="grey"
                      text-color="white"
                      class="font-weight-black subheading"
                    >{{props.item.cj_points | round}}</v-sheet>
                  </td>
                  <td class="text-xs-center">
                    <v-sheet
                      label
                      :width="70"
                      color="grey"
                      text-color="white"
                      class="font-weight-black subheading"
                    >{{ (props.item.max_cj+ + props.item.max_snatch) }}</v-sheet>
                  </td>
                  <td class="text-xs-center">
                    <v-sheet
                      label
                      :width="70"
                      color="grey"
                      text-color="white"
                      class="font-weight-black subheading"
                    >{{(props.item.cj_points + props.item.snatch_points) | round}}</v-sheet>
                  </td>
                </template>
                <template v-if="type === 'team'" v-slot:footer>
                  <tr>
                    <td :colspan="4" rowspan="2">
                      <span class="headline">{{ long_name(key) }}</span>
                    </td>
                    <td :colspan="3">
                      <strong>Jugendpunkte</strong>
                    </td>
                    <td class="text-xs-center" :colspan="1">
                      <v-sheet
                        label
                        color="grey"
                        text-color="white"
                        :width="70"
                        class="font-weight-black subheading"
                      >{{points(key, "snatch_additional_points") | round}}</v-sheet>
                    </td>
                    <td :colspan="3">
                      <strong></strong>
                    </td>
                    <td class="text-xs-center" :colspan="1">
                      <v-sheet
                        label
                        color="grey"
                        text-color="white"
                        :width="70"
                        class="font-weight-black subheading"
                      >{{points(key, "cj_additional_points")  | round}}</v-sheet>
                    </td>
                    <td :colspan="1">
                      <strong></strong>
                    </td>
                    <td class="text-xs-center" :colspan="1">
                      <v-sheet
                        label
                        color="grey"
                        text-color="white"
                        :width="70"
                        class="font-weight-black subheading"
                      >{{(points(key, "snatch_additional_points") + points(key, "cj_additional_points") ) | round}}</v-sheet>
                    </td>
                  </tr>
                  <tr>
                    <td :colspan="3">
                      <strong>Summe</strong>
                    </td>
                    <td class="text-xs-center" :colspan="1">
                      <v-sheet
                        label
                        color="grey"
                        text-color="white"
                        :width="70"
                        class="font-weight-black subheading"
                      >{{points(key, "snatch") | round}}</v-sheet>
                    </td>
                    <td :colspan="3">
                      <strong></strong>
                    </td>
                    <td class="text-xs-center" :colspan="1">
                      <v-sheet
                        label
                        color="grey"
                        text-color="white"
                        :width="70"
                        class="font-weight-black subheading"
                      >{{points(key, "cj") | round}}</v-sheet>
                    </td>
                    <td :colspan="1">
                      <strong></strong>
                    </td>
                    <td class="text-xs-center" :colspan="1">
                      <v-sheet
                        label
                        color="grey"
                        text-color="white"
                        :width="70"
                        class="font-weight-black subheading"
                      >{{points(key, "total") | round}}</v-sheet>
                    </td>
                  </tr>
                </template>
                <template v-else-if="type=== 'single'" v-slot:footer>
                  <tr>
                    <td :colspan="14" rowspan="1">
                      <span class="headline">{{ key }}</span>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
  </div>
</template>

<script lang="ts">
import  Vue from "vue";
import {Component, Prop} from 'vue-property-decorator';
import {Team} from  '@/interfaces/Team'
import {Header} from  '@/interfaces/Header'

export interface Lifter {
    name:string;
}
  

export interface Pagination{
    rowsPerPage: number;
    sortBy: string;
}

@Component({
  filters: { round(value:number) { 
    if (value == null)
      return 0;
    return value.toFixed(2); } },
})

export default class ScoreboardTable extends Vue {
  @Prop() competitionid: number;
  @Prop() type: string;

  teams: Team[];
  lifters: Lifter[];
  headers: Header [];
  pagination: Pagination;
  constructor(){
    super();
    this.teams = [];
    this.lifters = [];
    this.headers = [];
    this.headers.push({ text: "Name", align: "left", value: "name", span: 1, width: 250 , sortable: false});
    this.headers.push({ text: "Team", value: "team.short", span: 1, width: 30 , sortable: false});
    this.headers.push({ text: "Klasse", value: "weightclass.name", span: 1, width: 50, sortable: true });
    this.headers.push({ text: "SF", value: "sf", span: 1, width: 50 , sortable: false});
    this.headers.push({ text: "Reißen", value: "lifts.weight", span: 4, width: 80, sortable: false });
    this.headers.push({ text: "Stoßen", value: "lifts.weight", span: 4, width: 80 , sortable: false});
    this.headers.push({ text: "Zweikampf", value: "lifts.weight", span: 4, width: 30, sortable: false });
    this.pagination = {rowsPerPage: -1, sortBy: "weightclass.id",};
  }

  get groups() {
      if (this.lifters == null){
        return null;
      }
        
      if (this.type === "single") {
        return {"Wettkampf": this.lodash.sortBy(this.lifters, "weightclass.id")};
      } else {
        return this.lodash.groupBy(this.lifters, "team.short");
      }
  }

  mounted() {
    this.loadData();
  }

  loadData() {
      var api = this.source + "api/competitions/" + this.competitionid + "/lifters/";
      this.axios
        .get(api)
        .then(response => {
          this.lifters = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      var api = this.source + "api/competitions/" + this.competitionid + "/teams/";
      this.axios
        .get(api)
        .then(response => {
          this.teams = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      setTimeout(this.loadData, 5000);
  }
  
  long_name(column) {
      if (this.teams == null){
        return null;
      }
      var team = this.lodash.find(this.teams, function(o) {
        return o.short === column;
      });
      return team.name;
  }
  
  points (column, type: string): number {
     if (this.teams == null){
        return 0;
      }
      var team = this.lodash.find(this.teams, function(o) {
        return o.short === column;
      });
      if (type === "cj") {
        return team.cj;
      }
      else if (type === "snatch") {
        return team.snatch;
      }
      else if (type === "total") {
        return team.total;
      }
      else if (type === "cj_additional_points") {
        return team.cj_additional_points;
      }
      else if (type === "snatch_additional_points") {
        return team.snatch_additional_points;
      }
      return 0;
  }
  
};
</script>