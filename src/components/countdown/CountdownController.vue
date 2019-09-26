<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <v-btn @click="stopTimer()">Stop</v-btn>
    <v-btn @click="startTimer()">Start</v-btn>
    <v-btn @click="resetTimer()">Reset</v-btn>
    <v-btn @click="setTimer(60)">1 min</v-btn>
    <v-btn @click="setTimer(120)">2 min</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["competitionid"],
  data() {
    return {
      isConnected: false,
      socketMessage: ""
    };
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      console.log(this.competitionid)
      var message = { id: this.competitionid };
      this.$socket.emit("join", message);
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
    }
  },

  methods: {
    startTimer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("timer", { action: "start" });
    },
    stopTimer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("timer", { action: "stop" });
    },
    resetTimer() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("timer", { action: "reset" });
    },
    setTimer(value) {
      // Send the "pingServer" event to the server.
      this.$socket.emit("timer", { action: "set", value: value });
    }
  }
});
</script>