import style from "./Car.module.scss";

interface CarProps {
  name: string;
}

function Car(props: CarProps) {
  return <div className={style.car}>{props.name}</div>;
}

export default Car;
