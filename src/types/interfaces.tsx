import { CarProps, ActionType } from "./types";

export interface CarState {
  cars: CarProps[];
}

export interface Action {
  value: any;
  type: string;
}

export interface CarNavType {
  name: string;
  color: string;
}

export interface ApiContextType {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
  getCars: () => Promise<CarProps[]>;
  getCar: (id: number) => Promise<CarProps>;
  createCar: (name: string, color: string) => Promise<void>;
  deleteCar: (id: number) => Promise<void>;
  updateCar: (id: number, name: string, color: string) => Promise<void>;
  startStop: (id: number, status: "started" | "stopped") => Promise<any>;
  drive: (id: number) => Promise<void>;
}

export interface StateType {
  cars: CarProps[];
  selectedCar: CarProps | null;
  carIsSelected: boolean;
}
