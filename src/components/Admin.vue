<template>
<v-data-table
    :headers="headers"
    :items="competitions"
    sort-by="Name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                     <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.location" label="Ort"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.start_time" label="Datum"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.youtube_id" label="Youtube ID"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.type" label="type"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>





  
</template>

<script lang="ts">
import  Vue from "vue";
import {Component, Prop, Watch} from 'vue-property-decorator';
import {Header} from  '@/interfaces/Header'
import {Competition} from  '@/interfaces/Competition'
import {source} from  '@/mixin.ts'


@Component()
export default class Admin extends Vue  {
  editedItem: Competition;
  defaultItem: Competition;
  editedIndex: number = -1;
  dialog: boolean = false;
  competitions: Competition[];
  headers: Header [];

  constructor(){
    super();
    this.editedItem = {id: -1, name: "", location: "", start_time: "", youtube_id: "", type: "" };
    this.defaultItem = {id: -1, name: "", location: "", start_time: "", youtube_id: "", type: "" };
    this.competitions = [];
    this.headers = [];
    this.headers.push({text: "Name",align: "left",sortable: true,value: "name"});
    this.headers.push({ text: "Ort", align: "center",sortable: true, value: "location" });
    this.headers.push({ text: "Start time",sortable: true, value: "start_time" });
    this.headers.push({ text: "Youtube ID",sortable: true, value: "youtube_id" });
    this.headers.push({ text: "Typ",sortable: true, value: "type" });
    this.headers.push({ text: "Actions", value: "action", sortable: false });
  }

  get formTitle() {
    return this.editedIndex === -1 ? "New Item" : "Edit Item";
  }

  @Watch('dialog')
  onPropertyChanged(value: string, oldValue: string) {
    return value || this.close();
  }

   created() {
    this.loadData();
  }
  
  loadData() {
      var api = source.source() + "api/competitions/";
      this.axios
        .get(api)
        .then(response => {
          console.log(response);
          this.competitions = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  initialize() {
      this.loadData();
    }
        editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    }
    deleteItem(item) {
      var api = source.source() + "api/competitions/" + item.id + "/";
      var confirmed_result = confirm(
        "Are you sure you want to delete ".concat(item.name, "?")
      );
      if (confirmed_result) {
        this.axios
          .delete(api)
          .then(response => {
            this.loadData();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      }, 300);
    }
    save() {
      var json = {
        name: this.editedItem.name,
        location: this.editedItem.location,
        start_time: this.editedItem.start_time,
        youtube_id: this.editedItem.youtube_id,
        type: this.editedItem.type
      };
      
      var api = source.source() + "api/competitions/";
      if (this.editedItem.id != -1){
          console.log("PUT")
          api = source.source() + "api/competitions/" +this.editedItem.id + "/";
          this.axios
        .put(api, json)
         .then(response => {
            this.loadData();
          })
        .catch(function(error) {
          console.log(error);
        });
      }
      else {
          console.log("POST")
          this.axios
        .post(api, json)
         .then(response => {
            this.loadData();
          })
        .catch(function(error) {
          console.log(error);
        });
      }
      this.close();
    }
};
</script>

