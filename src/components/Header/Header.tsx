import { Link } from "react-router-dom";
import style from "./Header.module.scss";

function Header() {
  return (
    <div className={style.nav}>
      <div className={style.container}>
        <div className={style.links}>
          <Link to="/" className={style.link}>
            Garage
          </Link>
          <Link to="/winners" className={style.link}>
            Winners
          </Link>
        </div>
        <div className={style.logo}>
          <h1>Async Race</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
