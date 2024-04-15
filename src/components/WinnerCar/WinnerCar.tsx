import CarImg from "../../assets/CarImg";
import useCars from "../../hooks/useCars";
import { WinnerCarProps } from "../../types/types";
import style from "./WinnerCar.module.scss";

function WinnerCar({ car }: { car: WinnerCarProps }) {
  const { state } = useCars();
  const carInfo = state.cars.find((props) => props.id === car.id);
  console.log(car);
  if (!car) {
    return null;
  }
  return (
    <div className={style.item}>
      <div className={style.item__prop}>{car.id}</div>
      <div className={`${style.item__prop} ${style.carIcon}`}>
        <CarImg color={carInfo?.color || "#000"} />
      </div>
      <div className={style.item__prop}>{carInfo?.name}</div>
      <div className={style.item__prop}>{car.wins}</div>
      <div className={style.item__prop}>{car.time.toFixed(2)}</div>
    </div>
  );
}

export default WinnerCar;
