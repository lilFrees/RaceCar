import style from "./Car.module.scss";
import { CarProps } from "../../types/types";
import { FaPlay, FaStop } from "react-icons/fa";
import CarImg from "../../assets/CarImg";
import useCars from "../../hooks/useCars";

function Car(props: { car: CarProps }) {
  const { dispatch, deleteCar, state } = useCars();

  return (
    <div
      className={`${style.car} ${
        state.selectedCar?.id === props.car.id && style.selected
      }`}
    >
      <div className={style.actions}>
        <button
          className={style.btn}
          onClick={() => {
            dispatch({ type: "SELECT_CAR", payload: props.car });
          }}
        >
          Select
        </button>
        <button
          className={style.btn}
          onClick={() => {
            deleteCar(props.car.id);
          }}
        >
          Remove
        </button>
        <button className={`${style.btn} ${style.icon}`}>
          <FaPlay />
        </button>
        <button className={`${style.btn} ${style.icon}`}>
          <FaStop />
        </button>
      </div>
      <div className={style.carIcon}>
        <CarImg color={props.car.color} />
      </div>
      <div className={style.name}>{props.car.name}</div>
    </div>
  );
}

export default Car;
