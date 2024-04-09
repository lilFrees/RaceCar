import style from "./Races.module.scss";
import CarControls from "../CarControls/CarControls";
import useCars from "../../hooks/useCars";
import RaceTrack from "../RaceTrack/RaceTrack";
import { CARS_PER_PAGE } from "../../context/api-context";

function Races() {
  const { state } = useCars();

  return (
    <div className={style.container}>
      {state.cars.slice(0, CARS_PER_PAGE).map((car, i) => (
        <div className={style.raceTrack} key={i}>
          <CarControls car={car} />
          <RaceTrack car={car} />
        </div>
      ))}
    </div>
  );
}

export default Races;
