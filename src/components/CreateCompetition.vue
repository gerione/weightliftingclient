<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step :complete="e6 > 1" step="1" editable>
      Competition details
      <small>Specify name and location</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-text-field v-model="competition.name" :rules="[v => !!v || 'Item is required']" label="Name of competition" required></v-text-field>
      <v-text-field v-model="competition.venue" :rules="[v => !!v || 'Item is required']" label="Location" required></v-text-field>
      <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2" editable>Date</v-stepper-step>

    <v-stepper-content step="2">
        <v-date-picker v-model="competition.date" :landscape=true :rules="[v => !!v || 'Item is required']" required></v-date-picker>
      <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3" editable >Beginnzeit</v-stepper-step>

    <v-stepper-content step="3" >
      <v-time-picker v-model="competition.time" :landscape=true format="24hr" :rules="[v => !!v || 'Item is required']"></v-time-picker>
      <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>

    <v-stepper-step  :complete="e6 > 4" step="4" editable>Youtube ID</v-stepper-step>
    <v-stepper-content step="4">
      <v-text-field v-model="competition.youtube_url" label="Youtube ID"></v-text-field>
      <v-btn color="primary" @click="e6 = 5">Continue</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step  step="5" editable>Type</v-stepper-step>
    <v-stepper-content step="5">
      <v-text-field v-model="competition.competition_type" label="Type"></v-text-field>
      <v-btn color="primary" @click="submit">Create</v-btn>
      <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  data() {
    return {
      e6: 1,
      competition: {
        name: null,
        venue: null,
        date: new Date().toISOString().substr(0, 10),
        time: null,
        youtube_url: null,
        competition_type: null
      }
    };
  },
  methods: {
    submit() {
      var api = this.source + "api/competitions/";
      var json = {
        name: this.competition.name,
        location: this.competition.venue,
        start_time: this.competition.date + "T" + this.competition.time,
        youtube_url: this.competition.youtube_url,
        type: this.competition.competition_type
      };
       console.log(json);
      this.axios
        .post(api, json)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>