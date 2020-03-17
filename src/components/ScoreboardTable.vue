<template>
  <v-container>
    <template v-for="(liftersa, key) in groups">
      <v-row class="grey darken-3">
        <v-col>
          <v-data-table
            :headers="computedHeaders"
            :items="liftersa"
            item-key="name"
            hide-default-footer
            dark
            must-sort
          >
            <template v-slot:no-data>
              <v-alert :value="true" color="success" type="success">Wettkampf wird geladen!</v-alert>
            </template>

            <template v-slot:item.snatch="{ item  }">
               <v-row no-gutters>
                <template v-for="lift in item.lifts.slice(0,3)">
                  <v-col cols="4" sm="4" md="4" lg="4">
                    <v-sheet
                      label
                      v-if="lift.result === 2"
                      :width="40"
                      color="green"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                    <v-sheet
                      label
                      v-else-if="lift.result === 1"
                      :width="40"
                      color="red"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                    <v-sheet
                      label
                      v-else-if="lift.result === 0"
                      :width="40"
                      color="black"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                  </v-col>
                </template>
               </v-row>
            </template>
            <template v-slot:item.cj="{ item  }">
              <v-row no-gutters>
                <template v-for="lift in item.lifts.slice(3,6)">
                  <v-col cols="4" sm="4" md="4" lg="4">
                    <v-sheet
                      v-if="lift.result === 2"
                      :width="40"
                      color="green"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                    <v-sheet
                      v-else-if="lift.result === 1"
                      :width="40"
                      color="red"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                    <v-sheet
                      label
                      v-else-if="lift.result === 0"
                      :width="40"
                      color="black"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{lift.weight}}</v-sheet>
                  </v-col>
                </template>
              </v-row>
            </template>
            <template v-slot:item.total="{ item  }">
              <v-row no-gutters>
                 <v-col cols="6" sm="6" md="6" lg="6">
                    <v-sheet
                      label
                      :width="50"
                      color="grey"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{(item.max_cj + item.max_snatch)}}</v-sheet>
                  </v-col>
                  <v-col cols="6" sm="6" md="6" lg="6">
                    <v-sheet
                      label
                      :width="50"
                      color="grey"
                      text-color="white"
                      class="font-weight-black subheading text-center"
                    >{{(item.cj_points + item.snatch_points) | round}}</v-sheet>
                  </v-col>
              </v-row>
            </template>
            <template v-if="type === 'team' && $vuetify.breakpoint.smAndUp" v-slot:body.append>
              <tr>
                <td colspan="3" rowspan="2">
                  <span class="headline">{{ long_name(key) }}</span>
                </td>
                <td >
                  <strong>Jugendpunkte</strong>
                </td>
                <td class="text-xs-center" :colspan="1">
                  <v-sheet
                    label
                    color="grey"
                    text-color="white"
                    :width="70"
                    class="font-weight-black subheading text-center"
                  >{{points(key, "snatch_additional_points") | round}}</v-sheet>
                </td>
                
                <td class="text-xs-center">
                  <v-sheet
                    label
                    color="grey"
                    text-color="white"
                    :width="70"
                    class="font-weight-black subheading text-center"
                  >{{points(key, "cj_additional_points") | round}}</v-sheet>
                </td>
                
                <td class="text-xs-center" >
                  <v-sheet
                    label
                    color="grey"
                    text-color="white"
                    :width="70"
                    class="font-weight-black subheading text-center"
                  >{{(points(key, "snatch_additional_points") + points(key, "cj_additional_points") ) | round}}</v-sheet>
                </td>
              </tr>
              <tr>
                <td >
                  <strong>Summe</strong>
                </td>
                <td class="text-xs-center" >
                  <v-sheet
                    label
                    color="grey"
                    text-color="white"
                    :width="70"
                    class="font-weight-black subheading text-center"
                  >{{points(key, "snatch") | round}}</v-sheet>
                </td>
               
                <td class="text-xs-center" >
                  <v-sheet
                    label
                    color="grey"
                    text-color="white"
                    :width="70"
                    class="font-weight-black subheading text-center"
                  >{{points(key, "cj") | round}}</v-sheet>
                </td>
                
                <td class="text-xs-center" >
                  <v-sheet
                    label
                    color="grey"
                    text-color="white"
                    :width="70"
                    class="font-weight-black subheading text-center"
                  >{{points(key, "total") | round}}</v-sheet>
                </td>
              </tr>
            </template>
            <template v-else-if="type=== 'single' && $vuetify.breakpoint.smAndUp" v-slot:body.append>
              <tr>
                <td :colspan="14" rowspan="1">
                  <span class="headline">{{ key }}</span>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
      </v-row>
    </template>
  </v-container>
</template>

  <style scoped>
>>>.v-data-table th {
  font-size: 20px;
}

>>>.v-data-table td {
  font-size: 20px;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Team } from "@/interfaces/Team";
import { Header } from "@/interfaces/Header";

export interface Lifter {
  name: string;
}

export interface Pagination {
  rowsPerPage: number;
  sortBy: string;
}

@Component({
  filters: {
    round(value: number) {
      if (value == null) return 0;
      return value.toFixed(2);
    }
  }
})
export default class ScoreboardTable extends Vue {
  @Prop() competitionid: number;
  @Prop() type: string;

  teams: Team[];
  lifters: Lifter[];
  headers: Header[];
  pagination: Pagination;
  constructor() {
    super();
    this.teams = [];
    this.lifters = [];
    this.headers = [];
    this.headers.push({
      text: "Name",
      align: "left",
      value: "name",
      span: 1,
      width: 200,
      sortable: false
    });

    if (this.type === 'single') {
      this.headers.push({
        text: "Team",
        value: "masterdata.club_single_short",
        span: 1,
        width: 30,
        sortable: false
      });
    }
    else {
      this.headers.push({
        text: "Team",
        value: "team.short",
        span: 1,
        width: 30,
        sortable: false
      });
    }
    
   
this.headers.push({
      text: "Klasse",
      value: "weightclass.name",
      span: 1,
      width: 50,
      sortable: true
    });
       
    this.headers.push({
      text: "SF",
      value: "sf",
      span: 1,
      width: 50,
      sortable: false
    });
    this.headers.push({
      text: "Reißen",
      value: "snatch",
      span: 4,
      width: 80,
      sortable: false
    });
    this.headers.push({
      text: "Stoßen",
      value: "cj",
      span: 4,
      width: 80,
      sortable: false
    });
    this.headers.push({
      text: "Zweikampf",
      value: "total",
      span: 4,
      width: 30,
      sortable: false
    });
    this.pagination = { rowsPerPage: -1, sortBy: "weightclass.id" };
  }

  get groups() {
    if (this.lifters == null) {
      return null;
    }

    if (this.type === "single") {
      return { Wettkampf: this.lodash.sortBy(this.lifters, "weightclass.id") };
    } else {
      return this.lodash.groupBy(this.lifters, "team.short");
    }
  }

  get computedHeaders () {
    console.log(this.type);
    return this.headers;
  }
  mounted() {
    this.loadData();
  }

  loadData() {
    var api =
      this.source + "api/competitions/" + this.competitionid + "/lifters/";
    this.axios
      .get(api)
      .then(response => {
        this.lifters = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    var api =
      this.source + "api/competitions/" + this.competitionid + "/teams/";
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
    if (this.teams == null) {
      return null;
    }
    var team = this.lodash.find(this.teams, function(o) {
      return o.short === column;
    });
    return team.name;
  }

  points(column, type: string): number {
    if (this.teams == null) {
      return 0;
    }
    var team = this.lodash.find(this.teams, function(o) {
      return o.short === column;
    });
    if (type === "cj") {
      return team.cj;
    } else if (type === "snatch") {
      return team.snatch;
    } else if (type === "total") {
      return team.total;
    } else if (type === "cj_additional_points") {
      return team.cj_additional_points;
    } else if (type === "snatch_additional_points") {
      return team.snatch_additional_points;
    }
    return 0;
  }
}
</script>

