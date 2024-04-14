import style from "./Winners.module.scss";
import useCars from "../../hooks/useCars";
import WinnerCar from "../../components/WinnerCar/WinnerCar";
import WinnerPagination from "../../components/WinnerPagination/WinnerPagination";
import { useEffect } from "react";

function Winners() {
  const { state, getWinners } = useCars();

  useEffect(() => {
    getWinners();
  }, []);

  return (
    <div className={style.container}>
      <h1>Winners</h1>
      <div className={style.props}>
        <div className={style.props__item}>№</div>
        <div className={style.props__item}>Car</div>
        <div className={style.props__item}>Name</div>
        <div className={style.props__item}>Wins</div>
        <div className={style.props__item}>Best time (seconds)</div>
      </div>
      <div className={style.list}>
        {state.winnerCars.map((car, i) => {
          if (state.cars.find((veh) => veh.id === car.id)) {
            return <WinnerCar key={i} car={car} />;
          }
        })}
      </div>
      <WinnerPagination />
    </div>
  );
}

export default Winners;
