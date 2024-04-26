import { createContext, useEffect, useReducer } from "react";
import { CarProps, WinnerCarProps } from "../types/types";
import { ApiContextType, StateType } from "../types/interfaces";
import { ActionType } from "../types/types";
import RandomCars from "../data/randomCars.json";
import { useFetch } from "../hooks/useFetch";

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
  status: "stopped",
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
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
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
    dispatch({ type: "SET_STATUS", payload: "loading" });

    const result = await useFetch(
      `${BASE_URL}/garage?_page=${state.page}&_limit=${CARS_PER_PAGE}`
    );
    dispatch({ type: "SET_CARS", payload: result });
    dispatch({ type: "SET_STATUS", payload: "stopped" });

    return result;
  }

  async function getCar(id: number): Promise<CarProps> {
    const result = await useFetch(`${BASE_URL}/garage/${id}`);
    return result;
  }

  async function getMaxPagesForWinners(): Promise<number> {
    const result = await useFetch(`${BASE_URL}/winners`);

    const maxPages = Math.floor((result as WinnerCarProps[]).length / 10) + 1;
    return maxPages;
  }

  async function getCarsLength(): Promise<number> {
    const result = await useFetch(`${BASE_URL}/garage`);
    const length = (result as CarProps[]).length;
    return length;
  }

  async function getWinnersLength(): Promise<number> {
    const result = await useFetch(`${BASE_URL}/winners`);
    const length = (result as WinnerCarProps[]).length;

    return length;
  }

  async function createCar(name: string, color: string) {
    const result = await useFetch(`${BASE_URL}/garage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, color }),
    });

    dispatch({ type: "CREATE_CAR", payload: result });
  }

  async function create100Cars() {
    const brands = RandomCars.brands;

    function randomColor() {
      const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");

      return "#" + randomColor;
    }

    function randomCar() {
      const car = brands[Math.floor(Math.random() * brands.length)];
      const brand = car.brand;
      const model = car.models[Math.floor(Math.random() * car.models.length)];
      return brand + " " + model;
    }

    for (let i = 0; i < 100; i++) {
      createCar(randomCar(), randomColor());
    }
  }

  async function deleteCar(id: number) {
    const result = await useFetch(`${BASE_URL}/garage/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: "DELETE_CAR", payload: id });

    return result;
  }

  async function updateCar(id: number, name: string, color: string) {
    const result = await useFetch(`${BASE_URL}/garage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, color }),
    });

    dispatch({ type: "UPDATE_CAR", payload: result });

    return result;
  }

  async function startStop(id: number, status: "started" | "stopped") {
    const result = await useFetch(
      `${BASE_URL}/engine?id=${id}&status=${status}`,
      {
        method: "PATCH",
      }
    );
    if (status === "started") {
      const { velocity, distance } = result;
      const time = distance / velocity / 1000;
      dispatch({ type: "SET_RACE_COMPLETION_TIME", payload: { id, time } });
    } else if (status === "stopped") {
      dispatch({
        type: "SET_RACE_COMPLETION_TIME",
        payload: { id, time: NaN },
      });
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
    dispatch({ type: "SET_STATUS", payload: "loading" });

    const promises = state.cars.map((car) => startStop(car.id, "started"));

    try {
      await Promise.all(promises);
      await dispatch({ type: "SET_STATUS", payload: "race" });

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
          dispatch({ type: "SET_STATUS", payload: "finished" });
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
    const result = await useFetch(`${BASE_URL}/winners`);

    const maxPage = Math.floor(result.length / 10);

    if (newPage <= maxPage && newPage >= 1) {
      dispatch({ type: "SET_WIN_PAGE", payload: newPage });
    }
  }

  async function getMaxPages(): Promise<number> {
    const result = await useFetch(`${BASE_URL}/winners`);
    const maxPages =
      (await Math.floor((result as WinnerCarProps[]).length / 10)) + 1;
    return maxPages;
  }

  async function getWinners(): Promise<any> {
    const result = await useFetch(
      `${BASE_URL}/winners?_limit=10&_page=${state.winnerPage}`
    );
    dispatch({ type: "SET_WINNERS", payload: result });
    return result;
  }

  async function getWinner(id: number): Promise<any> {
    const result = await useFetch(`${BASE_URL}/winners/${id}`);
    return result;
  }

  async function createWinner(id: number) {
    if (id === undefined) {
      return;
    }

    const time: number | undefined = state.raceCompletionTimes[id];

    const winnerCar = JSON.stringify({
      id: id,
      wins: 1,
      time: Number(time.toFixed(2)),
    });

    const result = await useFetch(`${BASE_URL}/winners`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: winnerCar,
    });

    return result;
  }

  async function updateWinner(id: number, time: number) {
    const existingCar = state.winnerCars.find((car) => car.id === id);
    if (!existingCar) {
      console.error(`Car doesn't exist`);
      return;
    }
    const finishTime = Math.min(existingCar.time, time);

    const result = useFetch(`${BASE_URL}/winners/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        time: finishTime,
        wins: existingCar.wins + 1,
      }),
    });
    return result;
  }

  async function deleteWinner(id: number): Promise<any> {
    const result = useFetch(`${BASE_URL}/winners/${id}`, {
      method: "DELETE",
    });

    return result;
  }

  const resetCars = async () => {
    dispatch({ type: "SET_STATUS", payload: "loading" });
    dispatch({ type: "RESET_CARS" });
    const promises = state.cars.map((car) => startStop(car.id, "stopped"));

    try {
      await Promise.all(promises);
      dispatch({ type: "SET_STATUS", payload: "stopped" });
    } catch (error) {
      console.error("Failed to stop the cars " + error);
    }
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
    deleteWinner,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}
