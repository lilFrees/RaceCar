import { createContext, useEffect, useReducer } from "react";
import { CarProps } from "../types/types";
import { ApiContextType, StateType } from "../types/interfaces";
import { ActionType } from "../types/types";
import RandomCars from "../data/randomCars.json";

const initialState: StateType = {
  cars: [],
  selectedCar: null,
  carIsSelected: false,
  page: 1,
};

const CARS_PER_PAGE = 7;

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
    default:
      return state;
  }
}

export const ApiContext = createContext<ApiContextType | null>(null);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const BASE_URL: string = "http://127.0.0.1:3000";

  const [state, dispatch] = useReducer(reducer, initialState);

  async function getCars() {
    try {
      const result = await fetch(
        `${BASE_URL}/garage?_page=${state.page}&_limit=7`
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

  async function getMaxPages(): Promise<number> {
    try {
      const request = await fetch(`${BASE_URL}/garage`);
      const data = await request.json();

      const maxPages = Math.floor((data as CarProps[]).length / 7);
      return maxPages;
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
      const url = new URL(`${BASE_URL}/engine`);

      url.searchParams.append(`id`, id.toString());
      url.searchParams.append(`status`, status);

      const data = await fetch(url, {
        method: "PATCH",
      });

      const result = await data.json();

      console.log(result);

      return result;
    } catch (error) {
      throw new Error(`Failed to start or stop the car: ${error}`);
    }
  }

  async function drive() {}

  async function setPage(newPage: number) {
    const request = await fetch(`${BASE_URL}/garage`);
    const response = await request.json();

    const maxPage = Math.floor(response.length / CARS_PER_PAGE);

    if (newPage <= maxPage && newPage >= 1) {
      dispatch({ type: "SET_PAGE", payload: newPage });
    }
  }

  useEffect(() => {
    getCars();
  }, [state.page]);

  const contextValue = {
    state,
    dispatch,
    setPage,
    getCars,
    getCar,
    getMaxPages,
    createCar,
    create100Cars,
    deleteCar,
    updateCar,
    startStop,
    drive,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}
