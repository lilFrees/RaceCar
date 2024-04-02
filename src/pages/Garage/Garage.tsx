import style from "./Garage.module.css";
import Races from "../../components/Races/Races";
import RacesNav from "../../components/Races/RacesNav";

function Garage() {
  return (
    <div className={style.container}>
      <RacesNav />
      <Races />
    </div>
  );
}

export default Garage;
