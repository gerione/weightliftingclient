
declare module 'vue';
declare module 'vuetify';
declare module 'vue-youtube';
declare module 'axios';
declare module 'vue-axios';
declare module 'vue-lodash';
declare module 'vue-router';
declare module 'vue-property-decorator';
declare module 'vue-awesome-countdown';
declare module 'socket.io';
declare module 'vue-socket.io';
declare module 'vue-socket.io-extended';
declare module 'socket.io-client';
declare module 'vue-google-charts'
declare module 'vue-chartkick';
declare module 'chart.js';
declare module 'vuex';


interface Weightclass {
    id: number;
    max_weight: number;
    min_weight: number;
    name: string;
    sex: boolean;
  }
  interface Team {
    id: number;
    name: string;
    short: string;
  }
  
  interface Lift {
    attempt: number;
    id: number;
    result: number;
    weight: number;
  }
  
  interface Masterdata {
    club_single: string;
    club_single_short: string;
    club_team: string;
    club_team_short: string;
    id: string;
    name: string;
    sex: boolean;
    year: number;
  }
  
  interface Lifter {
    name: string;
    sex: boolean;
    sf: number;
    lifts: Lift[];
    team: Team;
    weightclass: Weightclass;
    masterdata: Masterdata;
  }
  