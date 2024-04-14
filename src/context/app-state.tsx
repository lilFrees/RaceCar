import { createContext, useContext, useState } from "react";
import { AppState } from "../types/types";
import { AppStateContextValue } from "../types/interfaces";

const AppStateContext = createContext<AppStateContextValue | null>(null);

export const AppStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appState, setAppState] = useState<AppState>({
    createValue: "",
    createColor: "",
    updateValue: "",
    updateColor: "",
    racePositions: {},
    page: 1,
  });

  function racePositionHandler(id: number, value: number): void;
  function racePositionHandler(id: number, value: () => number): void;

  function racePositionHandler(
    id: number,
    value: number | (() => number)
  ): void {
    if (typeof value === "number") {
      if (value === 0) {
        delete appState.racePositions[id];
        return;
      }
      setAppState({
        ...appState,
        racePositions: { ...appState.racePositions, [id]: value },
      });
    } else {
      const nextVal = value();
      if (nextVal === 0) {
        delete appState.racePositions[id];
        return;
      }
      setAppState({
        ...appState,
        racePositions: { ...appState.racePositions, [id]: nextVal },
      });
    }
  }

  return (
    <AppStateContext.Provider
      value={{ appState, setAppState, racePositionHandler }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export function useAppState(): AppStateContextValue {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("Context must be used inside of the Provider");
  }
  return context;
}
