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
  getMaxPages: () => Promise<number>;
  getCarsLength: () => Promise<number>;
  createCar: (name: string, color: string) => Promise<void>;
  create100Cars: () => void;
  deleteCar: (id: number) => Promise<void>;
  updateCar: (id: number, name: string, color: string) => Promise<void>;
  startStop: (id: number, status: "started" | "stopped") => Promise<any>;
  drive: (id: number) => Promise<{ success: boolean }>;
  resetCars: () => void;
}

export interface StateType {
  cars: CarProps[];
  selectedCar: CarProps | null;
  carIsSelected: boolean;
  page: number;
  movingCars: Record<number, boolean>;
  raceCompletionTimes: Record<number, number>;
}
