import { CarProps } from "./types";

export interface CarState {
  cars: CarProps[];
}

export interface Action {
  value: any;
  type: string;
}

export interface UpdateHandler {
  name: string;
  color: string;
}
