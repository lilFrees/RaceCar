export type CarProps = {
  name: string;
  id: number;
  color: string;
  status: "started" | "stopped" | "driving";
};

export type RaceResult = {
  carId: number;
  status: "finished" | "error";
  time?: number;
};

export type ActionType =
  | { type: "SET_CARS"; payload: CarProps[] }
  | { type: "SELECT_CAR"; payload: CarProps }
  | { type: "DESELECT_CAR" }
  | { type: "UPDATE_CAR"; payload: CarProps }
  | { type: "CREATE_CAR"; payload: CarProps }
  | { type: "DELETE_CAR"; payload: number }
  | { type: "SET_PAGE"; payload: number }
  | { type: "START_RACE" }
  | { type: "FINISH_RACE" }
  | { type: "UPDATE_RACE_RESULT"; payload: RaceResult }
  | { type: "START_CAR"; payload: number }
  | { type: "STOP_CAR"; payload: number }
  | { type: "DRIVE_CAR_FAILURE"; payload: number }
  | { type: "DRIVE_CAR_SUCCESS"; payload: number }
  | { type: "SET_RACE_COMPLETION_TIME"; payload: { id: number; time: number } }
  | { type: "RESET_CARS" };
