import { createContext, useState } from "react";
import { CarProps } from "../types/types";

// interface APIFunctions {
//   getCars(): CarProps[];
//   getCar(id: number): CarProps;
//   createCar(name: string, color: string): CarProps;
//   deleteCar(id: number): void;
//   updateCar(id: number, name: string, color: string): CarProps;
//   startStop(
//     id: number,
//     status: "started" | "stopped"
//   ): { velocity: number; distance: number };
//   drive(id: number): void;
// }
export const ApiContext = createContext({
  carIsSelected: false,
  selectedCar: { id: NaN, name: "", color: "" },
  selectCarHandler: (_value: CarProps) => {},
  getCars: () => {},
  getCar: (_id: number) => {},
  createCar: (_name: string, _color: string) => {},
  deleteCar: (_id: number) => {},
  updateCar: (_id: number, _name: string, _color: string) => {},
  startStop: (_id: number, _status: "started" | "stopped") => {},
  drive: () => {},
});

export function ApiProvider(props: any) {
  const BASE_URL: string = "http://127.0.0.1:3000";

  async function getCars() {
    try {
      const result = await fetch(`${BASE_URL}/garage`);
      const data = result.json();
      return data;
    } catch (error) {
      throw new Error("Failed to get cars: " + error);
    }
  }

  async function getCar(id: number) {
    try {
      const result = await fetch(`${BASE_URL}/garage/${id}`);
      const data = result.json();
      return data;
    } catch (error) {
      throw new Error(`Cannot get cars with the id ${id}: ` + error);
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

      return data;
    } catch (error) {
      throw new Error("Failed to create a car: " + error);
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

      return result;
    } catch (error) {
      throw new Error("Failed to create a car: " + error);
    }
  }

  async function updateCar(id: number, name: string, color: string) {
    try {
      const data = await fetch(`${BASE_URL}/garage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, color }),
      });
      setSelectedCar({
        id: NaN,
        name: "",
        color: "",
      });
      setCarIsSelected(false);
      const result = data.json();

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

      const result = data.json();

      return result;
    } catch (error) {
      throw new Error(`Failed to start or stop the car: ${error}`);
    }
  }

  async function drive() {}

  const [selectedCar, setSelectedCar] = useState<CarProps>({
    id: 0,
    name: "",
    color: "",
  });

  const [carIsSelected, setCarIsSelected] = useState<boolean>(false);

  function selectCarHandler(value: CarProps) {
    setSelectedCar(value);
    setCarIsSelected(true);
  }

  const apiFunctions = {
    carIsSelected,
    selectedCar,
    selectCarHandler,
    getCars,
    getCar,
    createCar,
    deleteCar,
    updateCar,
    startStop,
    drive,
  };

  return (
    <ApiContext.Provider value={apiFunctions}>
      {props.children}
    </ApiContext.Provider>
  );
}
