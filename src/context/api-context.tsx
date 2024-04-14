import { createContext, useEffect, useReducer } from "react";
import { CarProps, WinnerCarProps } from "../types/types";
import { ApiContextType, StateType } from "../types/interfaces";
import { ActionType } from "../types/types";
import RandomCars from "../data/randomCars.json";

const initialState: StateType = {
  cars: [],
  selectedCar: null,
  carIsSelected: false,
  page: 1,
  winnerPage: 1,
  movingCars: {},
  raceCompletionTimes: {},
  winnerCarId: undefined,
  winnerCars: [],
  showWinner: false,
};

export const CARS_PER_PAGE = 7;

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_CARS":
      return { ...state, cars: action.payload };
    case "SELECT_CAR":
      return { ...state, selectedCar: action.payload, carIsSelected: true };
    case "DESELECT_CAR":
      return { ...state, selectedCar: null, carIsSelected: false };
    case "UPDATE_CAR":
      return {
        ...state,
        cars: state.cars.map((car) =>
          car.id === action.payload.id ? action.payload : car
        ),
        selectedCar: null,
        carIsSelected: false,
      };
    case "CREATE_CAR":
      return { ...state, cars: [...state.cars, action.payload] };
    case "DELETE_CAR":
      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload),
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "SET_WIN_PAGE":
      return {
        ...state,
        winnerPage: action.payload,
      };
    case "START_CAR":
      return {
        ...state,
        movingCars: { ...state.movingCars, [action.payload]: true },
      };
    case "STOP_CAR":
      return {
        ...state,
        movingCars: { ...state.movingCars, [action.payload]: false },
      };
    case "SET_RACE_COMPLETION_TIME":
      return {
        ...state,
        raceCompletionTimes: {
          ...state.raceCompletionTimes,
          [action.payload.id]: action.payload.time,
        },
      };
    case "RESET_CARS":
      return {
        ...state,
        movingCars: {},
        raceCompletionTimes: {},
      };
    case "RESET_CAR":
      delete state.movingCars[action.payload];
      delete state.raceCompletionTimes[action.payload];
      return {
        ...state,
      };
    case "SET_ALL_MOVING_CARS":
      return {
        ...state,
        movingCars: action.payload,
      };
    case "SET_WINNERS":
      return {
        ...state,
        winnerCars: action.payload,
      };
    case "SET_WINNER":
      return {
        ...state,
        winnerCarId: action.payload,
      };
    case "ADD_WINNER":
      return { ...state, winnerCars: [...state.winnerCars, action.payload] };
    case "HIDE_WINNER":
      return {
        ...state,
        showWinner: false,
      };
    case "SHOW_WINNER":
      return {
        ...state,
        showWinner: true,
      };

    default:
      return state;
  }
}

export const BASE_URL: string = "http://127.0.0.1:3000";

export const ApiContext = createContext<ApiContextType | null>(null);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getCars() {
    try {
      const result = await fetch(
        `${BASE_URL}/garage?_page=${state.page}&_limit=${CARS_PER_PAGE}`
      );
      const data = (await result.json()) as CarProps[];
      dispatch({ type: "SET_CARS", payload: data });
      return data;
    } catch (error) {
      throw new Error("Failed to get cars: " + error);
    }
  }

  async function getCar(id: number) {
    try {
      const result = await fetch(`${BASE_URL}/garage/${id}`);
      const data = await result.json();
      return data;
    } catch (error) {
      throw new Error(`Cannot get cars with the id ${id}: ` + error);
    }
  }

  async function getMaxPagesForWinners(): Promise<number> {
    try {
      const request = await fetch(`${BASE_URL}/winner`);
      const data = await request.json();

      const maxPages = Math.floor((data as CarProps[]).length / 7) + 1;
      return maxPages;
    } catch (error) {
      throw new Error("Failed to get max pages");
    }
  }

  async function getCarsLength(): Promise<number> {
    try {
      const request = await fetch(`${BASE_URL}/garage`);
      const data = await request.json();

      const length = (data as CarProps[]).length;
      return length;
    } catch (error) {
      throw new Error("Failed to get max pages");
    }
  }

  async function getWinnersLength(): Promise<number> {
    try {
      const request = await fetch(`${BASE_URL}/winners`);
      const data = await request.json();

      const length = (data as WinnerCarProps[]).length;
      return length;
    } catch (error) {
      throw new Error("Failed to get max pages");
    }
  }

  async function createCar(name: string, color: string) {
    try {
      const result = await fetch(`${BASE_URL}/garage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, color }),
      });
      const data = await result.json();
      dispatch({ type: "CREATE_CAR", payload: data });
    } catch (error) {
      throw new Error("Failed to create a car: " + error);
    }
  }

  async function create100Cars() {
    const cars: string[] = RandomCars.cars;
    const models: string[] = RandomCars.models;

    function randomColor() {
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

      return "#" + randomColor;
    }

    function randomCar() {
      const car = cars[Math.floor(Math.random() * cars.length)];
      const model = models[Math.floor(Math.random() * models.length)];
      return car + " " + model;
    }

    for (let i = 0; i < 100; i++) {
      createCar(randomCar(), randomColor());
    }
  }

  async function deleteCar(id: number) {
    try {
      const data = await fetch(`${BASE_URL}/garage/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await data.json();

      dispatch({ type: "DELETE_CAR", payload: id });

      return result;
    } catch (error) {
      throw new Error("Failed to create a car: " + error);
    }
  }

  async function updateCar(id: number, name: string, color: string) {
    try {
      const response = await fetch(`${BASE_URL}/garage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, color }),
      });

      if (!response.ok) {
        console.error(
          "Failed to update the car with response status:",
          response.status
        );
        return null;
      }
      const result = await response.json();

      dispatch({ type: "UPDATE_CAR", payload: result });

      return result;
    } catch (error) {
      throw new Error(`Failed to update the car with id ${id}: ${error}`);
    }
  }

  async function startStop(id: number, status: "started" | "stopped") {
    try {
      const response = await fetch(
        `${BASE_URL}/engine?id=${id}&status=${status}`,
        {
          method: "PATCH",
        }
      );
      const result = await response.json();

      if (status === "started" && response.ok) {
        const { velocity, distance } = result;
        const time = distance / velocity / 1000;
        dispatch({ type: "SET_RACE_COMPLETION_TIME", payload: { id, time } });
      } else if (status === "stopped") {
        dispatch({
          type: "SET_RACE_COMPLETION_TIME",
          payload: { id, time: NaN },
        });
      }
    } catch (error) {
      console.error(`Failed to start or stop the car: ${error}`);
    }
  }

  async function drive(id: number) {
    try {
      const response = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, {
        method: "PATCH",
      });

      if (!response.ok) {
        dispatch({ type: "STOP_CAR", payload: id });
        return { success: false };
      }

      const result = await response.json();

      return result;
    } catch (error: string | any) {
      console.error(error);
    }
  }

  async function startAllCars() {
    console.log("Start the race");
    let winner: number | undefined = undefined;

    const promises = state.cars.map((car) => startStop(car.id, "started"));

    try {
      await Promise.all(promises);

      const newMovingCars = state.cars.reduce(
        (acc: Record<number, boolean>, car) => {
          acc[car.id] = true;
          return acc;
        },
        {}
      );

      state.cars.forEach(async (car) => {
        const result = await drive(car.id);
        if (result.success && winner === undefined) {
          winner = car.id;
          dispatch({ type: "SHOW_WINNER" });
          getWinners();
          dispatch({ type: "SET_WINNER", payload: car.id });
        }
      });

      dispatch({ type: "SET_ALL_MOVING_CARS", payload: newMovingCars });
    } catch (error) {
      console.error("Error starting all cars:", error);
    }
  }

  async function setPage(newPage: number) {
    const request = await fetch(`${BASE_URL}/garage`);
    const response = await request.json();

    const maxPage = Math.floor(response.length / CARS_PER_PAGE);

    if (newPage <= maxPage && newPage >= 1) {
      dispatch({ type: "SET_PAGE", payload: newPage });
    }
  }

  async function setWinnerPage(newPage: number) {
    console.log(newPage);
    const request = await fetch(`${BASE_URL}/winners`);
    const response = await request.json();

    const maxPage = Math.floor(response.length / 10);

    if (newPage <= maxPage && newPage >= 1) {
      dispatch({ type: "SET_WIN_PAGE", payload: newPage });
    }
  }

  async function getMaxPages(): Promise<number> {
    try {
      const request = await fetch(`${BASE_URL}/winners`);
      const data = await request.json();

      const maxPages = Math.floor((data as WinnerCarProps[]).length / 10) + 1;
      return maxPages;
    } catch (error) {
      throw new Error("Failed to get max pages");
    }
  }

  async function getWinners(): Promise<any> {
    console.log(state.winnerPage);
    try {
      const response = await fetch(
        `${BASE_URL}/winners?_page=${state.winnerPage}&_limit=10`
      );
      const data = await response.json();

      dispatch({ type: "SET_WINNERS", payload: data });
      return data;
    } catch (error) {
      console.error(`Failed to get winners: ${error}`);
    }
  }

  async function getWinner(id: number): Promise<any> {
    try {
      const response = await fetch(`${BASE_URL}/winners/${id}`);
      const data = await response.json();

      console.log(data);
      return data;
    } catch (error) {
      console.error(`Failed to get winners: ${error}`);
    }
  }

  async function createWinner(id: number) {
    if (id === undefined) {
      return;
    }

    const time: number | undefined = state.raceCompletionTimes[id];

    try {
      const winnerCar = JSON.stringify({
        id: id,
        wins: 1,
        time: Number(time.toFixed(2)),
      });

      const response = await fetch(`${BASE_URL}/winners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: winnerCar,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function updateWinner(id: number, time: number) {
    const existingCar = state.winnerCars.find((car) => car.id === id);
    if (!existingCar) {
      console.error(`Car doesn't exist`);
      return;
    }

    try {
      const finishTime = Math.min(existingCar.time, time);
      console.log(finishTime);
      const response = await fetch(`${BASE_URL}/winners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          time: finishTime,
          wins: existingCar.wins + 1,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to update a winner ${error}`);
    }
  }

  const resetCars = () => {
    dispatch({ type: "RESET_CARS" });
  };

  useEffect(() => {
    if (state.winnerCarId !== undefined) {
      if (state.winnerCars.find((veh) => veh.id === state.winnerCarId)) {
        const timeFinished = state.raceCompletionTimes[state.winnerCarId];
        updateWinner(state.winnerCarId, timeFinished);
      } else {
        createWinner(state.winnerCarId);
      }
    }
    getWinners();
  }, [state.winnerCarId]);

  useEffect(() => {
    getCars();
  }, [state.page]);

  useEffect(() => {
    getWinners();
  }, [state.winnerPage]);

  const contextValue = {
    state,
    dispatch,
    setPage,
    setWinnerPage,
    getCars,
    getCar,
    getCarsLength,
    getWinnersLength,
    createCar,
    create100Cars,
    deleteCar,
    updateCar,
    startStop,
    drive,
    startAllCars,
    resetCars,
    getMaxPages,
    getWinners,
    getWinner,
    getMaxPagesForWinners,
    createWinner,
    updateWinner,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}
