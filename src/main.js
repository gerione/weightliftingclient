// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'tabulator-tables/dist/css/tabulator.min.css'
import VueYouTube from 'vue-youtube'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

Vue.use(VueYouTube)

Vue.use(Vuetify)

Vue.config.productionTip = false


var Tabulator = require("tabulator-tables"); //import Tabulator library

Tabulator.prototype.extendModule("format", "formatters", {
  weightlifting: function (cell, formatterParams) {
    var value = cell.getValue();
    if (value.result == 2) {
      cell.getElement().style.backgroundColor = "green";

    }
    else if (value.result == 1) {
      cell.getElement().style.backgroundColor = "red";

    }
    else {
      cell.getElement().style.backgroundColor = "grey";

    }
    return "<span style='font-weight:bold;'>" + value.weight + "</span>";
  },
});

Tabulator.prototype.extendModule("mutator", "mutators", {
  points: function (value, data, type, mutatorParams) {
    return parseFloat(Math.round(value * 100) / 100).toFixed(2)
  },
});


Vue.component('scoreboardtable', {
  data: function () {
    return {
      tabulator: null, //variable to hold your table
      
      tableData: [], //data for table to display
      competitionid:1,
    }
  },
  watch: {
    source: function (val) {
      this.tabulator.setData(this.source + "api/competitions/" + this.competitionid + "/lifters/flat/");
    },
    competitionid: function(val) {
      this.tabulator.setData(this.source + "api/competitions/" + this.competitionid + "/lifters/flat/");
    }
  },
  
  mounted: function () {
    //instantiate Tabulator when element is mounted
    this.tabulator = new Tabulator(this.$refs.table, {
      data: this.tableData, //link data to table
      ajaxURL:  this.source + "api/competitions/" + this.competitionid + "/lifters/flat/", //ajax URL
      ajaxConfig:"POST", //ajax HTTP request type
      ajaxLoader: false,
      layout: "fitColumns",
      groupHeader: function (value, count, data, group) {
        return value + "<span style='color:#d00; margin-left:10px;'>(" + count + " Starter)</span>";
      },

      history: false,
      groupBy: "team.short",
      columns: [ //Define Table Columns
        { title: "Name", field: "name", align: "center", width: 340, headerSort: false },
        { title: "Team", field: "team.short", align: "center", headerSort: false },
        { title: "Weightclass", field: "weightclass.name", align: "center", headerSort: false },
        { title: "Hidden Column", field: "weightclass.id", visible: false, headerSort: false },
        { title: "SF", field: "sf", align: "center", headerSort: false },
        //{title:"Pkt.", field:"points.total", align:"center", headerSort:false, mutator:"points"},
        {//create column group
          title: "Reißen",
          columns: [
            { title: "1.", field: "A1", align: "center", formatter: "weightlifting", headerSort: false },
            { title: "2.", field: "A2", align: "center", formatter: "weightlifting", headerSort: false },
            { title: "3.", field: "A3", align: "center", formatter: "weightlifting", headerSort: false }
            //,{title:"Pkt.", field:"points.snatch", align:"center", headerSort:false, mutator:"points"}
          ]
        },
        {//create column group
          title: "Stoßen",
          columns: [
            { title: "1.", field: "A4", align: "center", formatter: "weightlifting", headerSort: false },
            { title: "2.", field: "A5", align: "center", formatter: "weightlifting", headerSort: false },
            { title: "3.", field: "A6", align: "center", formatter: "weightlifting", headerSort: false }

            //,{title:"Pkt.", field:"points.cj", align:"center", headerSort:false, mutator:"points"}
          ]
        }
        //,{title:"Platz", field:"place", align:"center",  headerSort:false},
      ], //define table columns
    });
    this.loadData();
  },
  methods: {
    loadData: function () {
      this.tabulator.setData();
      setTimeout(this.loadData, 5000);
    },
  },
  template: '<div ref="table"></div>' //create table holder element
});



Vue.mixin({
  data: function() {
    return {
      get source() {
        return "http://127.0.0.1:5000/";
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
