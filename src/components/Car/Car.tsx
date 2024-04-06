import style from "./Car.module.scss";
import { CarProps } from "../../types/types";
import { FaPlay, FaStop } from "react-icons/fa";
import CarImg from "../../assets/CarImg";
import useCars from "../../hooks/useCars";

function Car({ car }: { car: CarProps }) {
  const { dispatch, deleteCar, state, startStop } = useCars();

  return (
    <div
      className={`${style.car} ${
        state.selectedCar?.id === car.id && style.selected
      }`}
    >
      <div className={style.actions}>
        <button
          className={style.btn}
          onClick={() => {
            dispatch({ type: "SELECT_CAR", payload: car });
          }}
        >
          Select
        </button>
        <button
          className={style.btn}
          onClick={() => {
            deleteCar(car.id);
          }}
        >
          Remove
        </button>
        <button
          className={`${style.btn} ${style.icon}`}
          onClick={() => {
            startStop(car.id, "started");
          }}
        >
          <FaPlay />
        </button>
        <button
          className={`${style.btn} ${style.icon}`}
          onClick={() => {
            startStop(car.id, "stopped");
          }}
        >
          <FaStop />
        </button>
      </div>
      <div className={style.carIcon}>
        <CarImg color={car.color} />
      </div>
      <div className={style.name}>{car.name}</div>
    </div>
  );
}

export default Car;
