<template>
  <v-row no-gutters>
    <v-col mb2 cols="12" sm="12" md="12" lg="12">
      <v-sheet
        label
        
        color="green"
        text-color="white"
        class="font-weight-black subheading text-center"
      >
        <v-icon left>timer</v-icon>
        <span>{{ minutes }} : {{ seconds }}</span>
      </v-sheet>
    </v-col>
  </v-row>
</template>


<script lang="ts">
import Vue from "vue";

// Based on https://scotch.io/bar-talk/build-a-pomodoro-timer-with-vuejs-solution-to-code-challenge-6
export default Vue.extend({
  props: ["competitionid"],
  data() {
    return {
      initialTime: 120,
      timer: null,
      warningTimer: null,
      totalTime: 120,
      interval: 1,
      audio: HTMLAudioElement
    };
  },

  created() {
    this.unwatch1 = this.$store.watch(
      (state, getters) => getters.timerRunning,
      (newValue, oldValue) => {
        // Do whatever makes sense now
        if (newValue === true) {
          this.startTimer();
        }
        else {
          this.stopTimer();
        }
      },
    );
    this.unwatch2 = this.$store.watch(
    (state, getters) => getters.timerTime,
      (newValue, oldValue) => {
        this.setTimer(newValue)
      },
    );
    this.unwatch3 = this.$store.watch(
    (state, getters) => getters.timerReset,
      (newValue, oldValue) => {
        this.resetTimer();
      },
    );
  },
  beforeDestroy() {
    this.unwatch1();
    this.unwatch2();
    this.unwatch3();
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
      return n < 10 ? "0" + n : n;
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
</script>