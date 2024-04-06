export type CarProps = {
  name: string;
  id: number;
  color: string;
};

export type ActionType =
  | { type: "SET_CARS"; payload: CarProps[] }
  | { type: "SELECT_CAR"; payload: CarProps }
  | { type: "DESELECT_CAR" }
  | { type: "UPDATE_CAR"; payload: CarProps }
  | { type: "CREATE_CAR"; payload: CarProps }
  | { type: "DELETE_CAR"; payload: number }
  | { type: "SET_PAGE"; payload: number };
