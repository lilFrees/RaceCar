import useCars from "../hooks/useCars";
import style from "./Modal.module.scss";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const { state } = useCars();
  if (!state.winnerCarId) {
    return null;
  }
  const { dispatch } = useCars();
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dispatch({ type: "HIDE_WINNER" });
    }
  });
  return createPortal(
    <>
      <div
        className={style.backdrop}
        onClick={() => {
          dispatch({ type: "HIDE_WINNER" });
        }}
      />
      <div className={style.modal}>{children}</div>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
