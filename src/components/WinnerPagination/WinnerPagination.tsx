import style from "./WinnerPagination.module.scss";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import useCars from "../../hooks/useCars";
import { useEffect, useState } from "react";

function WinnerPagination() {
  const { state, dispatch, getMaxPagesForWinners, getWinnersLength } =
    useCars();

  const [length, setLength] = useState(0);

  const getLength = async () => {
    const n = await getWinnersLength();
    setLength(n);
  };

  useEffect(() => {
    getLength();
  }, [state.winnerCars]);

  async function nextPage() {
    const maxPage = await getMaxPagesForWinners();
    if (state.winnerPage < maxPage) {
      dispatch({ type: "SET_WIN_PAGE", payload: state.winnerPage + 1 });
    }
  }

  function previousPage() {
    if (state.winnerPage > 1) {
      dispatch({ type: "SET_WIN_PAGE", payload: state.winnerPage - 1 });
    }
  }

  return (
    <div className={style.pages}>
      <div className={style.info}>Winners ({length})</div>
      <div className={style.pagination}>
        <button
          className={`${style.pagesBtn} ${style.prev}`}
          onClick={previousPage}
        >
          <MdOutlineSkipPrevious />
        </button>
        <div className={style.pagesNumber}>{state.winnerPage}</div>
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

export default WinnerPagination;
