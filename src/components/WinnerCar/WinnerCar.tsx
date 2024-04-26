import { useEffect, useState } from "react";
import CarImg from "../../assets/CarImg";
import { BASE_URL } from "../../context/api-context";
import useCars from "../../hooks/useCars";
import { useFetch } from "../../hooks/useFetch";
import { CarProps, WinnerCarProps } from "../../types/types";
import style from "./WinnerCar.module.scss";

function WinnerCar({ car }: { car: WinnerCarProps }) {
  const { getCar } = useCars();
  const [carInfo, setCarInfo] = useState<CarProps>({
    name: "",
    id: NaN,
    color: "#000",
  });

  async function getValues() {
    const carProp = await getCar(car.id);
    setCarInfo(carProp);
  }

  useEffect(() => {
    getValues();
  }, [car]);

  return (
    <div className={style.item}>
      <div className={style.item__prop}>{car.id}</div>
      <div className={`${style.item__prop} ${style.carIcon}`}>
        <CarImg color={carInfo?.color || "#000"} />
      </div>
      <div className={style.item__prop}>{carInfo?.name}</div>
      <div className={style.item__prop}>{car.wins}</div>
      <div className={style.item__prop}>{car.time?.toFixed(2)}</div>
    </div>
  );
}

export default WinnerCar;
