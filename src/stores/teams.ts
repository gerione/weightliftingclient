import { defineStore } from 'pinia';
import type { TeamDetails } from '../services/teams/types';
import { ref } from 'vue';
import type { APIResponse } from '../services/types';
import { API } from '../services';
import type { AxiosError } from 'axios';

export const useTeamsStore = defineStore('teamsStore', () => {
  const id = ref<number>(0);
  const teams = ref<TeamDetails[]>([]);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const isFetching = ref(false);
  let interval: ReturnType<typeof setInterval> | null = null;

  async function dispatchGetCurrentTeams(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.teams.getTeams(id.value);
      if (status === 200) {
        teams.value = data;
        return {
          success: true,
        };
      }
    } catch (error) {
      const _error = error as AxiosError<string>;
      if (_error.response === undefined) {
        return {
          success: false,
          status: 400,
        };
      }
      return {
        success: false,
        status: _error.response?.status,
      };
    }
    return {
      success: false,
      status: 400,
    };
  }

  function fetchData(): void {
    loading.value = true;
    try {
      dispatchGetCurrentTeams().catch(err => console.log(err));;

      error.value = null;
    } catch (err: unknown) {
      error.value =
        err instanceof Error ? err.message : 'An unknown error occurred';
    } finally {
      loading.value = false;
    }
  }

  function startFetching(): void {
    if (isFetching.value) return;
    fetchData(); // Initial fetch
    interval = setInterval(fetchData, 5000);
  }

  function stopFetching(): void {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  return {
    id,
    teams,
    dispatchGetCurrentTeams,
    stopFetching,
    startFetching,
  };
});
