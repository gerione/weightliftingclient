// the axios instance and types
import http from '../api';
import type { Lifter } from './types';

async function getLifters(id: number) {
  return await http.get<Lifter[]>(`competitions/${id}/lifters/`);
}

async function getCurrentLifter(id: number) {
  return await http.get<Lifter>(`competitions/${id}/lifters/current/`);
}

export default {
  getLifters,
  getCurrentLifter,
};
