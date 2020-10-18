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
          lifters: {},
        timer: {
          running: false,
          reset: false,
          time: 120,
        },
        referee: {
          1:0,
          2:0,
          3:0,
        }, 
        teams: []
    },
    getters: {
      referee1 : state => {
        return state.referee["1"];
      }, 
      referee2 : state => {
        return state.referee["2"];
      }, 
      referee3 : state => {
        return state.referee["3"];
      }, 
      timerRunning : state => {
        return state.timer.running;
      }, 
      timerReset : state => {
        return state.timer.reset;
      }, 
      timerTime : state => {
        return state.timer.time;
      }, 
      currentCompetition: state => {
        return state.competition;
      },
      currentWeight: state => {
        return  state.currentWeight;
      },
      currentAthlete: state => {
        return state.currentAthlete;
      },
      lifters: state => {
        return state.lifters;
      }, 
      teams: state => {
        return state.teams;
      }
    },
    mutations: {
      setCompetitionId (state, competitionId) {
        // mutate state
        var message = { competitionid: state.competitionId};
        this._vm.$socket.client.emit('leave', message);
        state.competitionId = competitionId;
        message = { competitionid: state.competitionId};
        this._vm.$socket.client.emit('join', message);
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
      setLifters (state, lifters) {
        Vue.set(state, 'lifters', [...lifters]);
        store.dispatch('getLiftersAsync');
    },
      setCompetition(state, competition) {
          state.competition = competition;
          store.dispatch('getCompetitionAsync');
      },

      setTeams(state, teams) {
        state.teams = teams;
        store.dispatch('getTeamsAsync');
    },

      TIMER(state, data) {
        switch (data.action) {
          case "start":{
            state.timer.running = true;
            break;
          }
          case "stop":{
            state.timer.running = false;
            break;
          }
          case "reset":{
            state.timer.reset = !state.timer.reset;
            break;
          }
          case "set":{
            state.timer.time = data.value;
            break; 
          }
        } 
      },

      REFEREE(state, data) {
        //0 means that only one referee is present
        if (data.referee == 0) {
          state.referee[1] = data.result;
          state.referee[2] = data.result;
          state.referee[3] = data.result;
        }
        else {
          state.referee[data.referee] = data.result;
        }
        
      },
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
            
        },
        getLiftersAsync({ commit, state }){
          var api =  "https://weightliftingoverlay.herokuapp.com/api/competitions/" + state.competitionId + "/lifters/";
          setTimeout(() => {
              Vue.axios
              .get(api)
              .then(response => {
                  commit ("setLifters",response.data);
              })
              .catch(function(error) {
                  console.log(error);
                  store.dispatch('getLiftersAsync');
              });
            }, 1000)
          
      },
      getTeamsAsync({ commit, state }){
        var api =  "https://weightliftingoverlay.herokuapp.com/api/competitions/" + state.competitionId + "/teams/";
        setTimeout(() => {
            Vue.axios
            .get(api)
            .then(response => {
                commit ("setTeams",response.data);
            })
            .catch(function(error) {
                console.log(error);
                store.dispatch('getTeamsAsync');
            });
          }, 1000)
        
    },
        socket_timerMessage ({ dispatch, commit }, data)  {
          commit('TIMER', data);
        },
        socket_refereeMessage ({ dispatch, commit }, data)  {
          commit('REFEREE', data);
        }

    }
});

export default store
