import style from "./RacesPagination.module.scss";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import useCars from "../../hooks/useCars";
import { useEffect, useState } from "react";

function RacesPagination() {
  const { state, dispatch, getMaxPages, getCarsLength } = useCars();

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
