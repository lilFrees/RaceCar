import style from "./Car.module.scss";
import { CarProps } from "../../types/types";
import { FaPlay, FaStop } from "react-icons/fa";
import carImg from "../../assets/car-img.png";

function Car(props: { car: CarProps }) {
  return (
    <div className={style.car}>
      <div className={style.actions}>
        <button className={style.btn}>Select</button>
        <button className={style.btn}>Remove</button>
        <button className={`${style.btn} ${style.icon}`}>
          <FaPlay />
        </button>
        <button className={`${style.btn} ${style.icon}`}>
          <FaStop />
        </button>
      </div>
      <div className={style.carIcon}>
        <img src={carImg} alt={`Car ${props.car.name}`} className={style.img} />
      </div>
    </div>
  );
}

export default Car;
