import style from "./RacesNav.module.scss";
import { CiPlay1 } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import useCars from "../../hooks/useCars";
import { useEffect } from "react";
import { useAppState } from "../../context/app-state";

function RacesNav() {
  const {
    state,
    createCar,
    updateCar,
    create100Cars,
    startAllCars,
    resetCars,
  } = useCars();

  const { appState, setAppState } = useAppState();

  function nameUpdatingHandler(value: string) {
    if (state.carIsSelected) {
      // setUpdatingValue({ ...updatingValue, name: value });
      setAppState({ ...appState, updateValue: value });
    }
  }

  function colorUpdatingHandler(value: string) {
    if (state.carIsSelected) {
      // setUpdatingValue({ ...updatingValue, color: value });
      setAppState({ ...appState, updateColor: value });
    }
  }

  function nameCreatingValue(value: string) {
    // setCreatingValue({ ...creatingValue, name: value });
    setAppState({ ...appState, createValue: value });
  }

  function colorCreatingValue(value: string) {
    // setCreatingValue({ ...creatingValue, color: value });
    setAppState({ ...appState, createColor: value });
  }

  useEffect(() => {
    if (state.carIsSelected) {
      setAppState({
        ...appState,
        updateValue: appState.updateValue
          ? appState.updateValue
          : state.selectedCar!.name,
        updateColor: appState.updateColor
          ? appState.updateColor
          : state.selectedCar!.color,
      });
    } else {
      setAppState({
        ...appState,
        updateValue: "",
        updateColor: "",
      });
    }
  }, [state.selectedCar]);

  return (
    <div className={style.nav}>
      <div className={style.nav__item}>
        <button
          className={
            state.status !== "loading" && state.status !== "race"
              ? style.btn
              : style.disabledBtn
          }
          onClick={() => {
            if (state.status !== "loading" && state.status !== "race")
              startAllCars();
          }}
        >
          Race <CiPlay1 />
        </button>
        <button
          className={state.status !== "loading" ? style.btn : style.disabledBtn}
          onClick={() => {
            if (state.status !== "stopped") resetCars();
          }}
        >
          Reset <GrPowerReset />
        </button>
      </div>
      <div className={style.nav__item}>
        <input
          type="text"
          max={20}
          className={style.input}
          placeholder="TYPE CAR BRAND"
          value={appState.createValue}
          onChange={(val) => {
            nameCreatingValue(val.target.value);
          }}
        />
        <input
          type="color"
          className={style.color}
          value={appState.createColor || "#000000"}
          onChange={(val) => {
            colorCreatingValue(val.target.value);
          }}
        />
        <button
          className={style.btn}
          onClick={() => {
            createCar(appState.createValue, appState.createColor);
            setAppState({
              ...appState,
              createValue: "",
              createColor: "#000000",
            });
          }}
        >
          Create
        </button>
      </div>
      <div className={style.nav__item}>
        <input
          type="text"
          max={20}
          className={style.input}
          placeholder="TYPE CAR BRAND"
          value={appState.updateValue}
          onChange={(val) => {
            nameUpdatingHandler(val.target.value);
          }}
        />
        <input
          type="color"
          className={style.color}
          value={appState.updateColor || "#000000"}
          onChange={(val) => {
            colorUpdatingHandler(val.target.value);
          }}
        />
        <button
          className={style.btn}
          onClick={() => {
            updateCar(
              state.selectedCar!.id,
              appState.updateValue,
              appState.updateColor
            );
          }}
        >
          Update
        </button>
      </div>
      <div className={style.nav__item}>
        <button className={style.btn} onClick={create100Cars}>
          Generate Cars
        </button>
      </div>
    </div>
  );
}

export default RacesNav;
