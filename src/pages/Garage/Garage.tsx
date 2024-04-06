import style from "./Garage.module.css";
import Races from "../../components/Races/Races";
import RacesNav from "../../components/Races/RacesNav";
import RacesPagination from "../../components/Races/RacesPagination";

function Garage() {
  return (
    <div className={style.container}>
      <RacesNav />
      <Races />
      <RacesPagination />
    </div>
  );
}

export default Garage;
