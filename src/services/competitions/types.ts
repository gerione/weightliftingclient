export type CompetitionData = {
  external_timer: boolean;
  id: number;
  location: string;
  name: string;
  start_time: string;
  type: string;
  youtube_id: string;
};
export type CompetitionReturn = {
  competition: CompetitionData;
};
