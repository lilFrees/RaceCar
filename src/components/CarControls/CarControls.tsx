import style from "./CarControls.module.scss";
import { CarProps } from "../../types/types";
import { FaPlay, FaStop } from "react-icons/fa";
import useCars from "../../hooks/useCars";

function CarControls({ car }: { car: CarProps }) {
  const { dispatch, deleteCar, state, resetCars } = useCars();

  return (
    <div className={style.car}>
      <div className={style.actions}>
        <div className={style.action}>
          <button
            className={style.btn}
            onClick={() => {
              if (car.id === state.selectedCar?.id) {
                dispatch({ type: "DESELECT_CAR" });
              } else {
                dispatch({ type: "SELECT_CAR", payload: car });
              }
            }}
          >
            {state.selectedCar?.id === car.id ? "Cancel" : "Select"}
          </button>
          <button
            className={`${style.btn} ${style.icon}`}
            onClick={() => {
              dispatch({ type: "START_CAR", payload: car.id });
            }}
          >
            <FaPlay />
          </button>
        </div>
        <div className={style.action}>
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
              dispatch({ type: "STOP_CAR", payload: car.id });
            }}
          >
            <FaStop />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarControls;
