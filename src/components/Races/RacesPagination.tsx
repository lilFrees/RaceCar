import style from "./RacesPagination.module.scss";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import useCars from "../../hooks/useCars";

function RacesPagination() {
  const { state, dispatch, getMaxPages } = useCars();
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
      <button
        className={`${style.pagesBtn} ${style.prev}`}
        onClick={previousPage}
      >
        <MdOutlineSkipPrevious />
      </button>
      <div className={style.pagesNumber}>{state.page}</div>
      <button className={`${style.pagesBtn} ${style.next}`} onClick={nextPage}>
        <MdOutlineSkipNext />
      </button>
    </div>
  );
}

export default RacesPagination;
