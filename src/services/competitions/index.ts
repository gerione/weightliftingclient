// the axios instance and types
import http from '../api'
import type { CompetitionData } from './types'

async function getCompetitions() {
  return await http.get<CompetitionData[]>('competitions/')
}

async function getCompetitionDetails(id: number) {
  return await http.get<CompetitionData>(`competitions/${id}/`)
}

export default {
  getCompetitions,
  getCompetitionDetails,
}
