import { defineStore } from 'pinia';
import type { Lifter } from '../services/lifters/types';
import { ref } from 'vue';
import type { APIResponse } from '../services/types';
import { API } from '../services';
import type { AxiosError } from 'axios';

export const useLifterStore = defineStore('lifterStore', () => {
  const id = ref<number>(0);
  const lifters = ref<Lifter[]>([]);
  const currentLifter = ref<Lifter>();
  const error = ref<string | null>(null);
  const loading = ref(false);
  const isFetching = ref(false);
  let interval: ReturnType<typeof setInterval> | null = null;

  async function dispatchGetCurrentLifter(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.lifters.getCurrentLifter(id.value);
      if (status === 200) {
        currentLifter.value = data;
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

  async function dispatchGetCompetitionLifters(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.lifters.getLifters(id.value);
      if (status === 201) {
        console.log(data);
        lifters.value = data;
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
      dispatchGetCurrentLifter().catch(err => console.log(err));
      dispatchGetCompetitionLifters().catch(err => console.log(err));
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
    currentLifter,
    lifters,
    dispatchGetCurrentLifter,
    dispatchGetCompetitionLifters,
    stopFetching,
    startFetching,
  };
});
