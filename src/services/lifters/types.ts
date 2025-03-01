export interface Weightclass {
  id: number;
  max_weight: number;
  min_weight: number;
  name: string;
  sex: boolean;
}
export interface Team {
  id: number;
  name: string;
  short: string;
}

interface Lift {
  attempt: number;
  id: number;
  result: number;
  weight: number;
}

interface Masterdata {
  club_single: string;
  club_single_short: string;
  club_team: string;
  club_team_short: string;
  id: string;
  name: string;
  sex: boolean;
  year: number;
}

export type Lifter = {
  name: string;
  sex: boolean;
  sf: number;
  lifts: Lift[];
  team: Team;
  weightclass: Weightclass;
  masterdata: Masterdata;
  max_snatch: number;
  max_cj: number;
  total_points: number;
};
