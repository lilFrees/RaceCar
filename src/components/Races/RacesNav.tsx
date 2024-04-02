import style from "./RacesNav.module.scss";
import { CiPlay1 } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";

function RacesNav() {
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
        />
        <input type="color" className={style.color} />
        <button className={style.btn}>Update</button>
      </div>
      <div className={style.nav__item}>
        <button className={style.btn}>Generate Cars</button>
      </div>
    </div>
  );
}

export default RacesNav;
