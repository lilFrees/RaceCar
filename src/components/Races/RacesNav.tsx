import style from "./RacesNav.module.scss";
import { CiPlay1 } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import useCars from "../../hooks/useCars";
import { useEffect, useState } from "react";
import { UpdateHandler } from "../../types/interfaces";

function RacesNav() {
  const { selectedCar, carIsSelected, updateCar } = useCars();

  const [updatingValue, setUpdatingValue] = useState<UpdateHandler>({
    name: "",
    color: "",
  });

  useEffect(() => {
    console.log(updatingValue);
  }, [updatingValue]);

  function nameHandler(value: string) {
    if (carIsSelected) {
      setUpdatingValue({ ...updatingValue, name: value });
    }
  }

  function colorHandler(value: string) {
    if (carIsSelected) {
      setUpdatingValue({ ...updatingValue, color: value });
    }
  }

  useEffect(() => {
    if (carIsSelected) {
      setUpdatingValue({
        name: selectedCar.name,
        color: selectedCar.color,
      });
    }
  }, [carIsSelected]);

  return (
    <div className={style.nav}>
      <div className={style.nav__item}>
        <button className={style.btn}>
          Race <CiPlay1 />
        </button>
        <button className={style.btn}>
          Reset <GrPowerReset />
        </button>
      </div>
      <div className={style.nav__item}>
        <input
          type="text"
          max={20}
          className={style.input}
          placeholder="TYPE CAR BRAND"
        />
        <input type="color" className={style.color} />
        <button className={style.btn}>Create</button>
      </div>
      <div className={style.nav__item}>
        <input
          type="text"
          max={20}
          className={style.input}
          placeholder="TYPE CAR BRAND"
          value={updatingValue.name}
          onChange={(val) => {
            nameHandler(val.target.value);
          }}
        />
        <input
          type="color"
          className={style.color}
          value={updatingValue.color}
          onChange={(val) => {
            colorHandler(val.target.value);
          }}
        />
        <button
          className={style.btn}
          onClick={() => {
            updateCar(selectedCar.id, updatingValue.name, updatingValue.color);
          }}
        >
          Update
        </button>
      </div>
      <div className={style.nav__item}>
        <button className={style.btn}>Generate Cars</button>
      </div>
    </div>
  );
}

export default RacesNav;
