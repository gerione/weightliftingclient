<template>
 <v-container grid-list-xs>
     
    <v-data-table
      :headers="headers"
      :items="competitions"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">      
        <td>{{ props.item.start_time }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.location }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import  Vue from "vue";
import {Component, Prop} from 'vue-property-decorator';
import {Header} from  '@/interfaces/Header'
import {Competition} from  '@/interfaces/Competition'

export default class Root extends Vue {

  headers: Header [];
  competitions: Competition[];
  constructor(){
    super();
    this.headers = [];
    this.headers.push( { text: "Start time", value: "start_time", sortable:true });
    this.headers.push( { text: "Name", align: "left", value: "name", sortable:true  });
    this.headers.push( { text: "Location", value: "location", sortable:true  });
    this.competitions = [];
  }
  
  mounted() {
    this.loadData();
  }

  loadData () {
      var api = this.source + "api/competitions/";
      this.axios.get(api).then(response => {
        this.competitions= response.data;
        
      });
      setTimeout(this.loadData, 15000);
    }
};
</script>