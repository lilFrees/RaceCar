import style from "./RaceTrack.module.scss";
import CarImg from "../../assets/CarImg";
import { CarProps } from "../../types/types";
import useCars from "../../hooks/useCars";
import "../../animations/animations.css";
import { useEffect, useState, useRef } from "react";

function RaceTrack({ car }: { car: CarProps }) {
  const { state, startStop } = useCars();
  const isMoving = state.movingCars[car.id];
  const [racePosition, setRacePosition] = useState(0);
  const intervalRef = useRef<number | null>(null);

  let duration: number = state.raceCompletionTimes[car.id];

  useEffect(() => {
    if (!state.raceCompletionTimes[car.id]) {
      startStop(car.id, "started").then(() => {
        duration = state.raceCompletionTimes[car.id];
      });
    }
  }, [state.raceCompletionTimes]);

  useEffect(() => {
    if (isMoving) {
      intervalRef.current = setInterval(() => {
        setRacePosition((prev) => {
          const nextPosition = prev + 1;
          if (nextPosition >= 100) {
            if (intervalRef.current !== null) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
          return nextPosition;
        });
      }, state.raceCompletionTimes[car.id] * 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMoving, state.raceCompletionTimes, car.id]);

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
