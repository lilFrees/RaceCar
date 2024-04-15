export type CarProps = {
  name: string;
  id: number;
  color: string;
};

// export type FinishedCar = {
//   id: number;
//   time: number;
// };

export type WinnerCarProps = {
  id: number;
  wins: number;
  time: number;
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
  | { type: "SET_WIN_PAGE"; payload: number }
  | { type: "START_CAR"; payload: number }
  | { type: "STOP_CAR"; payload: number }
  | { type: "SET_RACE_COMPLETION_TIME"; payload: { id: number; time: number } }
  | { type: "RESET_CARS" }
  | { type: "RESET_CAR"; payload: number }
  | { type: "SET_ALL_MOVING_CARS"; payload: Record<number, boolean> }
  | { type: "SET_WINNER"; payload: number | undefined }
  | { type: "SET_WINNERS"; payload: WinnerCarProps[] }
  | { type: "ADD_WINNER"; payload: WinnerCarProps }
  | { type: "SHOW_WINNER" }
  | { type: "HIDE_WINNER" }
  | {
      type: "SET_STATUS";
      payload: "stopped" | "race" | "finished" | "loading";
    };

export type AppState = {
  createValue: string;
  createColor: string;
  updateValue: string;
  updateColor: string;
  racePositions: Record<number, number>;
  page: number;
};
