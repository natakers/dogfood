import Modal from "../modal/Modal";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/modalContext";
import FormIn from "../Form/FormIn";
import FormUp from "../Form/FormUp";
import "../App/index.css";

const Registration = () => {
  const { setActive } = useContext(ModalContext);
  const [type, setType] = useState("");
  const handleSingUp = () => {
    setType("up");
    setActive(true);
  };

  const handleSingIn = () => {
    setType("in");
    setActive(true);
  };
  return (
    <div>
      <button className="btn_reg" onClick={handleSingUp}>
        Регистрация
      </button>
      <button className="btn_reg" onClick={handleSingIn}>
        Авторизация
      </button>
      <Modal>
        {type === "up" && <FormUp setType={setType} />}
        {type === "in" && <FormIn />}
      </Modal>
    </div>
  );
};

export default Registration;