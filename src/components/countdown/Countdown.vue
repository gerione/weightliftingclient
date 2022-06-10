<template>
  <v-row no-gutters>
    <v-col mb2 cols="12" sm="12" md="12" lg="12">
      <v-sheet
        label
        color="green"
        text-color="white"
        class="font-weight-black subheading text-center">
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
      totalTime: 120,
      thirty: false, 
      onethirty: false,
      interval: 1,
      audio: HTMLAudioElement,
      audioover: HTMLAudioElement
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
      console.log("startt");
      this.audio = new Audio();
      //https://freesound.org/people/puneet222/sounds/349174/
      this.audio.src = require("@/assets/beep-01a.wav");
      this.audio.load();
      this.audio.volume = 1;

      this.audioover = new Audio();
      this.audioover.src = require("@/assets/zapsplat_transport_airplane_call_button_beep_17748.mp3");
      this.audioover.load();
      this.audioover.volume = 1;
      
      this.onethirty = false;
      this.thirty = false;
      if (this.totalTime < 90) {
        this.onethirty = true;
      }
      if (this.totalTime < 30) {
        this.thirty = true;
      }
      
      
      this.timer = window.setInterval(
        () => this.countdown(),
        this.interval * 1000
      );
    },

    stopTimer() {
      console.log("sto");
      clearInterval(this.timer);
      this.timer = null;
    },

    resetTimer() {
      console.log("reset");
      clearInterval(this.timer);
      this.totalTime = this.initialTime;
      this.timer = null;
    },

    setTimer(time: number) {
      this.initialTime = time;
      this.resetTimer();
    },

    countdown() {
      if (this.totalTime >= 1) {
        this.totalTime = this.totalTime - this.interval;
        if (this.totalTime <= 90 && !this.onethirty){
          this.thirtySeconds();
          this.onethirty = true;
        }
        if (this.totalTime <= 30 && !this.thirty){
          this.thirtySeconds();
          this.thirty = true;
        }
      } else {
        this.audioOver();
        clearInterval(this.timer);
        this.thirty = false;
        this.onethirty = false;
        this.totalTime = 0;
      }
    },

    async thirtySeconds() {
      this.audio.play();
    },

    async audioOver() {
      this.audioover.play();
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