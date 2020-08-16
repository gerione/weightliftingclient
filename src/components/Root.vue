<template >
  <v-container>
    <v-row>
      <v-col>
        <v-tabs fixed-tabs>
          <v-tab>Aktuelle Veranstaltungen</v-tab>
          <v-tab-item>
            <v-data-table
              :headers="headers"
              :items="competitions"
              class="elevation-1"
              v-if="$vuetify.breakpoint.smAndUp"
              sortBy="start_time"
              sortDesc="true"
            >
              <template v-slot:item.id="{ item }">
                <v-btn color="green" :to="'competition/' + item.id">
                  Zum Wettkampf
                  <v-icon>mdi-dumbbell</v-icon>
                </v-btn>
              </template>
               <template v-slot:item.id2="{ item }">
                <v-btn color="green" :to="'overlays/' + item.id">
                  Overlays
                  <v-icon>mdi-monitor-screenshot</v-icon>
                </v-btn>
              </template>
            </v-data-table>
            <v-data-iterator :items="competitions" v-else>
              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="item in props.items"
                    :key="item.name"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                  >
                    <v-card>
                      <v-card-title>
                        <h4>{{ item.name }}</h4>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-content>Start:</v-list-item-content>
                          <v-list-item-content class="align-end">{{ item.start_time }}</v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>Ort:</v-list-item-content>
                          <v-list-item-content class="align-end">{{ item.location }}</v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-btn color="green" :to="'competition/' + item.id">
                            Zum Wettkampf
                            <v-icon>mdi-dumbbell</v-icon>
                          </v-btn>
                        </v-list-item>
                        <v-list-item>
                          <v-btn color="green" :to="'overlays/' + item.id">
                            Overlays
                            <v-icon>mdi-dumbbell</v-icon>
                          </v-btn>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Header } from "@/interfaces/Header";
import { Competition } from "@/interfaces/Competition";

@Component()
export default class Root extends Vue {
  headers: Header[];
  competitions: Competition[];

  constructor() {
    super();
    this.headers = [];
    this.headers.push({
      text: "Start time",
      value: "start_time",
      sortable: true,
    });
    this.headers.push({
      text: "Name",
      align: "left",
      value: "name",
      sortable: true,
    });
    this.headers.push({ text: "Location", value: "location", sortable: true });
    this.headers.push({ text: "Zum Bewerb", value: "id", sortable: true });
    this.headers.push({ text: "Overlays", value: "id2", sortable: true });
    this.competitions = [
      {
        name: "NL: SKV II - VSD1",
        id: 1,
        location: "Test",
        youtube_id: "@test",
        start_time: "2019-06-14 00:00:00	",
        type: "single",
        external_timer: true,
      },
    ];
  }

  mounted() {
    this.loadData();
  }

  loadData() {
    var api = this.source + "api/competitions/";
    this.axios.get(api).then((response) => {
      this.competitions = response.data;
    });
    setTimeout(this.loadData, 15000);
  }
}
</script>