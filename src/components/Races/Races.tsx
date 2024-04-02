import { useEffect, useReducer } from "react";
import Car from "../Car/Car";
import style from "./Races.module.scss";
import { CarState, Action } from "../../types/interfaces";

const BASE_URL: string = "http://127.0.0.1:3000";

const initialState: CarState = {
  cars: [],
};

function reducer(state: CarState, action: Action): CarState {
  switch (action.type) {
    case "fetch":
      return { ...state, cars: action?.value };
    default:
      throw new Error("Unhandled action type");
  }
}

function Races() {
  const [state, dispatch] = useReducer(reducer, initialState);
  async function fetchCars() {
    const result = await fetch(`${BASE_URL}/garage`);
    const data = await result.json();

    dispatch({ type: "fetch", value: data });
  }

  useEffect(() => {
    fetchCars();
  }, []);
  console.log(state.cars);

  return (
    <div className={style.container}>
      {state.cars.map((car, i) => (
        <Car car={car} key={i} />
      ))}
    </div>
  );
}

export default Races;
