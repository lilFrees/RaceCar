import Races from "../../components/Races/Races";
import RacesNav from "../../components/Races/RacesNav";
import style from "./Garage.module.css";

function Garage() {
  return (
    <div className={style.container}>
      <RacesNav />
      <Races />
    </div>
  );
}

export default Garage;
