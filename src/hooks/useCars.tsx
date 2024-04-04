import { useContext } from "react";
import { ApiContext } from "../context/api-context";
import { ApiContextType } from "../types/interfaces";

function useCars(): ApiContextType {
  const context = useContext(ApiContext);
  if (!context) {
    // Handle the case where the hook is used outside of the ApiProvider
    throw new Error("useCars must be used within an ApiProvider");
  }
  return context;
}

export default useCars;
