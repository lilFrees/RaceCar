import style from "./RaceTrack.module.scss";
import CarImg from "../../assets/CarImg";
import { CarProps } from "../../types/types";
import useCars from "../../hooks/useCars";
import "../../animations/animations.css";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

function RaceTrack({ car }: { car: CarProps }) {
  const { state, dispatch } = useCars();
  const [racePosition, setRacePosition] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const { raceCompletionTimes, movingCars } = state;

  useEffect(() => {
    if (movingCars[car.id]) {
      const duration = raceCompletionTimes[car.id];
      intervalRef.current = window.setInterval(() => {
        setRacePosition((prev) => {
          const nextPosition = prev + 1;
          if (nextPosition >= 100) {
            setTimeout(() => {
              dispatch({ type: "STOP_CAR", payload: car.id });
            }, 0);
            return 100;
          }
          return nextPosition;
        });
      }, duration * 10);

      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
      };
    } else if (
      !(car.id in state.movingCars) &&
      !(car.id in state.raceCompletionTimes)
    ) {
      setRacePosition(0);
      dispatch({ type: "STOP_CAR", payload: car.id });
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }
  }, [car.id, movingCars, raceCompletionTimes]);

  return (
    <div
      className={`${style.track} ${
        state.selectedCar?.id === car.id ? style.selected : ""
      }`}
    >
      <motion.div
        className={style.carIcon}
        animate={{ left: `calc((100% - 6rem) * ${racePosition / 100})` }}
        transition={{ ease: (t) => t, duration: 0.1, type: "tween" }}
      >
        <CarImg color={car.color} />
      </motion.div>
      <div className={style.name}>{car.name}</div>
    </div>
  );
}

export default RaceTrack;
