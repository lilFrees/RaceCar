import Car from "../Car/Car";
import style from "./Races.module.scss";
import useCars from "../../hooks/useCars";

function Races() {
  const { state } = useCars();

  return (
    <div className={style.container}>
      {state.cars.slice(0, 7).map((car, i) => (
        <Car car={car} key={i} />
      ))}
    </div>
  );
}

export default Races;
