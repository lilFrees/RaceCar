import { useContext } from "react";
import { ApiContext } from "../context/api-context";

function useCars() {
  return useContext(ApiContext);
}

export default useCars;
