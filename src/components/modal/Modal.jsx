import styles from "./modal.module.css";
import { ModalContext } from "../../context/modalContext";
import { useContext } from "react";

function Modal({ children }) {
  const { active, setActive } = useContext(ModalContext);
  return (
    <div
      className={`${styles.modal} ${active && styles.active}`}
      onClick={() => setActive(false)}
    >
      <div
        className={`${styles.modal_content} ${
          active && styles.modal_content_active
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;