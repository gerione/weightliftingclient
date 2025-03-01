// the axios instance and types
import http from '../api';
import type { CompetitionData, CompetitionReturn } from './types';

async function getCompetitions() {
  return await http.get<CompetitionData[]>('competitions/');
}

async function getCompetitionDetails(id: number) {
  return await http.get<CompetitionReturn>(`competitions/${id}/`);
}

export default {
  getCompetitions,
  getCompetitionDetails,
};
