<template>
  <v-container>
    <template v-for="(liftersa, key) in groups(currentLifters)">
      <v-row>
        <v-col>
          <v-data-table
            :headers="computedHeaders"
            :items="liftersa"
            item-key="name"
            hide-default-footer
            must-sort
            disable-pagination
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
                      :width="45"
                      :color='lift.result == 2 ? "green" : lift.result == 1 ? "red" : "black"'
                      class="font-weight-bold subheading text-center"
                    ><span class="white--text">{{lift.weight}}</span></v-sheet>
                  </v-col>
                </template>
               </v-row>
            </template>
            <template v-slot:item.cj="{ item  }">
              <v-row no-gutters>
                <template v-for="lift in item.lifts.slice(3,6)">
                  <v-col cols="4" sm="4" md="4" lg="4">
                    <v-sheet
                      :width="45"
                      :color='lift.result == 2 ? "green" : lift.result == 1 ? "red" : "black"'
                      class="font-weight-black subheading text-center"
                    ><span class="white--text">{{lift.weight}}</span></v-sheet>
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
                      class="font-weight-black subheading text-center"
                    >{{(item.max_cj + item.max_snatch)}}</v-sheet>
                  </v-col>
                  <v-col cols="6" sm="6" md="6" lg="6">
                    <v-sheet
                      label
                      color="grey"
                      class="font-weight-black subheading text-center"
                    >{{(item.cj_points + item.snatch_points) | round}}</v-sheet>
                  </v-col>
              </v-row>
            </template>
            <template v-if="type === 'team' && $vuetify.breakpoint.smAndUp" v-slot:body.append>
              <tr>
                <td colspan="2" rowspan="2">
                  <span class="headline">{{ long_name(key) }}</span>
                </td>
                <td >
                  <strong>Jugendpunkte</strong>
                </td>
                <td class="text-xs-center" :colspan="1">
                  <v-sheet
                    label
                    color="grey"
                    class="font-weight-black subheading text-center"
                  >{{points(key, "snatch_additional_points") | round}}</v-sheet>
                </td>
                
                <td class="text-xs-center">
                  <v-sheet
                    label
                    color="grey"
                    class="font-weight-black subheading text-center"
                  >{{points(key, "cj_additional_points") | round}}</v-sheet>
                </td>
                <td class="text-xs-center" >
                  <v-sheet
                    label
                    color="grey"
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
                    class="font-weight-black subheading text-center"
                  >{{points(key, "snatch") + points(key, "snatch_additional_points") | round}}</v-sheet>
                </td>
               
                <td class="text-xs-center" >
                  <v-sheet
                    label
                    color="grey"
                    
                    class="font-weight-black subheading text-center"
                  >{{points(key, "cj") + points(key, "cj_additional_points") | round}}</v-sheet>
                </td>
                
                <td class="text-xs-center" >
                  <v-sheet
                    label
                    color="grey"
                   
                    class="font-weight-black subheading text-center"
                  >{{points(key, "total") + points(key, "cj_additional_points")  + points(key, "snatch_additional_points") | round}}</v-sheet>
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

  headers: Header[];
  constructor() {
    super();
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
    
   if (this.type === 'single') {
    this.headers.push({
      text: "Klasse",
      value: "weightclass.name",
      span: 1,
      width: 50,
      sortable: true
    });
   }
       
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

  groups(lifters1) {
    
    if (lifters1 == null || lifters1.length == 0 || lifters1.length === undefined) {
      return null;
    }
    const lifters = []; 
    lifters1.forEach(val => lifters.push(Object.assign({}, val)));

    if (this.type === "single") {
      return { Wettkampf: this.lodash.sortBy(lifters, "weightclass.id") };
    } else {
      return this.lodash.groupBy(lifters, "team.short");
    }
  }

  get computedHeaders () {
    console.log(this.type);
    return this.headers;
  }
  
  long_name(column) {
    if (this.teams == null) {
      return null;
    }
    var team = this.lodash.find(this.teams, function(o) {
      return o.short === column;
    });
    if (team == null) {
      return null;
    }
    return team.name;
  }

  points(column, type: string): number {
    if (this.teams == null) {
      return 0;
    }
    var team = this.lodash.find(this.teams, function(o) {
      return o.short === column;
    });
    if (team == null){
      return 0;
    }
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

  get teams() {
    try {
        return this.$store.getters.teams;
      }
      catch(e) {
        console.log(e);
      }
      return null;
  }

  get currentLifters() {
    try {
        return this.$store.getters.lifters;
      }
      catch(e) {
        console.log(e);
      }
      return null;
  }
}
</script>

<style scoped>
  .theme--light.v-data-table {
    background-color: rgba(255,255,255,0.7);
    font-weight: bold;
  }
   >>>.theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr>th {
    font-size: 20px;
  }
  >>>.theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr>td, .v-data-table>.v-data-table__wrapper>table>tfoot>tr>td, .v-data-table>.v-data-table__wrapper>table>thead>tr>td {
    font-size: 20px;
    
  }
  .theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:not(:last-child)>td:last-child, .theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:not(:last-child)>td:not(.v-data-table__mobile-row), .theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:not(:last-child)>th:last-child, .theme--light.v-data-table>.v-data-table__wrapper>table>tbody>tr:not(:last-child)>th:not(.v-data-table__mobile-row), .theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr:last-child>th{
    border-bottom: none;
  }
</style>