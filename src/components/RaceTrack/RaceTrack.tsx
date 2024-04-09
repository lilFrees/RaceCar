import style from "./RaceTrack.module.css";
import CarImg from "../../assets/CarImg";
import { CarProps } from "../../types/types";
import useCars from "../../hooks/useCars";
import "../../animations/animations.css";

function RaceTrack({ car }: { car: CarProps }) {
  const { state } = useCars();
  const duration = state.raceCompletionTimes[car.id];

  return (
    <div
      className={`${style.track} ${
        state.selectedCar?.id === car.id && style.selected
      }`}
    >
      <div
        className={style.carIcon}
        style={{
          animation: `moving ${duration}s linear forwards`,
        }}
      >
        <CarImg color={car.color} />
      </div>
      <div className={style.name}>{car.name}</div>
    </div>
  );
}

export default RaceTrack;
