// the axios instance and types
import http from '../api';

import type { TeamDetails } from './types';

async function getTeams(id: number) {
  return await http.get<TeamDetails[]>(`competitions/${id}/teams/`);
}

export default {
  getTeams,
};
