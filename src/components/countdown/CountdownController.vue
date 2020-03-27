<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="stopTimer()">Stop</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="startTimer()">Start</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="resetTimer()">Reset</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="setTimer(60)">1 min</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="setTimer(120)">2 min</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="individualTime"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="setCustomTimer()">Set individual Time</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["competitionid"],
  data() {
    return {
      isConnected: false,
      socketMessage: "", 
      individualTime: 600
    };
  },

  methods: {
    startTimer() {
      // Send the "pingServer" event to the server.
      this.$socket.client.emit("timer", { action: "start" });
    },
    stopTimer() {
      // Send the "pingServer" event to the server.
      this.$socket.client.emit("timer", { action: "stop" });
    },
    resetTimer() {
      // Send the "pingServer" event to the server.
      this.$socket.client.emit("timer", { action: "reset" });
    },
    setTimer(value) {
      // Send the "pingServer" event to the server.
      this.$socket.client.emit("timer", { action: "set", value: value });
    },
    setCustomTimer() {
      this.$socket.client.emit("timer", { action: "set", value: this.individualTime });
    }
  }
});
</script>