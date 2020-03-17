import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        competitionId: 6,
        currentAthlete: {
            name: "default",
            sex: false,
            sf: 1.0,
            team: { id: -1, name: "default", short: "def" },
            weightclass:  {
                id: -1,
                sex: false,
                min_weight: 1,
                max_weight: 9999,
                name: "none"
              },
            lifts: [
                { id: 1, attempt: 1, number: 1, weight: 1, result: 1 },
                { id: 1, attempt: 1, number: 1, weight: 1, result: 1 },
                { id: 1, attempt: 1, number: 1, weight: 1, result: 1 },
                { id: 1, attempt: 1, number: 1, weight: 1, result: 1 },
                { id: 1, attempt: 1, number: 1, weight: 1, result: 1 },
                { id: 1, attempt: 1, number: 1, weight: 1, result: 1 }
            ],
            masterdata: {
                club_single: "default single",
                club_single_short: "def",
                club_team: "default team",
                club_team_short: "def",
                id: "XYZ1",
                name: "Max Muster",
                sex: false,
                year: 1900
              }
          },
        currentWeight:0,
        competition: {
            id: 6,
            name: "test",
            location: "auwiesen",
            start_time: "",
            type: "single"
          }, 
          lifters: {}
    },
    getters: {
      currentCompetition: state => {
        return state.competition;
      },
      currentWeight: state => {
        return  state.currentWeight;
      },
      currentAthlete: state => {
        return state.currentAthlete;
      }
    },
    mutations: {
      setCompetitionId (state, competitionId) {
        // mutate state
        state.competitionId = competitionId;
      },
      setLifter (state, lifter) {
          state.currentAthlete = lifter;
          try {
            state.currentWeight = Vue.lodash.find(state.currentAthlete.lifts, function(o) { return o.result == 0; }).weight;
          }
          catch(e){
              state.currentWeight = 0;
          }
          state.sex = lifter.sex;
          store.dispatch('getLifterAsync');
      },
      setCompetition(state, competition) {
          state.competition = competition;
          store.dispatch('getCompetitionAsync');
      }
    },
    actions: {
      getLifterAsync({ commit, state }){
        var api =  "https://weightliftingoverlay.herokuapp.com/api/competitions/" + state.competitionId + "/lifters/current/";
        setTimeout(() => {
            Vue.axios
            .get(api)
            .then(response => {
                commit ("setLifter",response.data);
            })
            .catch(function(error) {
                console.log(error);
                store.dispatch('getLifterAsync');
            });
          }, 1000)
        
        },
        getCompetitionAsync({ commit, state }){
            var api =  "https://weightliftingoverlay.herokuapp.com/api/competitions/" + state.competitionId + "/";
            setTimeout(() => {
                Vue.axios
                .get(api)
                .then(response => {
                    commit ("setCompetition",response.data.competition);
                })
                .catch(function(error) {
                    console.log(error);
                    store.dispatch('getCompetitionAsync');
                });
              }, 1000)
            
            }

    }
});

export default store
