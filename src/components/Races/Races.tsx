import style from "./Races.module.scss";
import CarControls from "../CarControls/CarControls";
import useCars from "../../hooks/useCars";
import RaceTrack from "../RaceTrack/RaceTrack";
import { CARS_PER_PAGE } from "../../context/api-context";
import Modal from "../../Modal/Modal";

function Races() {
  const { state } = useCars();

  const winnerId = state.winnerCarId;

  return (
    <div className={style.container}>
      {state.cars.slice(0, CARS_PER_PAGE).map((car, i) => (
        <div className={style.raceTrack} key={i}>
          <CarControls car={car} />
          <RaceTrack car={car} />
        </div>
      ))}
      {state.showWinner && winnerId !== undefined && (
        <Modal>
          <div>Winner</div>
          <div>{state.cars[winnerId].name}</div>
          <div>{state.winnerCars[winnerId].time}</div>
        </Modal>
      )}
    </div>
  );
}

export default Races;
