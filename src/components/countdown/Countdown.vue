<template>
  <v-container grid-list-xs>
    <v-layout>
      <h1>
         <v-icon large color="blue darken-2">timer</v-icon>
        
        <!-- 101 seconds -->
        <span>{{ minutes }} : {{ seconds }}</span>
      </h1>
    </v-layout>
  </v-container> 
</template>
 

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ERANGE } from "constants";

// Based on https://scotch.io/bar-talk/build-a-pomodoro-timer-with-vuejs-solution-to-code-challenge-6
 
export default Vue.extend({
  props: ['competitionid'],
  data() {
    return {
      enthusiasm: this.initialEnthusiasm,
      initialTime: 120,
      timer: null,
      warningTimer: null,
      totalTime: 120,
      interval: 1,
      audio: HTMLAudioElement
    };
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
       var message =  {id:this.competitionid};
        this.$socket.emit('join',message);   
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      switch (data.action) {
          case "start":{
            this.startTimer();
            break;
          }
          case "stop":{
            this.stopTimer();
            break;
          }
          case "reset":{
            this.resetTimer();
            break;
          }
          case "set":{
            this.setTimer(data.value);
            break;
          }
      }
    }
  },
  methods: {
    startTimer() {
      this.audio = new Audio();
      this.audio.src = require("@/assets/beep-01a.wav");
      this.audio.load();
      this.audio.volume = 1;
      this.timer = window.setInterval(
        () => this.countdown(),
        this.interval * 1000
      );

      let timeRun = this.initialTime - this.totalTime;
      if (timeRun < 31) {
        this.warningTimer = window.setTimeout(
          () => this.thirtySeconds(),
          (30 - timeRun) * 1000
        );
      }
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      clearTimeout(this.warningTimer);
      this.warningTimer = null;
    },
    resetTimer() {
      this.totalTime = this.initialTime;
      clearInterval(this.timer);
      this.timer = null;
      clearTimeout(this.warningTimer);
      this.warningTimer = null;
    },
    setTimer(time: number) {
      this.initialTime = time;
      this.resetTimer();
    },
    countdown() {
      if (this.totalTime >= 1) {
        this.totalTime = this.totalTime - this.interval;
      } else {
        this.totalTime = 0;
      }
    },
    thirtySeconds() {
      this.audio.play();
    },
    pad(n) {
        return (n < 10) ? ("0" + n) : n;
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
    }
  }
});

/*
@Component()
export default class Countdown extends Vue {
  initialTime: number = 120;
  timer: number;
  warningTimer: number;
  totalTime: number = 120;
  interval: number = 1;
  audio: HTMLAudioElement;

  constructor() {
    super();
    this.audio = new Audio();
    this.audio.src = require("@/assets/beep-01a.wav");
    this.audio.load();
    this.audio.volume = 1;
  }

  startTimer() {
    this.timer = window.setInterval(
      () => this.countdown(),
      this.interval * 1000
    );

    let timeRun = this.initialTime - this.totalTime;
    if (timeRun < 31) {
      this.warningTimer = window.setTimeout(
        () => this.thirtySeconds(),
        (30 - timeRun) * 1000
      );
    }
  }
  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
    clearTimeout(this.warningTimer);
    this.warningTimer = null;
  }
  resetTimer() {
    this.totalTime = this.initialTime;
    clearInterval(this.timer);
    this.timer = null;
    clearTimeout(this.warningTimer);
    this.warningTimer = null;
  }
  setTimer(time: number) {
    this.initialTime = time;
    this.resetTimer();
  }
  countdown() {
    if (this.totalTime >= 1) {
      this.totalTime = this.totalTime - this.interval;
    } else {
      this.totalTime = 0;
    }
  }
  thirtySeconds() {
    this.audio.play();
  }
  get minutes() {
    const minutes = Math.floor(this.totalTime / 60);
    return minutes;
  }
  get seconds() {
    const seconds = this.totalTime - this.minutes * 60;
    return seconds;
  }
}

*/
</script>