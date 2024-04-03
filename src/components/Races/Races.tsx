import { useEffect, useReducer } from "react";
import Car from "../Car/Car";
import style from "./Races.module.scss";
import { CarState, Action } from "../../types/interfaces";
import useCars from "../../hooks/useCars";

const initialState: CarState = {
  cars: [],
};

function reducer(state: CarState, action: Action): CarState {
  switch (action.type) {
    case "fetch":
      return { ...state, cars: action.value };
    default:
      throw new Error("Unhandled action type");
  }
}

function Races() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { getCars } = useCars();

  async function fetchCars() {
    const cars = await getCars();

    dispatch({ type: "fetch", value: cars });
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className={style.container}>
      {state.cars.map((car, i) => (
        <Car car={car} key={i} />
      ))}
    </div>
  );
}

export default Races;
