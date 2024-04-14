import { CarProps, ActionType, WinnerCarProps, AppState } from "./types";

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
  getCars(): Promise<CarProps[]>;
  getCar(id: number): Promise<CarProps>;
  getMaxPages(): Promise<number>;
  getCarsLength(): Promise<number>;
  createCar(name: string, color: string): Promise<void>;
  create100Cars(): void;
  deleteCar(id: number): Promise<void>;
  updateCar(id: number, name: string, color: string): Promise<void>;
  startStop(id: number, status: "started" | "stopped"): Promise<any>;
  startAllCars(): void;
  drive(id: number): Promise<{ success: boolean }>;
  resetCars(): void;
  getWinners(): Promise<any>;
  getWinner(id: number): Promise<any>;
  createWinner(id: number, time: number): Promise<any>;
  updateWinner(id: number, time: number): Promise<any>;
}

export interface StateType {
  cars: CarProps[];
  selectedCar: CarProps | null;
  carIsSelected: boolean;
  winnerCarId: number | undefined;
  page: number;
  movingCars: Record<number, boolean>;
  raceCompletionTimes: Record<number, number>;
  winnerCars: WinnerCarProps[];
  showWinner: boolean;
}

export interface AppStateContextValue {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  racePositionHandler(id: number, value: number): void;
  racePositionHandler(id: number, value: number | (() => number)): void;
}
