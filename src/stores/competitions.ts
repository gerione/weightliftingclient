import { defineStore } from 'pinia';
import  type {
  CompetitionData,
  CompetitionReturn,
} from '../services/competitions/types';
import { ref } from 'vue';
import  type { APIResponse } from '../services/types';
import { API } from '../services';
import  type { AxiosError } from 'axios';

export const useCompetitionsStore = defineStore('competitionsStore', () => {
  const competitions = ref<CompetitionData[]>([]);
  const currentCompetition = ref<CompetitionData>();
  const error = ref<string | null>(null);
  const loading = ref(false);
  const currentCompetitionId = ref(0);
  const isFetching = ref(false);
  let interval: ReturnType<typeof setInterval> | null = null;

  function initCompetitions(data: CompetitionData[]) {
    competitions.value = data;
  }

  async function dispatchGetCompetitions(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.competitions.getCompetitions();
      if (status === 200) {
        initCompetitions(data);
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

  function initCompetitionDetail(data: CompetitionReturn) {
    currentCompetition.value = data.competition;
  }

  async function dispatchGetCurrentCompetition(): Promise<APIResponse<null>> {
    try {
      const { status, data } = await API.competitions.getCompetitionDetails(
        currentCompetitionId.value,
      );
      if (status === 200) {
        initCompetitionDetail(data);
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
      dispatchGetCompetitions().catch(err => console.log(err));;
      dispatchGetCurrentCompetition().catch(err => console.log(err));;
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
    competitions,
    currentCompetition,
    currentCompetitionId,
    initCompetitions,
    dispatchGetCompetitions,
    dispatchGetCurrentCompetition,
    stopFetching,
    startFetching,
  };
});
