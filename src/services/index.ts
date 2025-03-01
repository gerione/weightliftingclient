//services/index.ts
import competitionController from './competitions';
import lifterController from './lifters';
import teamController from './teams';

export const API = {
  competitions: competitionController,
  lifters: lifterController,
  teams: teamController,
};
