import style from "./RacesPagination.module.scss";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import useCars from "../../hooks/useCars";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../context/api-context";
import { CarProps } from "../../types/types";

function RacesPagination() {
  const { state, dispatch, getCarsLength } = useCars();

  async function getMaxPages(): Promise<number> {
    try {
      const request = await fetch(`${BASE_URL}/garage`);
      const data = await request.json();

      const maxPages = Math.floor((data as CarProps[]).length / 7) + 1;
      return maxPages;
    } catch (error) {
      throw new Error("Failed to get max pages");
    }
  }

  const [length, setLength] = useState(0);

  const getLength = async () => {
    const n = await getCarsLength();
    setLength(n);
  };

  useEffect(() => {
    getLength();
  }, [state.cars]);

  async function nextPage() {
    const maxPage = await getMaxPages();
    if (state.page < maxPage) {
      dispatch({ type: "SET_PAGE", payload: state.page + 1 });
    }
  }

  function previousPage() {
    if (state.page > 1) {
      dispatch({ type: "SET_PAGE", payload: state.page - 1 });
    }
  }

  return (
    <div className={style.pages}>
      <div className={style.info}>Garage ({length})</div>
      <div className={style.pagination}>
        <button
          className={`${style.pagesBtn} ${style.prev}`}
          onClick={previousPage}
        >
          <MdOutlineSkipPrevious />
        </button>
        <div className={style.pagesNumber}>{state.page}</div>
        <button
          className={`${style.pagesBtn} ${style.next}`}
          onClick={nextPage}
        >
          <MdOutlineSkipNext />
        </button>
      </div>
    </div>
  );
}

export default RacesPagination;
