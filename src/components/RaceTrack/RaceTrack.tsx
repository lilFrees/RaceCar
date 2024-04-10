import style from "./RaceTrack.module.scss";
import CarImg from "../../assets/CarImg";
import { CarProps } from "../../types/types";
import useCars from "../../hooks/useCars";
import "../../animations/animations.css";
import { useEffect, useState } from "react";

function RaceTrack({ car }: { car: CarProps }) {
  const { state, startStop } = useCars();
  const isMoving = state.movingCars[car.id];
  const [racePosition, setRacePosition] = useState(0);
  let duration: number = state.raceCompletionTimes[car.id];
  useEffect(() => {
    if (!state.raceCompletionTimes[car.id]) {
      startStop(car.id, "started").then(() => {
        duration = state.raceCompletionTimes[car.id];
      });
    }
  }, [state.raceCompletionTimes]);

  let interval: number;

  useEffect(() => {
    if (isMoving) {
      interval = setInterval(() => {
        setRacePosition((prev) => {
          if (prev < 100) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, duration * 10);
    } else if (!isMoving) {
      clearInterval(interval);
    }
  }, [isMoving]);

  return (
    <div
      className={`${style.track} ${
        state.selectedCar?.id === car.id && style.selected
      }`}
    >
      <div
        className={style.carIcon}
        style={{ left: `calc((100% - 6rem) * ${racePosition / 100})` }}
      >
        <CarImg color={car.color} />
      </div>
      <div className={style.name}>{car.name}</div>
    </div>
  );
}

export default RaceTrack;
