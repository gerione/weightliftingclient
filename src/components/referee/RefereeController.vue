<template>
  <v-container>
     <v-row>
      <v-col>
        <p>Referee number: "{{referee}}"</p>
      </v-col> 
    </v-row>
    <v-row>
      <v-col>
        <v-btn :disabled="locked" color="green" @click="goodLift()">Good Lift</v-btn>
        
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn :disabled="locked" color="red"  @click="badLift()">Bad Lift</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["competitionid", "referee"],
  data() {
    return {
      initialTime: 3,
      timer: null,
      totalTime: 5,
      locked:false,
      interval: 1,
      initialTrigger: false,
      audio: HTMLAudioElement
    };
  },

  created(){
    this.audio = new Audio();
    this.audio.src = require("@/assets/beep-01a.wav");
    this.audio.load();
    this.audio.volume = 1;
  },

  methods: {
    startTimer(value : number) {
      this.totalTime = value;
      this.timer = window.setInterval(
        () => this.countdown(),
        this.interval * 1000
      );
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    countdown() {
      if (this.totalTime >= 1) {
        this.totalTime = this.totalTime - this.interval;
      } else {
        this.totalTime = 0;
        if (this.locked) {
          this.locked = false;
          this.initialTrigger = false;
          this.$socket.client.emit("referee", { result: 0 ,referee:this.referee });
          this.stopTimer();
        }
        else {
          this.locked = true;
          this.stopTimer();
          this.startTimer(10);
        }
      }
    },
    goodLift() {
      // Send the "pingServer" event to the server.
      this.$socket.client.emit("referee", { result: 1 , referee:this.referee});
      this.initialTrigger = true;
    },
    badLift() {
      // Send the "pingServer" event to the server.
      this.$socket.client.emit("referee", { result: -1 ,referee:this.referee });
      this.initialTrigger = true;
    },
  },
  watch: {
    inputRequired(required){
      if (required && !this.initialTrigger) {
         this.audio.play();
      }
    },
    allResults(ready) {
      if (ready) {
        this.startTimer(3);
      }
      
    }
  },
  computed: {
    minutes() {
      const minutes = Math.floor(this.totalTime / 60);
      return minutes;
    },
    seconds() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.pad(seconds);
    }, 
    inputRequired() {
      if (this.referee == 1) {
        if ((this.$store.getters.referee2 == 1 || this.$store.getters.referee2 == -1) &&
             (this.$store.getters.referee3 == 1 || this.$store.getters.referee3 == -1) ) {
          return true;
        }
      } 
      else if (this.referee == 2) {
        if ((this.$store.getters.referee1 == 1 || this.$store.getters.referee1 == -1) &&
             (this.$store.getters.referee3 == 1 || this.$store.getters.referee3 == -1) ) {
          return true;
        }
      } 
      else if (this.referee == 3) {
         if ((this.$store.getters.referee1 == 1 || this.$store.getters.referee1 == -1) &&
             (this.$store.getters.referee2 == 1 || this.$store.getters.referee2 == -1)) {
          return true;
        }
      }
      return false;
    },
    allResults(){
      return (this.$store.getters.referee1 == 1 || this.$store.getters.referee1 == -1) &&
             (this.$store.getters.referee2 == 1 || this.$store.getters.referee2 == -1) &&
             (this.$store.getters.referee3 == 1 || this.$store.getters.referee3 == -1) 
    }
  }
});
</script>