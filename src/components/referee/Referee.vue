<template>
  <v-row no-gutters>
    <v-col mb2 cols="12" sm="12" md="12" lg="12">
      <template v-if="show">
        <v-btn v-if="referee1 == 1" class="mx-2" fab dark small color="green">
        </v-btn>
        <v-btn v-else class="mx-2" fab dark small color="red">
        </v-btn>
        <v-btn v-if="referee2 == 1" class="mx-2" fab dark small color="green">
        </v-btn>
        <v-btn v-else class="mx-2" fab dark small color="red">
        </v-btn>
        <v-btn v-if="referee3 == 1" class="mx-2" fab dark small color="green">
        </v-btn>
        <v-btn v-else class="mx-2" fab dark small color="red">
        </v-btn>
      </template>
      <template v-else>
        <v-btn class="mx-2" fab dark small color="white">
          1
        </v-btn>
        <v-btn class="mx-2" fab dark small color="white">
          2
        </v-btn>
        <v-btn class="mx-2" fab dark small color="white">
          3
        </v-btn>
      </template>
    </v-col>
  </v-row>
</template>


<script lang="ts">
import Vue from "vue";
import { mapGetters } from 'vuex'

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
      audio: HTMLAudioElement,
      show: false
    };
  },

  created() {
    this.unwatch1 = this.$store.watch(
      (state, getters) => getters.referee1,
      (newValue, oldValue) => {
      },
    );
  },
  beforeDestroy() {
    this.unwatch1();
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
        if (this.show) {
          this.show = false;
          this.stopTimer();
        }
        else {
          this.show = true;
          this.stopTimer();
          this.startTimer(10);
        }
      }
    },
  },
  watch: {
    allResults(ready) {
      if (ready) {
        this.startTimer(3);  
      }
      
    }
  },
  computed: {
    ...mapGetters([
      'referee1',
      'referee2',
      'referee3'
    ]),
    minutes() {
      const minutes = Math.floor(this.totalTime / 60);
      return minutes;
    },
    seconds() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.pad(seconds);
    },
    allResults(){
      return (this.$store.getters.referee1 == 1 || this.$store.getters.referee1 == -1) &&
             (this.$store.getters.referee2 == 1 || this.$store.getters.referee2 == -1) &&
             (this.$store.getters.referee3 == 1 || this.$store.getters.referee3 == -1) 
    }
  }
});
</script>